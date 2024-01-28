from typing import List
from datetime import datetime, timedelta, time
from keyboa import Keyboa
from telebot.types import (ReplyKeyboardMarkup,
                           KeyboardButton,
                           InlineKeyboardMarkup)

from service.models import Registration


def keyboard(buttons: list) -> ReplyKeyboardMarkup:
    markup = ReplyKeyboardMarkup(resize_keyboard=True)
    for button in buttons:
        markup.add(KeyboardButton(button))
    return markup


def time_kb(acceptor_id: str,
            day: datetime.date) -> Keyboa:
    busy_times = (Registration.objects.filter(acceptor_id=acceptor_id,
                                              day=day).only("time").
                  values_list("time", flat=True))
    generated_time = datetime(1990, 1, 1, 8)
    max_time = datetime(1990, 1, 1, 20)
    buttons = list()
    while generated_time < max_time:
        if generated_time.time() not in busy_times:
            button = {'text': generated_time.strftime("%H:%M"),
                      'callback_data': f"selected_time={generated_time.time()}"}
        else:
            button = {"text": "--",
                      "callback_data": "None"}
        buttons.append(button)
        generated_time += timedelta(minutes=30)
    return Keyboa(items=buttons, items_in_row=6)
