#!/bin/sh

python manage.py migrate
python manage.py collectstatic  --noinput
python manage.py telegram_bot
python manage.py runserver 0.0.0.0:8000
