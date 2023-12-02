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
    first_name = models.CharField("Имя", max_length=50)
    last_name = models.CharField("Фамилия", max_length=50)
    patronim = models.CharField("Отчество", max_length=50)
    role = models.CharField("Роль", max_length=7, choices=ROLES_CHOICES,
                            default=USER_ROLE, blank=False)
    email = models.EmailField("Email", blank=False)

