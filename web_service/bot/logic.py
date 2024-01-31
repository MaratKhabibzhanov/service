from datetime import datetime
from typing import Union
from django.contrib.auth.hashers import check_password
from service.models import Registration
from users.models import CustomUser
from telegram_bot_calendar import DetailedTelegramCalendar


class MyStyleCalendar(DetailedTelegramCalendar):
    prev_button = "⬅️"
    next_button = "➡️"
    empty_month_button = ""
    empty_year_button = ""


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


def save_registration(data: dict) -> str:
    registration = Registration(day=data['reg_day'],
                                time=data['reg_time'],
                                acceptor_id=data['acceptor_id'],
                                maintenance_id=data['maintenance_pk'],
                                car_id=data['car_pk'])
    registration.save()
    msg = ("Данные о вашей записи на ремонт:\n"
           f"{registration.day}\n"
           f"{registration.time}\n"
           f"{registration.acceptor.last_name} {registration.acceptor.first_name}\n"
           f"{registration.car.car_model} {registration.car.number}\n"
           f"{registration.maintenance.operation}\n")
    return msg
