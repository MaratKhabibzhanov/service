from rest_framework import viewsets, permissions, views, status
from rest_framework.response import Response

from .models import (Part,
                     CarModel,
                     WorkingType,
                     Acceptor,
                     Avto,
                     Maintenance,
                     Registration,
                     Oil,
                     Engine)
from .serializers import (PartSerializer,
                          CarModelSerializer,
                          WorkingTypeSerializer,
                          AcceptorSerializer,
                          MaintenanceSerializer,
                          AvtoSerializer,
                          RegistrationSerializer,
                          OilSerializer,
                          EngineSerializer, AvtoUserSerializer)
from users.models import CustomUser


class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    serializer_class = PartSerializer
    permission_classes = [permissions.IsAuthenticated]


class CarModelViewSet(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorkingTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkingType.objects.all()
    serializer_class = WorkingTypeSerializer
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

    def perform_create(self, serializer):
        if self.request.user.role == CustomUser.USER_ROLE:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()

    def get_serializer_class(self):
        if self.request.user.role == CustomUser.USER_ROLE:
            return AvtoUserSerializer
        return super().get_serializer_class()


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


