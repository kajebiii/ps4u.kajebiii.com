import requests, re, html, json, os, time
from app import db

s = requests.session()

def safeData(isPost=False, url="https://www.acmicpc.net", data={}):
	while(True):
		try:
			returnVal = (s.post(url, data=data, timeout=5) if isPost else s.get(url, timeout=5));
			break;
		except:
			print("Internet connection is Bad (in requestBOJ)");
			time.sleep(1);
	return returnVal;





def getProblemList(user_id):
	submission = json.loads(safeData(isPost=False, url='http://kenkoooo.com/atcoder/atcoder-api/results?user=%s' % (user_id)).content.decode('utf-8'));
	sub_info = {};
	for sub in submission:
		if(sub['result'] == "AC" or not sub["problem_id"] in sub_info):
			sub_info[sub["problem_id"]] = sub['result'];
	return sub_info;



