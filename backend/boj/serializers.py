from rest_framework import serializers
from problems.serializers import BaseProblemSerializer
from .models import *


class ProblemSerializer(BaseProblemSerializer):

    class Meta:
        model = Problem
        fields = BaseProblemSerializer.Meta.fields
