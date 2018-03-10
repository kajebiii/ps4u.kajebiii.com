from functools import reduce
from app import app, cppToImage, db, requestBOJ
import os, urllib.parse, html, json
import flask
from io import BytesIO

def check_login(*arg, **kwargs):
	if 'login' in kwargs and kwargs['login']:
		if not flask.session.get('id_BOJ', False):
			return flask.redirect(flask.url_for('login'));
def check_admin_login(*arg, **kwargs):
	if 'admin_login' in kwargs and kwargs['admin_login']:
		if not flask.session.get('admin', False):
			return flask.redirect(flask.url_for('admin_login'));

#LOGIN
@app.route('/login/', methods=['GET', 'POST'])
def login():
	tagGet = "get IDs"
	tagLogin = "login"
	if flask.request.method == 'POST':
		action = flask.request.form.get('action', '');
		if action == tagGet:
			id_BOJ = flask.request.form.get('id_BOJ', '').strip();
			BOJinfo = requestBOJ.getBOJinfo(id_BOJ);
			if BOJinfo == None: return flask.redirect(flask.url_for('error', errorType="NONE_BOJ_ID"));
			print('USER(' + flask.session.get('id_BOJ', 'NONE') + ') login as USER(' + id_BOJ + ')');
			flask.session['id_BOJ'] =  id_BOJ;
			flask.session['id_AC']  = flask.session['id_BOJ'];
			flask.session['id_TC']  = BOJinfo["Topcoder"] if "Topcoder" in BOJinfo else flask.session['id_BOJ'];
			flask.session['id_CF']  = BOJinfo["Codeforces"] if "Codeforces" in BOJinfo else flask.session['id_BOJ'];
		else:
			flask.flash("login successful")
			for value in ['id_BOJ', 'id_AC', 'id_CF', 'id_TC']:
				flask.session[value] = flask.request.form.get(value, '').strip();
			return flask.redirect(flask.url_for('index'));
	return flask.render_template('login/login.html', tagGet = tagGet, tagLogin = tagLogin);
@app.route('/logout/')
def logout():
	if flask.session['id_BOJ']: 
		flask.flash("logout successful")
		flask.session.pop('id_BOJ')
		flask.session.pop('id_AC')
		flask.session.pop('id_TC')
		flask.session.pop('id_CF')
	return flask.redirect(flask.url_for('index'));
@app.route('/admin_login/', methods=['GET', 'POST'])
def admin_login():
	if flask.request.method == 'POST':
		action = flask.request.form.get('action', '');
		if action == "login":
			identify = flask.request.form.get('id', '').strip();
			password = flask.request.form.get('password', '').strip();
			if db.account != None and identify == db.account['BOJ_id'] and password == db.account['BOJ_password']:
				flask.flash("admin_login successful")
				flask.session['admin'] = True;
				return flask.redirect(flask.url_for('index'));
			else:
				flask.flash("admin_login failed")
				return flask.redirect(flask.url_for('admin_login'));
		else: return error("INVALID IN ADMIN_LOGIN")
	return flask.render_template('login/admin.html');
@app.route('/admin_logout/')
def admin_logout():
	if 'admin' in flask.session: 
		flask.flash("admin_logout successful")
		flask.session.pop('admin')
	return flask.redirect(flask.url_for('index'));

#codeToImage (ONLY C++ to Image)
FONT_SIZE = 22;
@app.route('/codeToImage/text/<string:text>')
def codeToImageMaker(text):
	text = text.replace('&slash;', '/')
	text = html.unescape(text)
	text = urllib.parse.unquote(text)
	text = text.replace('\r\n', '\n')
	byte_io = BytesIO();
	image = cppToImage.makeImage(text, FONT_SIZE).save(byte_io, 'PNG');
	byte_io.seek(0)
	return flask.send_file(byte_io, mimetype='image/png');
@app.route('/codeToImage', methods=['GET', 'POST'])
def codeToImage():
	return flask.render_template('cppHighlight.html');
	exampleText = '#include <iostream>\n\nusing namespace std\n\nint main(){\n\t...\n}';
	if(flask.request.method == 'POST'):
		text = flask.request.form.get('cppCode', exampleText).strip();
		if(len(text) == 0): text = exampleText;
		escapeText = html.escape(text).replace('/', '&slash;')
		return flask.render_template('codeToImage.html', text = text, escapeText = escapeText);
	return flask.render_template('codeToImage.html', text = exampleText, escapeText = exampleText);

