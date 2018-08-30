import requests
import time
import threading

s = requests.session()


def safeData(isPost=False, url="https://www.acmicpc.net", data={}):
    while True:
        try:
            returnVal = (s.post(url, data=data, timeout=20) if isPost else s.get(url, timeout=20))
            break
        except:
            print("Internet connection is Bad (in safeData)")
            time.sleep(2)
    return returnVal

db_lock = threading.Lock()