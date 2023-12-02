from rest_framework import permissions
from django.contrib.auth.models import AnonymousUser
from .models import CustomUser


class IsManagerGetList(permissions.IsAuthenticatedOrReadOnly):
    """
    Проверка прав на редактирование публикаций
    """
    def has_permission(self, request, view) -> bool:
        role = request.user.role if type(request.user) != AnonymousUser else None
        return role == CustomUser.MANAGER_ROLE

