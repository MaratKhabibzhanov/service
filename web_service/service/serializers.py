from datetime import date, time

from rest_framework import serializers

from config import settings
from customs.fields import ObjectField
from users.serializers import UsersShortSerializer
from .models import (Car,
                     Acceptor,
                     WorkingType,
                     Part,
                     Oil,
                     CarModel,
                     Maintenance,
                     Engine,
                     Registration)


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = ['id',
                  'spare_part',
                  'price',
                  'compatible_car']


class OilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Oil
        fields = ['id',
                  'title',
                  'viscosity',
                  'price']


class EngineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Engine
        fields = ['id',
                  'model',
                  'engine_vol']


class CarModelSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarModel
        fields = ['id',
                  'model',
                  'image',
                  ]

    def get_image(self, obj):
        request = self.context.get('request')
        print(request.get_host())
        print(request.build_absolute_uri('/test'))
        return request.build_absolute_uri(obj.image.url)


class CarModelShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = CarModel
        fields = ['id',
                  'model',
                  ]


class WorkingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingType
        fields = ['id',
                  'working_type',
                  'price']


class AcceptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acceptor
        fields = ['id',
                  'first_name',
                  'last_name',
                  'patronymic']


class MaintenanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Maintenance
        fields = ['id',
                  'operation',
                  'working_time',
                  'car_model',
                  'engine',
                  'total_cost']


class CarUserSerializer(serializers.ModelSerializer):
    car_model = serializers.PrimaryKeyRelatedField(
        queryset=CarModelShortSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=CarModelShortSerializer),
        required=True,
    )
    engine = serializers.PrimaryKeyRelatedField(
        queryset=EngineSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=EngineSerializer),
        required=True,
    )

    class Meta:
        model = Car
        fields = ['id',
                  'vin',
                  'number',
                  'vehicle_certificate',
                  'sold_date',
                  'mileage',
                  'car_model',
                  'engine']

    def create(self, validated_data: dict) -> Car:
        car_model = validated_data.get('car_model')
        engine = validated_data.get('engine')
        self._validate_engine(car_model, engine)
        return super(CarUserSerializer, self).create(validated_data)

    def _validate_engine(self, car_model: CarModel, engine: Engine) -> None:
        compatibility = CarModel.objects.filter(id=car_model.id, compatible_engines=engine.id)
        if not compatibility.exists():
            raise serializers.ValidationError({"detail": f'Двигатель {engine} не совместим с автомобилем {car_model}'})


class CarSerializer(CarUserSerializer):
    owner = serializers.PrimaryKeyRelatedField(
            pk_field=ObjectField(serializer=UsersShortSerializer),
            read_only=True)

    class Meta:
        model = Car
        fields = ['id',
                  'owner',
                  'vin',
                  'number',
                  'vehicle_certificate',
                  'sold_date',
                  'mileage',
                  'car_model',
                  'engine']


class CarShortSerializer(CarSerializer):

    class Meta:
        model = Car
        fields = ['id',
                  'owner',
                  'number',
                  'car_model']


class RegistrationSerializer(serializers.ModelSerializer):
    acceptor = serializers.PrimaryKeyRelatedField(
        queryset=AcceptorSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=AcceptorSerializer),
        required=True,
    )
    maintenance = serializers.PrimaryKeyRelatedField(
        queryset=MaintenanceSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=MaintenanceSerializer),
        required=True,
    )
    car = serializers.PrimaryKeyRelatedField(
        queryset=CarSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=CarSerializer),
        required=True,
    )

    class Meta:
        model = Registration
        fields = ['id',
                  'day',
                  'time',
                  'acceptor',
                  'maintenance',
                  'car']

    def create(self, validated_data: dict) -> Registration:
        car = validated_data.get('car')
        maintenance = validated_data.get('maintenance')
        day = validated_data.get('day')
        register_time = validated_data.get('time')
        acceptor = validated_data.get('acceptor')
        self._validate_distinct_acceptor_time(day, register_time, acceptor)
        self._validate_distinct(day, car)
        self._validate_time(register_time)
        self._validate_maintenance(car, maintenance)
        return super(RegistrationSerializer, self).create(validated_data)

    def _validate_maintenance(self, car: Car, maintenance: Maintenance) -> None:
        if (car.car_model != maintenance.car_model
                or car.engine != maintenance.engine):
            raise (serializers.ValidationError
                   ({"detail": f'Тип ремонта {maintenance} не совместим с автомобилем {car}'}))

    def _validate_distinct(self, day: date, car: Car) -> None:
        register = Registration.objects.filter(day=day, car=car)
        if register.exists():
            raise serializers.ValidationError({"detail": f'Автомобиль - {car} уже записан на {day}'})

    def _validate_time(self, register_time: time) -> None:
        start_work_day = settings.START_WORK_DAY
        end_work_day = settings.END_WORK_DAY
        if register_time < start_work_day:
            raise serializers.ValidationError({"detail": 'Рабочий день ещё не начался'})
        if register_time >= end_work_day:
            raise serializers.ValidationError({"detail": 'Рабочий день уже закончился'})
        if register_time.minute not in (time(minute=0).minute, time(minute=30).minute):
            raise serializers.ValidationError({"detail": 'Ошибка при выборе ячейки записи (интервал 30 минут)'})

    def _validate_distinct_acceptor_time(self, day: date,
                                         register_time: time,
                                         acceptor: Acceptor) -> None:
        register = Registration.objects.filter(day=day,
                                               time=register_time,
                                               acceptor=acceptor)
        if register.exists():
            raise serializers.ValidationError({"detail": f'У мастера-приемщика "{acceptor}" '
                                                         f'в {register_time} уже есть запись'})


class RegistrationShortSerializer(RegistrationSerializer):
    car = serializers.PrimaryKeyRelatedField(
        queryset=CarShortSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=CarShortSerializer),
        required=True,
    )

    class Meta:
        model = Registration
        fields = ['id',
                  'day',
                  'time',
                  'acceptor',
                  'car']
