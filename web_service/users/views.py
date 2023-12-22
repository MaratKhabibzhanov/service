from django.shortcuts import render
from djoser.views import UserViewSet
from rest_framework import filters


class CustomUserViewSet(UserViewSet):
    filter_backends = [filters.SearchFilter]
    search_fields = ['username',
                     'first_name',
                     'last_name',
                     'patronim',
                     'email']
