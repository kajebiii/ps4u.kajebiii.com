import json, base64, threading
from app import requestBOJ

INF = 9999999999999999
past_submit = INF;
memo_submit = INF;

account = None;
secret = None;
categoryRoot = None;
lock = threading.Lock();


def importData():

	global account, secret, categoryRoot, past_submit, memo_submit;
	try:
		with open('app/data/account.txt', 'r') as f:
			account = json.loads(f.read())
	except:
		account = None;
	try:
		with open('app/data/secret.txt', 'r') as f:
			secret = json.loads(f.read())
	except:
		secret = None;
	try:
		with open('app/data/problems.txt', 'r') as f:
			past_submit = json.loads(f.read())
			memo_submit = past_submit
	except:
		past_submit = memo_submit = 0

	try:
		with open('app/data/categoryRoot.txt', 'r') as f:
			categoryRoot = json.loads(f.read())
	except:
		print('There is No categoryRoot.txt');
		print('Please Wait..');
		lock.acquire();
		categoryRoot = requestBOJ.parseCategory();
		lock.release();


def exportData():
	global categoryRoot, past_submit, memo_submit;
	with open('app/data/problems.txt', 'w') as f:
		f.write(json.dumps(memo_submit))
	with open('app/data/categoryRoot.txt', 'w') as f:
		f.write(json.dumps(categoryRoot))
































