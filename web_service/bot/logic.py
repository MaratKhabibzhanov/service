from datetime import datetime
from typing import Optional, Union

from django.contrib.auth.hashers import check_password

from service.models import Registration
from users.models import CustomUser


def check_user(username: str,
               password: str,
               user_id: int) -> bool:
    user = CustomUser.objects.filter(username=username).first()
    if not user or user.role == CustomUser.MANAGER_ROLE:
        return False
    if check_password(password, user.password):
        user.bot_user_id = user_id
        user.save()
        return True


def registration_exists(user_tg_id: int) -> Union[Registration, bool]:
    user = CustomUser.objects.filter(bot_user_id=user_tg_id).first()
    if user:
        return Registration.objects.filter(car__owner_id=user.id,
                                           day__gte=datetime.now().date())
