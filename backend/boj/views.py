from rest_framework.response import Response
from rest_framework.decorators import api_view
from utility import safeData
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
        ac_problems = re.findall('class="result-ac">([\s\S]*?)</a>', ac_table, re.DOTALL)
        for i in range(0, len(ac_problems), 2):
            problem_list[int(ac_problems[i])] = "AC"
        wa_problems = re.findall('class="result-wa">([\s\S]*?)</a>', wa_table, re.DOTALL)
        for i in range(0, len(wa_problems), 2):
            problem_list[int(wa_problems[i])] = "WA"
    return Response(problem_list)
