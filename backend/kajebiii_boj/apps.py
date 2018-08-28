from django.apps import AppConfig
from django.conf import settings
import requests
import re
import html
import os
import time
import threading

s = requests.session()

INF = 999999999999999
now_submission = INF
alive = True


def safeData(isPost=False, url="https://www.acmicpc.net", data={}):
    while(True):
        try:
            returnVal = (s.post(url, data=data, timeout=5) if isPost else s.get(url, timeout=5))
            break
        except:
            print("Internet connection is Bad (in safeData)")
            time.sleep(1)
    return returnVal


def login(user_id, user_password):
    urlData = safeData(isPost=True, url="https://www.acmicpc.net/signin", data={'login_user_id': user_id, 'login_password': user_password})
    afterlogin = urlData.content.decode('utf-8')
    find_register = re.findall('"/register">(.*?)</a>', afterlogin)
    if len(find_register) >= 1:
        return False
    return True


def downloadCode(submit_id, problem, result, language):
    from .models import Submission
    urlData = safeData(isPost=False, url= 'https://www.acmicpc.net/source/%s' % submit_id)
    codeHtml = urlData.content.decode('utf-8')
    unescape = html.unescape(codeHtml)
    code = re.findall('<textarea.*?>([\s\S]*?)</textarea>', unescape)[0]
    Submission(submission=submit_id, problem=problem, result=result, source=code, language=language).save()


def findAClist(user_id, top_submit, past_submit):
    urlData = safeData(isPost=False, url='https://www.acmicpc.net/status?user_id=%s&top=%s' % (user_id, top_submit))
    htmlData = urlData.content.decode('utf-8')

    submission_list = re.findall('<tr ([\s\S]*?)</tr>', htmlData, re.DOTALL)

    parse_result = []
    for i in range(0, len(submission_list), 1):
        data = submission_list[i]
        submit_id = re.findall('id = "solution-(.*?)"', data)[0]
        #username = re.findall('<a href="/user/(.*?)"', data)[0]
        problem = re.findall('<a href="/problem/(.*?)"', data)
        if len(problem) == 0:
            print("problem is in contest")
            break
        problem = problem[0]

        #memoryuse = re.findall('<td class = "memory">(.*?)<', data)[0]
        #timeuse = re.findall('<td class = "time">(.*?)<', data)[0]
        language = re.findall('<a href="/source/'+submit_id+'">(.*?)</a>', data)[0]
        result = re.findall('<span class="result-(.*?)"', data)[1]
        if result == "wait" or result == "judging":
            break
        modifybutton = re.findall('<a href = "/submit/(.*?)"', data)
        if len(modifybutton) == 0:
            print("there is no modify button in status, please login again")
            break
        if past_submit == int(submit_id):
            break
        parse_result.append((int(submit_id), int(problem), result, language))
    return parse_result


def parseBOJ(username, password):
    from .models import Submission
    last_submission = Submission.objects.all().last()
    past_submission = last_submission.submission if last_submission is not None else 0
    print("Update aleary [1 ~ " + str(past_submission) + ']')
    while True:
        new_submission_list = []
        now_submission = INF
        while True:
            new_submission_list = new_submission_list + findAClist(username, now_submission, past_submission)
            if len(new_submission_list) == 0 or new_submission_list[-1][0] - 1 == now_submission:
                break
            now_submission = new_submission_list[-1][0] - 1
            print("Parsed " + str(new_submission_list[-1][0]) + " to " + str(new_submission_list[0][0]))
        new_submission_list = new_submission_list[::-1] # reverse
        for new_submission in new_submission_list:
            submit_id, problem, result, language = new_submission
            downloadCode(submit_id, problem, result, language)
        if len(new_submission_list) != 0:
            print("Update Finish [" + str(new_submission_list[0][0]) + ", " + str(new_submission_list[-1][0]) + "]")
            past_submission = new_submission_list[-1][0]
        time.sleep(60)


class KajebiiiBojConfig(AppConfig):
    name = 'kajebiii_boj'

    def ready(self):
        username = getattr(settings, "BOJ_ID", None)
        password = getattr(settings, "BOJ_PASSWORD", None)
        if username is None or password is None:
            print("Please Add BOJ_ID / BOJ_PASSWORD in backend/settings/secret.json")
            pass
        if not login(username, password):
            print("login failed, please check user id and password")
            pass
        th = threading.Thread(target=parseBOJ, args=[username, password], daemon=True)
        th.start()
        pass
