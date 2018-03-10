import requests, re, html, json, os, time
from app import db

s = requests.session()

INF = 999999999999999
now_submit = INF
alive = True


def safeData(isPost=False, url="https://www.acmicpc.net", data={}):
	while(True):
		try:
			returnVal = (s.post(url, data=data, timeout=5) if isPost else s.get(url, timeout=5));
			break;
		except:
			print("Internet connection is Bad (in requestBOJ)");
			time.sleep(1);
	return returnVal;



def login(user_id, user_password):
	urlData = safeData(isPost=True, url="https://www.acmicpc.net/signin", data={'login_user_id': user_id, 'login_password': user_password})
	afterlogin = urlData.content.decode('utf-8');
	find_register = re.findall('"/register">(.*?)</a>', afterlogin);
	if len(find_register) >= 1:
		print("login failed")
		print("please check user id and password")
	else:
		pass

def downloadCode(submit_id, problem):
	urlData = safeData(isPost=False, url= 'https://www.acmicpc.net/source/%s' % submit_id)
	codeHtml = urlData.content.decode('utf-8');
	unescape = html.unescape(codeHtml);
	code = re.findall('<textarea.*?>([\s\S]*?)</textarea>', unescape)[0];
	if os.path.isdir('app/data/private/code/' + problem + '/') == False:
		os.mkdir('app/data/private/code/' + problem + '/')
	codedir = 'app/data/private/code/' + problem + '/' + submit_id + '.cpp'
	with open(codedir, 'w', encoding='utf-8') as f:
		f.write(code)
	imagedir = 'app/data/private/code/' + problem + '/' + submit_id + '.png'

def findAClist(user_id, top_submit):
	urlData = safeData(isPost=False, url='https://www.acmicpc.net/status/?user_id=%s&result_id=4&top=%s' % (user_id, top_submit));
	htmlData = urlData.content.decode('utf-8');

	result = re.findall('<tr ([\s\S]*?)</tr>', htmlData, re.DOTALL)
	if len(result) == 0: return -1

	lastVal = 0
	for i in range(0, len(result), 1):
		data = result[i];
		submit_id = re.findall('id = "solution-(.*?)"', data)[0]
		username = re.findall('<a href="/user/(.*?)"', data)[0]
		problem = re.findall('<a href="/problem/(.*?)"', data)[0]
		memoryuse = re.findall('<td class = "memory">(.*?)<', data)[0]
		timeuse = re.findall('<td class = "time">(.*?)<', data)[0]
#		 print(submit_id, username, problem, memoryuse, timeuse)
		modifybutton = re.findall('<a href = "/submit/(.*?)"', data);
		if (len(modifybutton) == 0):
			print("please login again")
			login(db.account['BOJ_id'], db.account['BOJ_password'])
			break;
		if db.past_submit == int(submit_id): return -1
		downloadCode(submit_id, problem)
		print("submit_id : " + str(submit_id) + " | problem : " + str(problem))
		lastVal = int(submit_id)
		if db.memo_submit == db.past_submit:
			db.memo_submit = int(submit_id)
	return lastVal-1


def parseBOJ():
	if db.account == None:
		return

	global now_submit
	sleepTime = 60
	failCnt = 0
	print("Parsed aleary [1 ~ " + str(db.memo_submit) + ']');
	login(db.account['BOJ_id'], db.account['BOJ_password'])
	while alive:
		while now_submit >= 0:
			now_submit = findAClist(db.account['BOJ_id'], now_submit)
		if(now_submit == -1):
			failCnt = failCnt + 1
			if(db.past_submit != db.memo_submit):
				print("Parsed aleary [1 ~ " + str(db.memo_submit) + ']');
			db.past_submit = db.memo_submit
			now_submit = INF;
		else:
			failCnt = 0
		for i in range(0, sleepTime//10):
			time.sleep(10);
			if(not alive): break;

		#print(now_submit)
