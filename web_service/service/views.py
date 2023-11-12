from rest_framework import viewsets, permissions

from .models import *
from .serializers import *


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer
    # permission_classes = [permissions.IsAuthenticated]


class CarModelViewSet(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    # permission_classes = [permissions.IsAuthenticated]


class WorkingPriceViewSet(viewsets.ModelViewSet):
    queryset = WorkingPrice.objects.all()
    serializer_class = WorkingPriceSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AcceptorViewSet(viewsets.ModelViewSet):
    queryset = Acceptor.objects.all()
    serializer_class = AcceptorSerializer
    # permission_classes = [permissions.IsAuthenticated]


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    # permission_classes = [permissions.IsAuthenticated]


class AvtoViewSet(viewsets.ModelViewSet):
    queryset = Avto.objects.all()
    serializer_class = AvtoSerializer
    # permission_classes = [permissions.IsAuthenticated]


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    # permission_classes = [permissions.IsAuthenticated]
