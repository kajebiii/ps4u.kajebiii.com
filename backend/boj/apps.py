from django.apps import AppConfig
from django.conf import settings
from utility import safeData
import re
import time
import threading
import queue
import traceback
from bs4 import BeautifulSoup


def getCategoryURL(category_num):
    return 'https://www.acmicpc.net/category/%s' % str(category_num)


def getDetailURL(detail_num):
    return 'https://www.acmicpc.net/category/detail/%s' % str(detail_num)


def getProblemURL(problem_num):
    return 'https://www.acmicpc.net/problem/%s' % str(problem_num)


"""
def getRatingKSG(problem_list):
    try:
        for i in range(0, len(problem_list)):
            problem_list[i] = int(problem_list[i])
    except Exception as e:
        print('>>>> getRatingKSG int()')
        traceback.print_tb(e.__traceback__)
        return None
    urlData = safeData(isPost=False, url='https://koosa.ga/api/prob?q=%s' % (str(problem_list)))
    htmlData = urlData.content.decode('utf-8')
    rating = json.loads(htmlData)
    if('success' in rating):
        return rating['result']
    return None
"""


def get_problems(num):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/category/detail/%s' % num)
    htmlData = urlData.content.decode('utf-8')

    problems = re.findall('<tr>[\s\S]*?<td>([\s\S]*?)</td>', htmlData, re.DOTALL)
    #ratings = getRatingKSG(problems)
    return problems


def get_subcategory(num):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/category/%s' % num)
    htmlData = urlData.content.decode('utf-8')

    ret = []

    tables = re.findall('(<table [\s\S]*</table>)', htmlData, re.DOTALL)
    for table in tables:
        subCategory = re.findall('(<a href = "/category/[\s\S]*?</a>)', table, re.DOTALL)
        for sub in subCategory:
            subNum = re.findall('<a href = "/category/([\s\S]*?)"', sub)[0]
            subTitle = re.findall('>([\s\S]*?)</a>', sub)[0]
            while True:
                l = subTitle.find("<span")
                r = subTitle.find("/span>")
                if l == -1 or r == -1:
                    break
                r += 6
                subTitle = subTitle[0:l] + subTitle[r:]
            detailNum = re.findall('detail/([\s\S]*?)"', subNum+'"')
            if len(detailNum) == 0:
                ret.append({'isContest': False, 'title': subTitle, 'parent': num, 'id': subNum})
            else:
                detailNum = detailNum[0]
                ret.append({'isContest': True,  'title': subTitle, 'parent': num, 'id': detailNum})
    return ret


def parse_problem(num):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/problem/%s' % num)
    ret = {'can_submit': True, 'title': '', 'parent': [], 'id': num, 'description_length': -1}
    if urlData.status_code == 404:
        ret['can_submit'] = False
        return ret
    htmlData = urlData.content.decode('utf-8')

    title = re.findall('<span id="problem_title" class="">([\s\S]*?)</span>', htmlData, re.DOTALL)
    if len(title) == 0:
        print(str(num) + " problem is in use for contest")
        ret['can_submit'] = False
        return ret
    if htmlData.find('label-warning') >= 0:
        ret['can_submit'] = False
    ret['title'] = title[0]

    description = re.findall('(<section id = "description" >[\s\S]*?</section>)', htmlData, re.DOTALL)
    if len(description) == 0:
        print(str(num) + "problem has not description.")
    else:
        description = BeautifulSoup(description[0], features="html.parser")
        description_text = ''.join(description.findAll(text=True))
        description_length = len(re.sub('\s+', '', description_text))
        ret['description_length'] = description_length

    sources = re.findall('<section id = "source">([\s\S]*?)</section>', htmlData, re.DOTALL)
    for source in sources:
        ret['parent'] = re.findall('"/category/detail/([\s\S]*?)"', source)
    return ret


def parse_all_category():
    from .models import Category, Contest, Problem
    is_first = True
    while True:
        category_queue = queue.Queue()
        category_queue.put({'isContest': False, 'title': '출처', 'parent': None, 'id': '0'})
        while not category_queue.empty():
            current_category = category_queue.get()
            time.sleep(20 if is_first else 50)

            merge_parent_title = ""
            if current_category['parent']:
                merge_parent_title = Category.objects.get(id=current_category['parent']).merge_parent_title
                if current_category['parent'] != "0":
                    merge_parent_title += " \\ "
                merge_parent_title += Category.objects.get(id=current_category['parent']).title

            if not current_category['isContest']:
                Category(
                    id=current_category['id'],
                    title=current_category['title'],
                    merge_parent_title=merge_parent_title,
                    parent_category=
                    Category.objects.get(id=current_category['parent'])
                    if current_category['parent'] else None
                ).save()
            else:
                Contest(
                    id=current_category['id'],
                    title=current_category['title'],
                    merge_parent_title=merge_parent_title,
                    parent_category=Category.objects.get(id=current_category['parent'])
                ).save()
                problems = get_problems(current_category['id'])
                for problem_id in problems:
                    problem_id = int(problem_id)
                    if Problem.objects.filter(id=problem_id).count() > 0:
                        Problem.objects.get(id=problem_id).parent_contest\
                            .add(Contest.objects.get(id=current_category['id']))

            if not current_category['isContest']:
                for subcategory in get_subcategory(current_category['id']):
                    category_queue.put(subcategory)
        is_first = False


def modify_problem(problem_id):
    from .models import Contest, Problem
    current_problem = parse_problem(problem_id)
    problem = Problem.objects.get(id=current_problem['id'])
    problem.title = current_problem['title']
    problem.can_submit = current_problem['can_submit']
    problem.description_length = current_problem['description_length']
    problem.save()
    try:
        contests = []
        for contest in current_problem['parent']:
            if Contest.objects.filter(id=contest).count() > 0:
                contests.append(Contest.objects.get(id=contest))
        problem.parent_contest.add(*contests)
    except Exception as e:
        print('>>> %s - ' % "problem.add Error", e)
        traceback.print_tb(e.__traceback__)
        print('<<<')


def parse_not_perfect_problem():
    from .models import Problem
    prime = 7  # must gcd(prime, last_problem_d - 1000 + 1) = 1
    next_problem = 0  # + 1000
    last_problem_id = 19999
    is_first = True
    while True:
        print("start parse_all_problem..")
        for problem_id in range(1000, last_problem_id+1, 1):
            if Problem.objects.filter(id=problem_id).count() == 0:
                Problem(id=problem_id, title="will be update", description_length="-1", can_submit=False).save()
            problem = Problem.objects.get(id=problem_id)
            if not problem.can_submit or problem.description_length == -1\
                    or problem_id == next_problem + 1000:
                modify_problem(problem_id)
                time.sleep(3 if is_first and not getattr(settings, "DEBUG", True) else 60)
                next_problem = (next_problem + prime) % (last_problem_id - 1000 + 1)
        is_first = False


class BojConfig(AppConfig):
    name = 'boj'

    def ready(self):
        th = threading.Thread(target=parse_all_category, daemon=True)
        th.start()
        th = threading.Thread(target=parse_not_perfect_problem, daemon=True)
        th.start()
        pass