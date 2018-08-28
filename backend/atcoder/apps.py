from django.apps import AppConfig
import json
import time
import threading
import requests

s = requests.session()
lock = threading.Lock()
atcoder = {'contests': [], 'problems': [], 'translate': {}}


def safeData(is_post=False, url="https://www.acmicpc.net", data={}):
    while True:
        try:
            returnVal = (s.post(url, data=data, timeout=5) if is_post else s.get(url, timeout=5))
            break
        except Exception as e:
            print(str(e) + " in safeData")
            time.sleep(10)
    return returnVal


def updateAtcoderInformation():
    while True:
        try:
            contests = requests.get(
                'http://kenkoooo.com/atcoder/atcoder-api/info/contests',
                timeout=60
            ).content.decode('utf-8')
            contests = json.loads(contests)
        except Exception as e:
            print(e)
        try:
            problems = requests.get(
                'http://kenkoooo.com/atcoder/atcoder-api/info/merged-problems',
                timeout=60
            ).content.decode('utf-8')
            problems = json.loads(problems)
        except Exception as e:
            print(e)

        contests = [
            {key: value for key, value in contest.items() if key in ['id', 'title']}
            for contest in contests
        ]
        contests = [contest for contest in contests if contest['id'].startswith(('agc', 'arc', 'abc'))]
        contests = sorted(contests, key=lambda x: x['id'])
        problems = [
            {key: value for key, value in problem.items() if key in ['id', 'contest_id', 'title', 'point']}
            for problem in problems
        ]
        problems = [problem for problem in problems if problem['id'].startswith(('agc', 'arc', 'abc'))]
        problems = sorted(problems, key=lambda x: x['id'])
        lock.acquire()
        global atcoder
        atcoder['contests'] = contests
        atcoder['problems'] = problems
        lock.release()

        #print(atcoder)
        time.sleep(3600)


class AtcoderConfig(AppConfig):
    name = 'atcoder'

    def ready(self):
        th = threading.Thread(target=updateAtcoderInformation, daemon=True)
        th.start()
        pass
