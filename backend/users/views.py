from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *


class IsPostOrIsAuthenticated(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated


class UserView(APIView):
    permission_classes = (IsPostOrIsAuthenticated, )

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        try:
            username = data['username']
        except Exception:
            return Response("username field required", status=status.HTTP_400_BAD_REQUEST)
        try:
            password = data['password']
        except Exception:
            return Response("password field required", status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.create_user(username, password=password)
        except Exception as e:
            print(e)
            return Response("Wrong request (in create_user)", status=status.HTTP_400_BAD_REQUEST)
        return Response("Signup Success")