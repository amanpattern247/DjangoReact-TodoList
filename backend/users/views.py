import jwt
import datetime
from django.contrib import auth
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect


@ensure_csrf_cookie
@csrf_protect
def set_csrf_token(request):
    return Response({"success": "CSRF cookie set"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LoginView(APIView):
    def post(self, request):
        username = request.data["username"]
        password = request.data["password"]

        user = auth.authenticate(request, username=username, password=password)

        if user is not None:
            auth.login(request, user)

            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
                "iat": datetime.datetime.utcnow(),
            }
            token = jwt.encode(payload, "secret", algorithm="HS256")
            return Response({"token": token})

        else:
            raise AuthenticationFailed("Username or Password is Incorrect!")


@method_decorator(ensure_csrf_cookie, name="dispatch")
class LogoutView(APIView):
    def post(self, request):
        response = HttpResponse({"success": "Successfully logged out"})
        response.set_cookie(
            "sessionid",
            "",
            expires=datetime.datetime.utcnow() - datetime.timedelta(days=1),
            httponly=True,
        )
        return response
