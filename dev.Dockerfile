FROM python:3.9-alpine3.16

WORKDIR /service/web_service
COPY web_service /service/web_service
COPY requirements.txt /service/requirements.txt


EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /service/requirements.txt

RUN adduser --disabled-password srvice-user

USER srvice-user

