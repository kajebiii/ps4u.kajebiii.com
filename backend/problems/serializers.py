from rest_framework import serializers
from .models import *


class TagListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', 'abbreviation')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name', 'abbreviation')


class BaseProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = ('thinking_rating', 'implement_rating', 'problem_summary', 'solution_summary', 'tags')
        abstract = True
