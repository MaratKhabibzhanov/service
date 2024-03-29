from datetime import datetime, timedelta

from keyboa import Keyboa
from telebot import TeleBot, types
from telebot.handler_backends import State, StatesGroup
from bot.keybords import keyboard, time_kb
from bot.logic import registration_exists, MyStyleCalendar, save_registration
import re
from service.models import Registration, Acceptor, Car, Maintenance

LSTEP = {'y': 'год', 'm': 'месяц', 'd': 'день'}


class RegistrationStates(StatesGroup):
    acceptor = State()
    car = State()
    day = State()
    time = State()
    maintenance = State()


def main_registration(message: types.Message, bot: TeleBot) -> None:
    bot.send_message(message.from_user.id,
                     text='Начинаем процесс записи на ремонт?',
                     reply_markup=keyboard(["/записаться", "/прервать"]))


def cancelling_registration(message: types.Message, bot: TeleBot) -> None:
    registrations = registration_exists(message.from_user.id)
    if not registrations:
        bot.send_message(message.from_user.id,
                         text='Нет актуальных записей',
                         reply_markup=keyboard(["/записаться", "/прервать"]))
        return
    buttons = list()
    for registration in registrations:
        text = (f"{registration.car.car_model} {registration.car.number}\n"
                f"Дата - {registration.day}")
        pk = registration.id
        buttons.append({'text': text, 'callback_data': f"registration_pk={pk}"})
    kb = Keyboa(items=buttons, items_in_row=1)
    bot.send_message(message.from_user.id,
                     text="Выберите запись, которую хотите удалить",
                     reply_markup=kb())


def del_registration(callback: types.CallbackQuery, bot: TeleBot) -> None:
    reg_id = callback.data
    registration = Registration.objects.get(pk=reg_id.lstrip("registration_pk="))
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
                     reply_markup=keyboard(["/записаться", "/отменить_запись", "/прервать"]))


def registration(message: types.Message, bot: TeleBot) -> None:
    acceptors = Acceptor.objects.all()
    buttons = list()
    for acceptor in acceptors:
        text = (f"{acceptor.last_name} "
                f"{acceptor.first_name} "
                f"{acceptor.patronymic}")
        pk = acceptor.id
        buttons.append({'text': text, 'callback_data': f"acceptor_pk={pk}"})
    kb = Keyboa(items=buttons, items_in_row=1)
    bot.set_state(message.from_user.id, RegistrationStates.acceptor)
    bot.send_message(message.from_user.id,
                     text='Выберите мастера-приемщика:',
                     reply_markup=kb())


def get_acceptor(callback: types.CallbackQuery, bot: TeleBot) -> None:
    acceptor_id = callback.data.lstrip("acceptor_pk=")
    with bot.retrieve_data(callback.from_user.id) as data:
        data['acceptor_id'] = acceptor_id
    car_select(callback=callback, bot=bot)


def get_car(callback: types.CallbackQuery, bot: TeleBot) -> None:
    car_pk = callback.data.lstrip("car_pk=")
    with bot.retrieve_data(callback.from_user.id) as data:
        data['car_pk'] = car_pk
    calendar, step = MyStyleCalendar().build()
    bot.set_state(callback.from_user.id, RegistrationStates.day)
    bot.edit_message_text(f"Выберите {LSTEP[step]}",
                          callback.message.chat.id,
                          callback.message.message_id,
                          reply_markup=calendar)


def get_day(callback: types.CallbackQuery, bot: TeleBot) -> None:
    min_date = datetime.now().date()
    max_date = min_date + timedelta(days=14)
    result, key, step = MyStyleCalendar(locale='ru',
                                        min_date=min_date,
                                        max_date=max_date).process(callback.data)
    if not result and key:
        bot.edit_message_text(f"Выберите {LSTEP[step]}",
                              callback.message.chat.id,
                              callback.message.message_id,
                              reply_markup=key)
    elif result:
        with bot.retrieve_data(callback.from_user.id) as data:
            data['reg_day'] = result
            car_pk = data['car_pk']
            kb = time_kb(data['acceptor_id'], result)
        if Registration.objects.filter(day=result, car_id=car_pk).exists():
            bot.answer_callback_query(callback_query_id=callback.id,
                                      text=("Вы уже записали выбранный автомобиль на этот день!\n"
                                           "Пожалуйста выберите другую дату или автомобиль."),
                                      show_alert=True)
            car_select(callback=callback, bot=bot)
        else:
            bot.set_state(callback.from_user.id, RegistrationStates.time)
            bot.edit_message_text("Выберите желаемое время записи\n"
                                  '(занятое время отмечено "--")',
                                  callback.message.chat.id,
                                  callback.message.message_id,
                                  reply_markup=kb())


