from telebot import TeleBot, types
from telebot.handler_backends import State, StatesGroup

from bot.keybords import keyboard
from bot.logic import check_user
from users.models import CustomUser


class AuthenticationStates(StatesGroup):
    name = State()
    password = State()


def login(message: types.Message, bot: TeleBot) -> None:
    if CustomUser.objects.filter(bot_user_id=message.from_user.id).exists():
        bot.send_message(message.chat.id,
                         text="Вы уже аутентифицированы!",
                         reply_markup=keyboard(["/запись_на_ремонт", "/выйти"]))
        return
    bot.set_state(message.from_user.id, AuthenticationStates.name)
    bot.send_message(message.from_user.id,
                     text='Введите ваш username с сайта',
                     reply_markup=keyboard(["/отмена"]))


def cancel(message: types.Message, bot: TeleBot):
    bot.send_message(message.chat.id,
                     text="Авторизация отменена.",
                     reply_markup=keyboard(["/войти"]))
    bot.delete_state(message.from_user.id)


def get_username(message: types.Message, bot: TeleBot):
    username = message.text
    bot.send_message(message.chat.id,
                     text='Введите пароль',
                     reply_markup=keyboard(["/отмена"]))
    bot.set_state(message.from_user.id, AuthenticationStates.password, message.chat.id)
    with bot.retrieve_data(message.from_user.id, message.chat.id) as data:
        data['username'] = username


def get_password(message: types.Message, bot: TeleBot):
    password = message.text
    with bot.retrieve_data(message.from_user.id, message.chat.id) as data:
        data['password'] = password
    user = check_user(data['username'],
                      data['password'],
                      message.chat.id)
    if user:
        msg = "Поздравляю, вы аутентифицированы!"
        markup = keyboard(["/запись_на_ремонт", "/выйти"])
    else:
        msg = "Нет пользователя с такими данными"
        markup = keyboard(["/войти"])
    bot.send_message(chat_id=message.chat.id,
                     text=msg,
                     reply_markup=markup)
    bot.delete_state(message.from_user.id, message.chat.id)


def logout(message: types.Message, bot: TeleBot):
    user = CustomUser.objects.filter(bot_user_id=message.chat.id).first()
    if not user:
        bot.send_message(message.chat.id,
                         text="Вы не аутентифицированы!",
                         reply_markup=keyboard(["/войти"]))
        return
    user.bot_user_id = None
    user.save()
    bot.send_message(message.chat.id,
                     text="Вы успешно вышли)",
                     reply_markup=keyboard(["/войти"]))


def authentication_handlers(bot: TeleBot):
    bot.register_message_handler(login,
                                 commands=["войти"],
                                 pass_bot=True)
    bot.register_message_handler(cancel,
                                 commands=["отмена"],
                                 pass_bot=True,
                                 state='*')
    bot.register_message_handler(get_username,
                                 state=AuthenticationStates.name,
                                 pass_bot=True)
    bot.register_message_handler(get_password,
                                 state=AuthenticationStates.password,
                                 pass_bot=True)
    bot.register_message_handler(logout,
                                 commands=["выйти"],
                                 pass_bot=True)
