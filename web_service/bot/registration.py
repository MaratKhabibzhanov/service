from telebot import TeleBot, types
from telebot.handler_backends import State, StatesGroup
from bot.keybords import keyboard, kb_for_registration
from bot.logic import registration_exists
import re

from service.models import Registration


class RegistrationStates(StatesGroup):
    acceptor = State()
    day = State()
    time = State()
    car = State()
    maintenance = State()
    cancellation = State()


def start_registration(message: types.Message, bot: TeleBot) -> None:
    bot.send_message(message.from_user.id,
                     text='Хотите записаться на ремонт или отменить ранее созданную запись?',
                     reply_markup=keyboard(["/записаться", "/отменить_запись", "/выйти"]))


def cancelling_registration(message: types.Message, bot: TeleBot) -> None:
    registrations = registration_exists(message.from_user.id)
    if not registrations:
        bot.send_message(message.from_user.id,
                         text='Нет актуальных записей',
                         reply_markup=keyboard(["/записаться", "/выйти"]))
        # bot.register_next_step_handler(msg, start_registration, bot)
        return
    buttons = list()
    for registration in registrations:
        text = (f"Авто - {registration.car.car_model} "
                f"Госномер - {registration.car.number} "
                f"Дата - {registration.day}")
        pk = registration.id
        buttons.append({'text': text, 'callback_data': f"pk={pk}"})
    kb = kb_for_registration(buttons)
    bot.send_message(message.from_user.id,
                     text="Выберите запись, которую хотите удалить",
                     reply_markup=kb())


def del_registration(callback: types.CallbackQuery, bot: TeleBot) -> None:
    reg_id = callback.data
    registration = Registration.objects.get(pk=reg_id.lstrip("pk="))
    reg_car = registration.car.car_model
    reg_car_number = registration.car.number
    reg_day = registration.day
    registration.delete()
    msg = (f"Удалена запись:\n"
           f"Модель - {reg_car}\n"
           f"Госномер - {reg_car_number}\n"
           f"День записи - {reg_day}")
    bot.send_message(callback.from_user.id,
                     text=msg,
                     reply_markup=keyboard(["/записаться", "/отменить_запись", "/выйти"]))




def registration_handlers(bot: TeleBot):
    bot.register_message_handler(start_registration,
                                 commands=["запись_на_ремонт"],
                                 pass_bot=True)
    bot.register_message_handler(cancelling_registration,
                                 commands=["отменить_запись"],
                                 pass_bot=True)
    bot.register_callback_query_handler(del_registration,
                                        func=lambda call: re.match(r"pk=\d+", call.data),
                                        pass_bot=True)
