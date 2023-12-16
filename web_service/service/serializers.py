from rest_framework import serializers

from customs.fields import ObjectField
from users.models import CustomUser
from .models import (Avto,
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
                  'second_name',
                  'patronim']


class MaintenanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Maintenance
        fields = ['id',
                  'operation',
                  'working_time',
                  'car_model',
                  'engine',
                  'total_cost']


class AvtoUserSerializer(serializers.ModelSerializer):
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
        model = Avto
        fields = ['id',
                  'vin',
                  'number',
                  'vehicle_certificate',
                  'sold_date',
                  'mileage',
                  'car_model',
                  'engine']

    def create(self, validated_data: dict) -> Avto:
        car_model = validated_data.get('car_model')
        engine = validated_data.get('engine')
        self._validate_engine(car_model, engine)
        return super(AvtoUserSerializer, self).create(validated_data)

    def _validate_engine(self, car_model: CarModel, engine: Engine) -> None:
        compatibility = CarModel.objects.filter(id=car_model.id, compatible_engines=engine.id)
        if not compatibility.exists():
            raise serializers.ValidationError(f'Двигатель {engine} не совместим с автомобилем {car_model}')


class AvtoSerializer(AvtoUserSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Avto
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
    avto = serializers.PrimaryKeyRelatedField(
        queryset=AvtoSerializer.Meta.model.objects.all(),
        pk_field=ObjectField(serializer=AvtoSerializer),
        required=True,
    )

    class Meta:
        model = Registration
        fields = ['id',
                  'day',
                  'time',
                  'acceptor',
                  'maintenance',
                  'avto',
                  'canceled']

    def create(self, validated_data: dict) -> Registration:
        avto = validated_data.get('avto')
        maintenance = validated_data.get('maintenance')
        self._validate_maintenance(avto, maintenance)
        return super(RegistrationSerializer, self).create(validated_data)

    def _validate_maintenance(self, avto: Avto, maintenance: Maintenance) -> None:
        if (avto.car_model != maintenance.car_model
                or avto.engine != maintenance.engine):
            raise (serializers.ValidationError
                   (f'Тип ремонта {maintenance} не совместим с автомобилем {avto}'))