#BOJ
@app.route('/boj/code/<int:problemNumber>/')
def bojCode(problemNumber):
	abs_path = os.path.join(app.root_path, 'data/private/code/' + str(problemNumber))
	byte_io = BytesIO()
	if not os.path.exists(abs_path):
		cppToImage.noneImage(FONT_SIZE).save(byte_io, 'PNG');
	else:
		files = os.listdir(abs_path)
		maxV = -1 
		for file in files:
			if file[-4:] == ".cpp":
				maxV = max(maxV, int(file[:-4]))
		content = ""
		with open(abs_path + '/' + str(maxV) + '.cpp', 'r') as f:
			content = f.read()
			cppToImage.makeImage(content, FONT_SIZE).save(byte_io, 'PNG');
	byte_io.seek(0)
	return flask.send_file(byte_io, mimetype='image/png')
@app.route('/boj/list/')
def bojList():
	abs_path = os.path.join(app.root_path, 'data/private/code/')
	if not os.path.exists(abs_path):
		print("there is no code directory")
		flask.abort(404)
	files = os.listdir(abs_path)
	for i in range(len(files)):
		files[i] = int(files[i])
	files.sort()
	return flask.render_template('bojList.html', title='boj list', files=files)
@app.route('/boj/<int:problemNumber>/')
def bojProblem(problemNumber):
	return flask.render_template('bojProblem.html', title=problemNumber, problemNumber=problemNumber)
@app.route('/chest/boj/')
def chestBOJ():
	ac_wa_info = requestBOJ.getProblemList(flask.session.get('id_BOJ', ''))
	db.lock.acquire();
	search = flask.request.form.get('search', "").strip();
	data = db.categoryRoot;
	db.lock.release();
	return flask.render_template('chestBOJ.html', tableContent = data, ac_wa_info = ac_wa_info, search = search);

#Atcoder
@app.route('/atcoder/list/')
def atcoderList():
	db.lock.acquire(); 
	problems = db.atcoder['problem'];
	contests = {"agc":[], "arc":[], "abc":[], "other":[]};
	translate = db.atcoder['translate'];
	for contest in db.atcoder['contest']:
		foundGroup = False;
		for key in ['agc', 'arc', 'abc']:
			if contest['id'].startswith(key):
				contests[key].append(contest);
				foudnGroup = True;
				break;
		if not foundGroup:
			contests['other'].append(contest);
	db.lock.release();
	print(problems[0])
	return flask.render_template('atcoderList.html', title='Atcoder list', problems=problems, contests=contests, translate=translate)
@app.route('/atcoder/modify/translate/', methods=['GET', 'POST'])
def atcoderModifyTranslate():
	problem = None;
	contest = None;
	if flask.request.method == 'POST':
		contest = flask.request.form.get('contest', '');
		problem = flask.request.form.get('problem', '');
		translate_ko = flask.request.form.get('translate_ko', '').strip();
		db.lock.acquire();
		if not problem in db.atcoder['translate']: 
			if translate_ko: db.atcoder['translate'][problem] = {'translate_ko':translate_ko};
		else:
			if translate_ko: db.atcoder['translate'][problem] = {'translate_ko':translate_ko};
			else: db.atcoder['translate'].pop(problem, None);
		db.lock.release();

	db.lock.acquire();
	problems = db.atcoder['problem'];
	contests = db.atcoder['contest'];
	translate = db.atcoder['translate'];
	db.lock.release();
	return flask.render_template('atcoderModifyTranslate.html', title="Atcoder Modify Translate",  problems=problems, contests=contests, translate=translate, problem=problem, contest=contest)
@app.route('/atcoder/<string:problem_id>/')
def atcoderProblem(problem_id):
	db.lock.acquire();
	translate = db.atcoder['translate'].get(problem_id, "");
	db.lock.release();
	return flask.render_template('atcoderProblem.html', title=problem_id, problem_id=problem_id, translate=translate)
#ERROR
@app.route('/error/<string:errorType>')
def error(errorType):
	return flask.render_template('error.html', errorType = errorType);
#INDEX
@app.route('/')
@app.route('/index/')
def index():
	return flask.render_template('index.html');
#FAVICON
@app.route('/favicon.ico')
def favicon():
	#print(app.static_folder, flask.request.path[1:])
	return flask.send_from_directory(app.static_folder, flask.request.path[1:])
#ROBOTS
@app.route('/robots.txt')
def robots():
	#print(app.static_folder, flask.request.path[1:])
	return flask.send_from_directory(app.static_folder, flask.request.path[1:])




