from django.apps import AppConfig
from utility import safeData, db_lock
import re
import time
import threading
import queue
import traceback


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
    ret = {'can_submit': True, 'title': '', 'parent': [], 'id': num}
    if urlData.status_code == 404:
        ret['can_submit'] = False
        return ret
    htmlData = urlData.content.decode('utf-8')

    title = re.findall('<span id="problem_title" class="">([\s\S]*?)</span>', htmlData, re.DOTALL)[0]
    if len(title) == 0:
        print(num + " problem is in use for contest")
        ret['can_submit'] = False
        return ret
    ret['title'] = title[0]
    sources = re.findall('<section id = "source">([\s\S]*?)</section>', htmlData, re.DOTALL)
    for source in sources:
        ret['parent'] = re.findall('"/category/detail/([\s\S]*?)"', source)
    return ret


def parse_all_category():
    from .models import Category, Contest
    is_first = True
    while True:
        category_queue = queue.Queue()
        category_queue.put({'isContest': False, 'title': '출처', 'parent': None, 'id': '0'})
        while not category_queue.empty():
            current_category = category_queue.get()
            time.sleep(2)

            merge_parent_title = ""
            if current_category['parent']:
                merge_parent_title = Category.objects.get(pk=current_category['parent']).merge_parent_title
                if current_category['parent'] != "0":
                    merge_parent_title += " \\ "
                merge_parent_title += Category.objects.get(pk=current_category['parent']).title

            db_lock.acquire()
            if not current_category['isContest']:
                Category(
                    id=current_category['id'],
                    title=current_category['title'],
                    merge_parent_title=merge_parent_title,
                    parent_category=
                    Category.objects.get(pk=current_category['parent'])
                    if current_category['parent'] else None
                ).save()
            else:
                Contest(
                    id=current_category['id'],
                    title=current_category['title'],
                    merge_parent_title=merge_parent_title,
                    parent_category=Category.objects.get(pk=current_category['parent'])
                ).save()
                #problems = get_problems(current_category['id'])
            db_lock.release()

            if not current_category['isContest']:
                for subcategory in get_subcategory(current_category['id']):
                    category_queue.put(subcategory)
        if is_first:
            th = threading.Thread(target=parse_all_problem, daemon=True)
            th.start()
            is_first = False
        time.sleep(3600)


def parse_all_problem():
    from .models import Contest, Problem
    while True:
        print("start parse_all_problem..")
        for problem_id in range(1000, 19999, 1):
            current_problem = parse_problem(problem_id)
            db_lock.acquire()
            problem, created = Problem.objects.get_or_create(
                id=current_problem['id'],
                defaults={
                    'title': current_problem['title'],
                    'can_submit': current_problem['can_submit']
                }
            )
            problem.title = current_problem['title']
            problem.can_submit = current_problem['can_submit']
            problem.save()
            try:
                contests = []
                for contest in current_problem['parent']:
                    contests.append(Contest.objects.get(pk=contest))
                problem.parent_contest.add(*contests)
            except Exception as e:
                print('>>> %s - ' % "problem.add Error", e)
                traceback.print_tb(e.__traceback__)
                print('<<<')
            db_lock.release()
            time.sleep(2)


class BojConfig(AppConfig):
    name = 'boj'

    def ready(self):
        th = threading.Thread(target=parse_all_category, daemon=True)
        th.start()
        pass