from rest_framework import generics
import mypermissions
from django.shortcuts import get_object_or_404
from problems.serializers import *


class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagListSerializer
    permission_classes = (mypermissions.IsAdminUserOrReadOnly, )


class TagView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagSerializer
    permission_classes = (mypermissions.IsAdminUserOrReadOnly, )

    def get_object(self):
        tag_id = self.kwargs["tag_id"]
        return get_object_or_404(Tag, id=tag_id)
