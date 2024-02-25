from djoser.views import UserViewSet
from rest_framework import filters

from service.mixins import CustomValidationErrorMixin


class CustomUserViewSet(CustomValidationErrorMixin, UserViewSet):
    filter_backends = [filters.SearchFilter]
    search_fields = ['username',
                     'first_name',
                     'last_name',
                     'patronymic',
                     'email']
