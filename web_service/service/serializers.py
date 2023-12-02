from rest_framework import serializers

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
    oil = serializers.PrimaryKeyRelatedField(queryset=Oil.objects.all())

    class Meta:
        model = Engine
        fields = ['id',
                  'model',
                  'oil',
                  'oil_count',
                  'engine_vol']


class CarModelSerializer(serializers.ModelSerializer):
    engine = serializers.PrimaryKeyRelatedField(queryset=Engine.objects.all())

    class Meta:
        model = CarModel
        fields = ['id',
                  'model',
                  'image',
                  'engine']


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
    parts = serializers.PrimaryKeyRelatedField(queryset=Part.objects.all(),
                                                    many=True, )
    working_type = serializers.PrimaryKeyRelatedField(queryset=WorkingType.objects.all())
    car_model = serializers.PrimaryKeyRelatedField(queryset=CarModel.objects.all())

    class Meta:
        model = Maintenance
        fields = ['id',
                  'operation',
                  'working_time',
                  'parts',
                  'working_type',
                  'car_model']


class AvtoSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    car_model = serializers.PrimaryKeyRelatedField(queryset=CarModel.objects.all())

    class Meta:
        model = Avto
        fields = ['id',
                  'owner',
                  'vin',
                  'number',
                  'sts',
                  'sold_date',
                  'mileage',
                  'car_model']


class AvtoUserSerializer(serializers.ModelSerializer):
    car_model = serializers.PrimaryKeyRelatedField(queryset=CarModel.objects.all())

    class Meta:
        model = Avto
        fields = ['id',
                  'vin',
                  'number',
                  'sts',
                  'sold_date',
                  'mileage',
                  'car_model']


class RegistrationSerializer(serializers.ModelSerializer):
    acceptor = serializers.PrimaryKeyRelatedField(queryset=Acceptor.objects.all())
    maintenance = serializers.PrimaryKeyRelatedField(queryset=Maintenance.objects.all())
    avto = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Registration
        fields = ['id',
                  'day',
                  'time',
                  'acceptor',
                  'maintenance',
                  'avto',
                  'canceled']
