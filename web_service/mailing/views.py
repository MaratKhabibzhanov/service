from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView

from config import settings


class MailingCreateView(APIView):
    def post(self, request):
        theme = request.data.get('theme')
        body = request.data.get('body')
        email = request.data.get('email')
        send_mail(subject=theme,
                  message=body,
                  from_email=settings.EMAIL_HOST_USER,
                  recipient_list=[email])
        return Response(data='OK')
