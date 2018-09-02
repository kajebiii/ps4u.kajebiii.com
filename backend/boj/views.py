from rest_framework.response import Response
from rest_framework.decorators import api_view
from utility import safeData
from .models import Contest, Problem
from django.db.models import Q
import re


@api_view(['GET'])
def get_problem_list(request, user_id):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/user/%s' % user_id)
    htmlData = urlData.content.decode('utf-8')

    tables = re.findall('<div class="panel panel-default">([\s\S]*?)</div>[\s]*?</div>', htmlData, re.DOTALL)
    problem_list = {}
    print(len(tables))
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
    all_contest = Contest.objects.all()

    all_contest_with_problem = {}
    for contest in all_contest:
        all_contest_with_problem[contest.title] = {
            'id': contest.id,
            'parent_title': contest.merge_parent_title,
            'parent_id': contest.parent_category_id,
            'problems': Problem.objects.filter(parent_contest=contest.id).values_list('id', flat=True)
        }
    return Response(all_contest_with_problem)
