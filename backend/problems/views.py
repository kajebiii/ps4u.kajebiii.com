from rest_framework import generics
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from problems.serializers import *


class IsAdminUserOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_staff or request.method in ['GET', 'HEAD', 'OPTIONS']


class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagListSerializer
    permission_classes = (IsAdminUserOrReadOnly, )


class TagView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagSerializer
    permission_classes = (IsAdminUserOrReadOnly, )

    def get_object(self):
        tag_id = self.kwargs["tag_id"]
        return get_object_or_404(Tag, id=tag_id)
