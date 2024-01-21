from telebot.types import ReplyKeyboardMarkup, KeyboardButton


def keyboard(buttons: list) -> ReplyKeyboardMarkup:
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    for button in buttons:
        markup.add(KeyboardButton(button))
    return markup
