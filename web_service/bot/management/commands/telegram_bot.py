from django.core.management.base import BaseCommand

from bot.main import start_bot


class Command(BaseCommand):
    help = 'Just a command for launching a Telegram bot.'

    def handle(self, *args, **kwargs):
        start_bot()