def get_time(callback: types.CallbackQuery, bot: TeleBot) -> None:
    reg_time = datetime.strptime(callback.data.lstrip("selected_time="), "%H:%M:%S").time()
    with bot.retrieve_data(callback.from_user.id) as data:
        data['reg_time'] = reg_time
        car_pk = data['car_pk']
    car = Car.objects.get(pk=car_pk)
    maintenances = Maintenance.objects.filter(car_model_id=car.car_model_id,
                                              engine_id=car.engine_id)
    buttons = list()
    for maintenance in maintenances:
        text = f"{maintenance.operation} {maintenance.car_model} {maintenance.engine}"
        pk = maintenance.id
        buttons.append({'text': text, 'callback_data': f"maintenance_pk={pk}"})
    kb = Keyboa(items=buttons, items_in_row=1)
    bot.set_state(callback.from_user.id, RegistrationStates.maintenance)
    bot.edit_message_text("Выберите тип ремонта",
                          callback.message.chat.id,
                          callback.message.message_id,
                          reply_markup=kb())


def get_maintenance(callback: types.CallbackQuery, bot: TeleBot) -> None:
    maintenance_pk = callback.data.lstrip("maintenance_pk=")
    with bot.retrieve_data(callback.from_user.id) as data:
        data['maintenance_pk'] = maintenance_pk
    maintenance = Maintenance.objects.get(pk=maintenance_pk)
    msg = f"Предварительная стоимость: {maintenance.total_cost}"
    buttons = [
        {'text': 'Подтвердить', 'callback_data': f'confirm=Yes'},
        {'text': 'Отказаться', 'callback_data': f'confirm='}
    ]
    kb = Keyboa(items=buttons, items_in_row=2)
    bot.edit_message_text(msg,
                          callback.message.chat.id,
                          callback.message.message_id,
                          reply_markup=kb())


def confirm_registration(callback: types.CallbackQuery, bot: TeleBot) -> None:
    confirm = callback.data.lstrip("confirm=")
    if confirm:
        with bot.retrieve_data(callback.from_user.id) as data:
            msg = save_registration(data)
    else:
        msg = "Запись на ремонт не зарегистрирована"
    bot.delete_state(callback.from_user.id)
    bot.edit_message_text(msg,
                          callback.message.chat.id,
                          callback.message.message_id)


def cancel(message: types.Message, bot: TeleBot) -> None:
    bot.delete_state(message.from_user.id)
    bot.send_message(message.from_user.id,
                     text="Запись на ремонт прервана",
                     reply_markup=keyboard(["/записаться", "/отменить_запись"]))


def car_select(callback: types.CallbackQuery, bot: TeleBot) -> None:
    my_cars = Car.objects.filter(owner__bot_user_id=callback.from_user.id)
    buttons = list()
    for car in my_cars:
        text = f"{car.car_model} {car.number}"
        pk = car.id
        buttons.append({'text': text, 'callback_data': f"car_pk={pk}"})
    kb = Keyboa(items=buttons, items_in_row=1)
    bot.set_state(callback.from_user.id, RegistrationStates.car)
    bot.edit_message_text("Выберите какой из ваших автомобилей\n"
                          "хотели бы записать на ремонт:",
                          callback.message.chat.id,
                          callback.message.message_id,
                          reply_markup=kb())


def registration_handlers(bot: TeleBot):
    bot.register_message_handler(main_registration,
                                 commands=["запись_на_ремонт"],
                                 pass_bot=True)
    bot.register_message_handler(cancelling_registration,
                                 commands=["отменить_запись"],
                                 pass_bot=True)
    bot.register_message_handler(registration,
                                 commands=["записаться"],
                                 pass_bot=True)
    bot.register_message_handler(cancel,
                                 commands=["прервать"],
                                 state="*",
                                 pass_bot=True)
    bot.register_callback_query_handler(del_registration,
                                        func=lambda call: re.match(r"registration_pk=\d+", call.data),
                                        pass_bot=True)
    bot.register_callback_query_handler(get_acceptor,
                                        func=lambda call: re.match(r"acceptor_pk=\d+", call.data),
                                        pass_bot=True)
    bot.register_callback_query_handler(get_day,
                                        func=MyStyleCalendar.func(),
                                        pass_bot=True)
    bot.register_callback_query_handler(get_time,
                                        func=lambda call: re.match(r"selected_time=\d\d:\d\d", call.data),
                                        pass_bot=True)
    bot.register_callback_query_handler(get_car,
                                        func=lambda call: re.match(r"car_pk=\d+", call.data),
                                        pass_bot=True)
    bot.register_callback_query_handler(get_maintenance,
                                        func=lambda call: re.match(r"maintenance_pk=\d+", call.data),
                                        pass_bot=True)
    bot.register_callback_query_handler(confirm_registration,
                                        func=lambda call: re.match(r"confirm=\w*", call.data),
                                        pass_bot=True)
