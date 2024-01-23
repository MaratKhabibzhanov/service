from telebot import TeleBot, types

from bot.keybords import keyboard


def login(message: types.Message, bot: TeleBot) -> None:
    bot.send_message(message.from_user.id,
                     text='Здесь пока ничего не готово(',
                     reply_markup=keyboard(["/registration", "/logout"]))


def registration_handlers(bot: TeleBot):
    bot.register_message_handler(login,
                                 commands=["registration"],
                                 pass_bot=True)
