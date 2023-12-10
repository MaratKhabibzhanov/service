from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser
from users.models import CustomUser


class IsOwner(permissions.IsAuthenticatedOrReadOnly):
    """
    Проверка прав на доступ к данным пользователя
    """
    def has_object_permission(self, request, view, obj):
        role = request.user.role if type(request.user) != AnonymousUser else None
        return request.user == obj.owner or role == CustomUser.MANAGER_ROLE

