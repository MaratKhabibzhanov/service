from typing import List

from keyboa import Keyboa
from telebot.types import (ReplyKeyboardMarkup,
                           KeyboardButton,
                           InlineKeyboardMarkup)


def keyboard(buttons: list) -> ReplyKeyboardMarkup:
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    for button in buttons:
        markup.add(KeyboardButton(button))
    return markup


def kb_for_registration(buttons: List[dict]) -> Keyboa:
    return Keyboa(items=buttons, items_in_row=1)
