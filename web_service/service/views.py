from rest_framework import viewsets, permissions, views, status
from rest_framework.response import Response

from .models import (Warehouse,
                     CarModel,
                     WorkingPrice,
                     Acceptor,
                     Avto,
                     Maintenance,
                     Registration,
                     Oil,
                     Engine)
from .serializers import (WarehouseSerializer,
                          CarModelSerializer,
                          WorkingPriceSerializer,
                          AcceptorSerializer,
                          MaintenanceSerializer,
                          AvtoSerializer,
                          RegistrationSerializer,
                          OilSerializer,
                          EngineSerializer)


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer
    permission_classes = [permissions.IsAuthenticated]


class CarModelViewSet(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorkingPriceViewSet(viewsets.ModelViewSet):
    queryset = WorkingPrice.objects.all()
    serializer_class = WorkingPriceSerializer
    permission_classes = [permissions.IsAuthenticated]


class AcceptorViewSet(viewsets.ModelViewSet):
    queryset = Acceptor.objects.all()
    serializer_class = AcceptorSerializer
    permission_classes = [permissions.IsAuthenticated]


class MaintenanceViewSet(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]


class AvtoViewSet(viewsets.ModelViewSet):
    queryset = Avto.objects.all()
    serializer_class = AvtoSerializer
    permission_classes = [permissions.IsAuthenticated]


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]


class OilViewSet(viewsets.ModelViewSet):
    queryset = Oil.objects.all()
    serializer_class = OilSerializer
    permission_classes = [permissions.IsAuthenticated]


class EngineViewSet(viewsets.ModelViewSet):
    queryset = Engine.objects.all()
    serializer_class = EngineSerializer
    permission_classes = [permissions.IsAuthenticated]


