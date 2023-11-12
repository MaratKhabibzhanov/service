from rest_framework import serializers

from .models import *


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id', 'spare_part', 'price']


class CarModelSerializer(serializers.ModelSerializer):
    warehouses = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(), many=True)

    class Meta:
        model = CarModel
        fields = ['id', 'model', 'coef', 'image', 'warehouses']


class WorkingPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingPrice
        fields = ['id', 'working_type', 'price']


class AcceptorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Acceptor
        fields = ['id', 'first_name', 'second_name', 'patronim']


class MaintenanceSerializer(serializers.ModelSerializer):
    warehouses = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(),
                                                    many=True,)

    class Meta:
        model = Maintenance
        fields = ['id', 'operation', 'working_time', 'warehouses', 'working_price']


class AvtoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avto
        fields = ['id', 'vin', 'number', 'sts', 'sold_date', 'engine_vol', 'mileage', 'car_model']


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = ['id', 'day', 'time', 'acceptor', 'maintenance', 'avto']
