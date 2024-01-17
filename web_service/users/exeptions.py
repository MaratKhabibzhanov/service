from rest_framework import exceptions
from rest_framework_simplejwt.exceptions import DetailDictMixin
from django.utils.translation import gettext_lazy as _


class InvalidToken(DetailDictMixin, exceptions.PermissionDenied):
    default_detail = _("Token is invalid or expired")
    default_code = "token_not_valid"
