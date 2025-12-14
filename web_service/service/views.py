from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import (viewsets,
                            permissions,
                            filters,
                            status,
                            generics)
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .filters import RegistrationFilter
from .mixins import CustomValidationErrorMixin
from .models import (Part,
                     CarModel,
                     WorkingType,
                     Acceptor,
                     Car,
                     Maintenance,
                     Registration,
                     Oil,
                     Engine)
from .permissions import IsOwnerOrManager, OwnerAndManagerCanEditRegistration
from .serializers import (PartSerializer,
                          CarModelSerializer,
                          WorkingTypeSerializer,
                          AcceptorSerializer,
                          MaintenanceSerializer,
                          CarSerializer,
                          RegistrationSerializer,
                          OilSerializer,
                          EngineSerializer,
                          CarUserSerializer,
                          RegistrationShortSerializer)
from users.models import CustomUser


class PartViewSet(viewsets.ModelViewSet):
    queryset = Part.objects.all()
    http_method_names = ("get", "head", "options")
    serializer_class = PartSerializer
    permission_classes = [permissions.IsAuthenticated]


class CarModelViewSet(viewsets.ModelViewSet):
    queryset = CarModel.objects.all()
    http_method_names = ("get", "head", "options")
    serializer_class = CarModelSerializer
    permission_classes = [permissions.IsAuthenticated]


class WorkingTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkingType.objects.all()
    http_method_names = ("get", "head", "options")
    serializer_class = WorkingTypeSerializer
    permission_classes = [permissions.IsAuthenticated]


class AcceptorViewSet(viewsets.ModelViewSet):
    queryset = Acceptor.objects.all()
    http_method_names = ("get", "head", "options")
    serializer_class = AcceptorSerializer
    permission_classes = [permissions.IsAuthenticated]


class MaintenanceView(generics.GenericAPIView):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        car_id = request.query_params.get("car_id")
        if car_id:
            car = get_object_or_404(Car, id=car_id)
            queryset = Maintenance.objects.filter(car_model_id=car.car_model_id,
                                                  engine_id=car.engine_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(data={"detail": "Отсутствует обязательный аргумент: car_id"},
                            status=status.HTTP_400_BAD_REQUEST)


class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrManager]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_fields = ('owner',)

    def perform_create(self, serializer):
        if self.request.user.role == CustomUser.USER_ROLE:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()

    def get_serializer_class(self):
        if self.request.user.role == CustomUser.USER_ROLE:
            return CarUserSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        if self.request.user.role == CustomUser.USER_ROLE:
            return Car.objects.filter(owner=self.request.user.id)
        return super().get_queryset()


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated,
                          OwnerAndManagerCanEditRegistration]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_class = RegistrationFilter

    # def get_serializer_class(self):
    #     if self.action == 'list':
    #         return RegistrationShortSerializer
    #     return super().get_serializer_class()


class OilViewSet(viewsets.ModelViewSet):
    queryset = Oil.objects.all()
    http_method_names = ("get", "head", "options")
    serializer_class = OilSerializer
    permission_classes = [permissions.IsAuthenticated]


class EngineView(generics.GenericAPIView):
    queryset = Engine.objects.all()
    serializer_class = EngineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        car_model_id = request.query_params.get("car_model_id")
        if car_model_id:
            queryset = Engine.objects.filter(carmodels=car_model_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(data={"detail": "Отсутствует обязательный аргумент: car_model_id"},
                            status=status.HTTP_400_BAD_REQUEST)


