#!/bin/sh

sleep 10
python manage.py migrate
gunicorn config.wsgi --bind 0.0.0.0:8000