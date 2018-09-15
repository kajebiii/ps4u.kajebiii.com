from rest_framework import serializers
from .models import *
import boj.models


class TagListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name', 'abbreviation')


class TagSerializer(serializers.ModelSerializer):
    boj = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tag
        fields = ('name', 'abbreviation', 'boj')

    def get_boj(self, obj):
        return boj.models.Problem.objects.filter(tags=obj.id).values_list('id', 'thinking_rating', 'implement_rating')


class BaseProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('thinking_rating', 'implement_rating', 'problem_summary', 'solution_summary', 'tags')
        abstract = True
