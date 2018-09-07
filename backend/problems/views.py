from rest_framework import generics
from django.shortcuts import get_object_or_404
from problems.serializers import *


class TagListView(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagListSerializer


class TagView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TagSerializer

    def get_object(self):
        tag_id = self.kwargs["tag_id"]
        return get_object_or_404(Tag, id=tag_id)
