from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser

from service.models import Car
from users.models import CustomUser


class IsOwnerOrManager(permissions.IsAuthenticatedOrReadOnly):
    """
    Проверка прав на доступ к данным пользователя
    """
    def has_object_permission(self, request, view, obj):
        role = request.user.role if type(request.user) != AnonymousUser else None
        return request.user == obj.owner or role == CustomUser.MANAGER_ROLE


class OwnerAndManagerCanEditRegistration(permissions.IsAuthenticatedOrReadOnly):
    """Проверка на доступ к редактированию регистрации на ТО"""
    def has_permission(self, request, view):
        role = request.user.role if type(request.user) != AnonymousUser else None
        if request.method != "POST":
            return True
        car_id = request.data.get("car").get("id")
        car = Car.objects.get(pk=car_id)
        if role != CustomUser.MANAGER_ROLE and request.user.id != car.owner_id:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        role = request.user.role if type(request.user) != AnonymousUser else None
        if role == CustomUser.MANAGER_ROLE:
            return True
        if request.user != obj.car.owner and request.method not in permissions.SAFE_METHODS:
            return False
        return True
