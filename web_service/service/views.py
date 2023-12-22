from django.shortcuts import get_object_or_404
from rest_framework import (viewsets,
                            permissions,
                            filters,
                            status,
                            generics)
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import (Part,
                     CarModel,
                     WorkingType,
                     Acceptor,
                     Avto,
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
                          AvtoSerializer,
                          RegistrationSerializer,
                          OilSerializer,
                          EngineSerializer,
                          AvtoUserSerializer)
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
        avto_id = request.query_params.get("avto_id")
        if avto_id:
            avto = get_object_or_404(Avto, id=avto_id)
            queryset = Maintenance.objects.filter(car_model_id=avto.car_model_id,
                                                  engine_id=avto.engine_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(data="Отсутствует обязательный аргумент: avto_id",
                        status=status.HTTP_400_BAD_REQUEST)


class AvtoViewSet(viewsets.ModelViewSet):
    queryset = Avto.objects.all()
    serializer_class = AvtoSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrManager]

    def perform_create(self, serializer):
        if self.request.user.role == CustomUser.USER_ROLE:
            serializer.save(owner=self.request.user)
        else:
            serializer.save()

    def get_serializer_class(self):
        if self.request.user.role == CustomUser.USER_ROLE:
            return AvtoUserSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        if self.request.user.role == CustomUser.USER_ROLE:
            return Avto.objects.filter(owner=self.request.user.id)
        return super().get_queryset()


class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated,
                          OwnerAndManagerCanEditRegistration]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_fields = ('day', )


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
        return Response(data="Отсутствует обязательный аргумент: car_model_id",
                        status=status.HTTP_400_BAD_REQUEST)


