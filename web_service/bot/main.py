from django.conf import settings
from telebot import TeleBot, types
from telebot.storage import StateMemoryStorage
from telebot import custom_filters

from bot.authentication import authentication_handlers
from bot.keybords import keyboard
from bot.registration import registration_handlers
from users.models import CustomUser

state_storage = StateMemoryStorage()

bot = TeleBot(token=settings.BOT_TOKEN,
              state_storage=state_storage)


def start_bot():
    print("Start bot...")
    bot.add_custom_filter(custom_filters.StateFilter(bot))
    authentication_handlers(bot)
    registration_handlers(bot)
    bot.infinity_polling(skip_pending=True)


@bot.message_handler(commands=['start'])
def start(message: types.Message):
    if CustomUser.objects.filter(bot_user_id=message.from_user.id).exists():
        markup = keyboard(["/запись_на_ремонт", "/выйти"])
        msg = "Можете записать свой авто!"
    else:
        markup = keyboard(["/войти"])
        msg = "Для начала, авторизуйтесь"
    bot.send_message(chat_id=message.chat.id,
                     text=msg,
                     reply_markup=markup)


