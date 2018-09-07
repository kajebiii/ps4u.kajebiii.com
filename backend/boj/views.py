from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from django.shortcuts import get_object_or_404
from utility import safeData
from .serializers import *
from .models import Contest, Problem
from django.db.models import Q
import mypermissions
import re


@api_view(['GET'])
def get_problem_list(request, user_id):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/user/%s' % user_id)
    htmlData = urlData.content.decode('utf-8')

    tables = re.findall('<div class="panel panel-default">([\s\S]*?)</div>[\s]*?</div>', htmlData, re.DOTALL)
    problem_list = {}
    if len(tables) == 2:
        ac_table = tables[0]
        wa_table = tables[1]
        ac_problems = re.findall('class="">([\s\S]*?)</a>', ac_table, re.DOTALL)
        for i in range(0, len(ac_problems), 2):
            problem_list[int(ac_problems[i])] = "AC"
        wa_problems = re.findall('class="">([\s\S]*?)</a>', wa_table, re.DOTALL)
        for i in range(0, len(wa_problems), 2):
            problem_list[int(wa_problems[i])] = "WA"
    return Response(problem_list)


@api_view(['GET'])
def get_ac_problem_list(request, user_id):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/user/%s' % user_id)
    htmlData = urlData.content.decode('utf-8')

    tables = re.findall('<div class="panel panel-default">([\s\S]*?)</div>[\s]*?</div>', htmlData, re.DOTALL)
    problem_list = []
    if len(tables) == 2:
        ac_table = tables[0]
        ac_problems = re.findall('class="">([\s\S]*?)</a>', ac_table, re.DOTALL)
        problem_list = [int(ac_problems[i]) for i in range(0, len(ac_problems), 2)]
    return Response(problem_list)


@api_view(['GET'])
def get_all_contest_with_problem(request):
    all_contest = list(Contest.objects.values().order_by('merge_parent_title', 'title'))
    change_key_names = {
        'id': 'id',
        'title': 'title',
        'merge_parent_title': 'parent_title',
        'parent_category_id': 'parent_id',
    }

    all_contest_with_problem = []
    for contest in all_contest:
        contest_with_problem = {
            'problems': Problem.objects.filter(parent_contest=contest['id']).values_list('id', flat=True)
        }
        for key, value in change_key_names.items():
            contest_with_problem[value] = contest[key]

        all_contest_with_problem.append(contest_with_problem)
    return Response(all_contest_with_problem)


@api_view(['GET'])
def get_problems_sort_by_description_length(request):
    problems_sort_by_description_length = Problem.objects.filter(
        ~(Q(can_submit=False) | Q(description_length=-1))
    ).order_by('description_length')
    return Response({
        'problems': problems_sort_by_description_length.values_list('id', flat=True),
        'description_lengths': problems_sort_by_description_length.values_list('description_length', flat=True)
    })


class ProblemView(generics.RetrieveUpdateAPIView):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = (mypermissions.IsAdminUserOrReadOnly,)

    def get_object(self):
        problem_id = self.kwargs["problem_id"]
        return get_object_or_404(Problem, id=problem_id)
