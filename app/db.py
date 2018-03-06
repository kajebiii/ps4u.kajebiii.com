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
		with open('app/data/private/account.txt', 'r') as f:
			account = json.loads(f.read())
	except:
		print('There is No account.txt in app/data/private/')
		account = None;
	try:
		with open('app/data/private/secret.txt', 'r') as f:
			secret = json.loads(f.read())
	except:
		print('There is No secret.txt in app/data/private/')
		secret = None;
	try:
		with open('app/data/problems.txt', 'r') as f:
			past_submit = json.loads(f.read())
			memo_submit = past_submit
	except:
		print('There is No problems.txt in app/data/')
		past_submit = memo_submit = 0

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
	global categoryRoot, past_submit, memo_submit;
	with open('app/data/problems.txt', 'w') as f:
		f.write(json.dumps(memo_submit))
	with open('app/data/categoryRoot.txt', 'w') as f:
		f.write(json.dumps(categoryRoot))
































