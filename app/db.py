import json, base64, threading, requests, time
from app import requestBOJ

s = requests.session()
def safeData(isPost=False, url="https://www.acmicpc.net", data={}):
	while(True):
		try:
			returnVal = (s.post(url, data=data, timeout=5) if isPost else s.get(url, timeout=5));
			break;
		except:
			print("Internet connection is Bad (in db.py)");
			time.sleep(5);
	return returnVal;

INF = 9999999999999999

atcoder = {'contest':[], 'problem':[], 'translate':[]};
account = None;
secret = None;
past_submit = INF;
memo_submit = INF;
categoryRoot = None;
lock = threading.Lock();

def getThreadList():
	th = []
	th.append(threading.Thread(target = updateAtcoderInformation, daemon = True))
	return th;
	
alive = True;
def updateAtcoderInformation():
	while alive:
		contest = json.loads(safeData(url="http://kenkoooo.com/atcoder/atcoder-api/info/contests").content.decode('utf-8'));
		problem = json.loads(safeData(url="http://kenkoooo.com/atcoder/atcoder-api/info/problems").content.decode('utf-8'));
		#problem = json.loads(safeData(url="http://kenkoooo.com/atcoder/atcoder-api/info/merged-problems").content.decode('utf-8'));
		sorted(contest, key=lambda x : x['id'])   
		sorted(problem, key=lambda x : x['id'])   
		lock.acquire();
		global atcoder;
		atcoder['contest'] = contest;
		atcoder['problem'] = problem;
		lock.release();
		for i in range(360):
			time.sleep(10);
			if not alive: break;

def importData():
	global account, secret, categoryRoot, past_submit, memo_submit, atcoder;
	try:
		with open('app/data/atcoder.txt', 'r') as f:
			atcoder['translate'] = json.loads(f.read());
	except:
		print('There is No atcoder.txt in app/data/')
	try:
		with open('app/data/private/account.txt', 'r') as f:
			account = json.loads(f.read())
	except:
		print('There is No account.txt in app/data/private/')
	try:
		with open('app/data/private/secret.txt', 'r') as f:
			secret = json.loads(f.read())
	except:
		print('There is No secret.txt in app/data/private/')
	try:
		with open('app/data/problems.txt', 'r') as f:
			past_submit = json.loads(f.read())
			memo_submit = past_submit
	except:
		print('There is No problems.txt in app/data/')

	try:
		with open('app/data/categoryRoot.txt', 'r') as f:
			categoryRoot = json.loads(f.read())
	except:
		print('There is No categoryRoot.txt in app/data');
		print('Please Wait..');
		lock.acquire();
		categoryRoot = requestBOJ.parseCategory();
		lock.release();


def exportData():
	global categoryRoot, memo_submit, atcoder;
	with open('app/data/atcoder.txt', 'w') as f:
		print(json.dumps(atcoder['translate']))
		f.write(json.dumps(atcoder['translate']))
	with open('app/data/problems.txt', 'w') as f:
		f.write(json.dumps(memo_submit))
	with open('app/data/categoryRoot.txt', 'w') as f:
		f.write(json.dumps(categoryRoot))
































