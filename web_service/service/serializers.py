from datetime import date, time

from rest_framework import serializers

from config import settings
from customs.fields import ObjectField
from users.models import CustomUser
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

    class Meta:
        model = CarModel
        fields = ['id',
                  'model',
                  'image',
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
        queryset=CarModelSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=CarModelSerializer),
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
            raise serializers.ValidationError(f'Двигатель {engine} не совместим с автомобилем {car_model}')


class CarSerializer(CarUserSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

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
        self._validate_distinct(day, car)
        self._validate_time(register_time)
        self._validate_maintenance(car, maintenance)
        return super(RegistrationSerializer, self).create(validated_data)

    def _validate_maintenance(self, car: Car, maintenance: Maintenance) -> None:
        if (car.car_model != maintenance.car_model
                or car.engine != maintenance.engine):
            raise (serializers.ValidationError
                   (f'Тип ремонта {maintenance} не совместим с автомобилем {car}'))

    def _validate_distinct(self, day: date, car: Car) -> None:
        register = Registration.objects.filter(day=day, car=car)
        if register.exists():
            raise serializers.ValidationError(f'Автомобиль - {car} уже записан на {day}')

    def _validate_time(self, register_time: time) -> None:
        start_work_day = settings.START_WORK_DAY
        end_work_day = settings.END_WORK_DAY
        if register_time < start_work_day:
            raise serializers.ValidationError('Рабочий день ещё не начался')
        if register_time >= end_work_day:
            raise serializers.ValidationError('Рабочий день уже закончился')
        if register_time.minute not in (time(minute=0).minute, time(minute=30).minute):
            raise serializers.ValidationError('Ошибка при выборе ячейки записи (интервал 30 минут)')
