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


def getCategoryURL(category_num):
	return 'https://www.acmicpc.net/category/%s' % str(category_num);
def getDetailURL(detail_num):
	return 'https://www.acmicpc.net/category/detail/%s' % str(detail_num);
def getProblemURL(problem_num):
	return 'https://www.acmicpc.net/problem/%s' % str(problem_num);

"""
KOOSA.GA WAS DEAD
X
"""
def getRatingKSG(problem_list):
	try:
		for i in range(0, len(problem_list)):
			problem_list[i] = int(problem_list[i])
	except Exception as e:
		print('>>>> getRatingKSG int()');
		traceback.print_tb(e.__traceback__);
		return None;
	urlData = safeData(isPost=False, url='https://koosa.ga/api/prob?q=%s' % (str(problem_list)));
	htmlData = urlData.content.decode('utf-8');
	rating = json.loads(htmlData);
	if('success' in rating):
		return rating['result'];
	return None;

def parseDetail(num):
	urlData = safeData(isPost=False, url='https://www.acmicpc.net/category/detail/%s' % (num));
	htmlData = urlData.content.decode('utf-8');

	problems = re.findall('<tr>[\s\S]*?<td>([\s\S]*?)</td>', htmlData, re.DOTALL);
	ratings = getRatingKSG(problems);
	return {'problem' : problems}

def parseCategory(num = '0'):
	urlData = safeData(isPost=False, url='https://www.acmicpc.net/category/%s' % (num));
	htmlData = urlData.content.decode('utf-8');

	ret = [];

	subCategory = re.findall('<td class ?= ?"click-this">([\s\S]*?)</td>', htmlData, re.DOTALL);
	for sub in subCategory:
		subNum = re.findall('<a href = "/category/([\s\S]*?)"', sub)[0];
		subTitle = re.findall('>([\s\S]*?)</a>', sub)[0];
		while(True):
			l = subTitle.find("<span");
			r = subTitle.find("/span>");
			if(l == -1 or r == -1): break;
			r += 6;
			subTitle = subTitle[0:l] + subTitle[r:]
		detailNum = re.findall('detail/([\s\S]*?)"', subNum+'"');
		if(len(detailNum) == 0):
#It is subCategory
			#print(subNum, subTitle);
			ret.append({'isDetail':False, 'title':subTitle, 'num':subNum, 'data':parseCategory(subNum)});
		else:
#It is detail
			detailNum = detailNum[0];
			#print(detailNum, subTitle);
			ret.append({'isDetail':True, 'title':subTitle, 'num':detailNum, 'data':parseDetail(detailNum)});
		if(num == '0'): print(subTitle + ' is Done');
	return ret;

def categorySetting():
	db.categoryRoot = parseCategory();


def getProblemList(user_id):
	urlData = safeData(isPost=False, url='https://www.acmicpc.net/user/%s' % (user_id));
	htmlData = urlData.content.decode('utf-8');

	tables = re.findall('<div class="panel panel-default">([\s\S]*?)</div>[\s]*?</div>', htmlData, re.DOTALL);
	if(len(tables) != 2):
		return {'AC':[], 'WA':[]}
	ac_table = tables[0];
	wa_table = tables[1];
	
	ac_problems = re.findall('class="">([\s\S]*?)</a>', ac_table, re.DOTALL);
	ac_problems = [int(ac_problems[i]) for i in range(0, len(ac_problems), 2)]
	wa_problems = re.findall('class="">([\s\S]*?)</a>', wa_table, re.DOTALL);
	wa_problems = [int(wa_problems[i]) for i in range(0, len(wa_problems), 2)]
	#print(ac_problems)
	#print(wa_problems)
	
	return {'AC':ac_problems, 'WA':wa_problems}



def getBOJinfo(user_id):
	status = safeData(isPost=False, url='https://www.acmicpc.net/user/%s' % (user_id));
	print("getBOJinfo " + user_id + ":" + str(status.status_code));
	if(status.status_code != 200):
		return None;
	htmlData = status.content.decode('utf-8');	
	#with open('data.txt', 'w', encoding='utf-8') as f:f.write(htmlData);
	result = re.findall('<tr>([\s\S]*?)</tr>', htmlData, re.DOTALL)
	for i in range(len(result)):
		result[i] = result[i].replace('\t', '');
	res = {};
	for info in result:
		tag = re.findall('<th>([\s\S]*?)</th>', info, re.DOTALL)[0]
		allValue = re.findall('<td>([\s\S]*?)</td>', info, re.DOTALL)
		if(len(allValue) == 0): break;
		#print(tag, allValue)
		allValue = allValue[0].replace("><", "")
		values = re.findall('>([\s\S]*?)<', allValue, re.DOTALL);
		value = "";
		for val in values: value = value + val;
		"""
		delA = re.findall('>([\s\S]*?)</a', allValue[0], re.DOTALL)
		if(len(delA) == 0): delA = allValue;
		value = re.findall('>([\s\S]*?)</span', delA[0], re.DOTALL)
		if(len(value) == 0): value = delA;
		value = value[0].strip()
		"""
		res[tag] = value;
		#res.append((tag, value))
		#print(tag, value)
	#print(res)
	return res;
