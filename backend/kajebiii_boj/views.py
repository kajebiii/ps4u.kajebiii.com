from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Submission
from django.db.models import Q


@api_view(['GET'])
def get_last_ac_source(request, problem):
    last_ac_submission = Submission.objects.filter(Q(problem=problem) & Q(result="ac")).last()
    if last_ac_submission is None:
        return Response("No AC Submission")
    return Response(last_ac_submission.source)
