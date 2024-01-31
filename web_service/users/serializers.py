from rest_framework import serializers
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer
from users.models import CustomUser
# from djoser.views import


class UserMeSerializer(serializers.ModelSerializer):
    role = serializers.CharField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id',
                  'username',
                  'email',
                  'first_name',
                  'last_name',
                  'patronymic',
                  'role',
                  )


class UsersSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('id',
                  'username',
                  'email',
                  'first_name',
                  'last_name',
                  'patronymic',
                  )


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('username',
                  'password',
                  'email',
                  'first_name',
                  'last_name',
                  'patronymic',
                  )
