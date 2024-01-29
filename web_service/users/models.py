from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models


class CustomUser(AbstractUser):
    MANAGER_ROLE = 'MANAGER'
    USER_ROLE = 'USER'
    ROLES_CHOICES = (
        ('MANAGER', 'manager'),
        ('USER', 'user'),
    )
    bot_user_id = models.IntegerField("id пользователя телеграм",
                                      null=True, blank=True)
    first_name = models.CharField("Имя", max_length=50)
    last_name = models.CharField("Фамилия", max_length=50)
    patronymic = models.CharField("Отчество", max_length=50)
    role = models.CharField("Роль", max_length=7, choices=ROLES_CHOICES,
                            default=USER_ROLE)
    email = models.EmailField("Email", unique=True)

