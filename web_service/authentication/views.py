from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return convert_tokens_in_cookies(response)


class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refresh')
        data = dict(refresh=refresh)
        serializer = self.get_serializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = Response(serializer.validated_data, status=status.HTTP_200_OK)

        return convert_tokens_in_cookies(response)


def convert_tokens_in_cookies(response: Response) -> Response:
    access_token = response.data.pop("access")
    refresh_token = response.data.pop("refresh")
    response.set_cookie("access", access_token, httponly=True, secure=True)
    response.set_cookie("refresh", refresh_token, httponly=True, secure=True)
    return response
