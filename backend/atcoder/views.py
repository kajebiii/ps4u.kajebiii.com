from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .apps import atcoder, lock
import requests
import json


@api_view(['GET'])
def get_problem_list(request):
    atcoder_id = request.GET.get('atcoder_id', None)
    if atcoder_id is None:
        return Response("'atcoder_id' field required.", status=status.HTTP_400_BAD_REQUEST)
    submission = ""
    try:
        submission = requests.get(
            'http://kenkoooo.com/atcoder/atcoder-api/results?user=%s' % atcoder_id,
            timeout=60
        ).content.decode('utf-8')
        submission = json.loads(submission)
    except Exception as e:
        print(e)
    sub_info = {}
    for sub in submission:
        if sub['result'] == "AC" or not sub['problem_id'] in sub_info:
            sub_info[sub['problem_id']] = sub['result']
    return Response(sub_info)


@api_view(['GET'])
def get_base_information(request):
    lock.acquire()
    base_information = atcoder
    lock.release()
    return Response(base_information)

