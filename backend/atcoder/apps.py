from django.apps import AppConfig
import json
import time
import threading
import requests

s = requests.session()
lock = threading.Lock()
atcoder = {'contest': [], 'problem': [], 'translate': {}}


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
            contest = requests.get(
                'http://kenkoooo.com/atcoder/atcoder-api/info/contests',
                timeout=60
            ).content.decode('utf-8')
            contest = json.loads(contest)
        except Exception as e:
            print(e)
        try:
            problem = requests.get(
                'http://kenkoooo.com/atcoder/atcoder-api/info/merged-problems',
                timeout=60
            ).content.decode('utf-8')
            problem = json.loads(problem)
        except Exception as e:
            print(e)

        contest = sorted(contest, key=lambda x : x['id'])
        problem = sorted(problem, key=lambda x : x['id'])
        lock.acquire()
        global atcoder
        atcoder['contest'] = contest
        atcoder['problem'] = problem
        lock.release()

        #print(atcoder)
        time.sleep(3600)


class AtcoderConfig(AppConfig):
    name = 'atcoder'

    def ready(self):
        th = threading.Thread(target=updateAtcoderInformation, daemon=True)
        th.start()
        pass
