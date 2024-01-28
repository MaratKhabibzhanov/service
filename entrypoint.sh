#!/bin/sh

sleep 10
python manage.py migrate
python manage.py collectstatic  --noinput
python manage.py telegram_bot
gunicorn config.wsgi --bind 0.0.0.0:8000
