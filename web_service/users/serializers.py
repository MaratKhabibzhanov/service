from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from users.models import CustomUser


class UserMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id',
                  'username',
                  'email',
                  'first_name',
                  'last_name',
                  'patronim',
                  'role',
                  )


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('username',
                  'password',
                  'email',
                  'first_name',
                  'last_name',
                  'patronim',
                  )
