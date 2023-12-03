from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser
from .models import CustomUser


class IsManagerGetList(permissions.IsAuthenticatedOrReadOnly):
    """
    Проверка прав на доступ к пользователям
    """

    def has_object_permission(self, request, view, obj):
        role = request.user.role if type(request.user) != AnonymousUser else None
        if request.method in permissions.SAFE_METHODS and role == CustomUser.MANAGER_ROLE:
            return True
        return request.user == obj

