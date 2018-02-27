from functools import reduce
from app import app, cppToImage, db, requestBOJ
import os, urllib.parse, html, json
import flask
from io import BytesIO


#codeToImage (ONLY C++ to Image)
@app.route('/codeToImage/text/<string:text>')
def codeToImageMaker(text):
	text = text.replace('&slash;', '/')
	text = html.unescape(text)
	text = urllib.parse.unquote(text)
	text = text.replace('\r\n', '\n')
	byte_io = BytesIO();
	FONT_SIZE = 22;
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

#KAJEBIII's BOJ AC CODE IMAGES
@app.route('/boj/code/<int:problemNumber>/')
def bojCode(problemNumber):
	abs_path = os.path.join(app.root_path, 'code/' + str(problemNumber))
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
	abs_path = os.path.join(app.root_path, 'code/')
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

#LOGIN
@app.route('/login/', methods=['GET', 'POST'])
def login():
	tagGet = "Get IDs"
	tagLogin = "Login"
	if(flask.request.method == 'POST'):
		action = flask.request.form.get('action', '');
		if(action == "Get IDs"):
			id_BOJ = flask.request.form.get('id_BOJ', '').strip();
			BOJinfo = requestBOJ.getBOJinfo(id_BOJ);
			if(BOJinfo == None):
				return flask.redirect(flask.url_for('error', errorType = "NONE_BOJ_ID"));
				#error("NONE_BOJ_ID")
			print('USER(' + flask.session.get('id_BOJ', 'NONE') + ') login as USER(' + id_BOJ + ')');
			flask.session['id_BOJ'] =  id_BOJ;
			flask.session['id_AC']  = flask.session['id_BOJ'];
			flask.session['id_TC']  = BOJinfo["Topcoder"] if "Topcoder" in BOJinfo else flask.session['id_BOJ'];
			flask.session['id_CF']  = BOJinfo["Codeforces"] if "Codeforces" in BOJinfo else flask.session['id_BOJ'];
		else:
			flask.session['id_BOJ'] = flask.request.form.get('id_BOJ', '').strip();
			flask.session['id_AC']  = flask.request.form.get('id_AC' , '').strip();
			flask.session['id_CF']  = flask.request.form.get('id_CF' , '').strip();
			flask.session['id_TC']  = flask.request.form.get('id_TC' , '').strip();
			return flask.redirect(flask.url_for('index'));
	return flask.render_template('login.html', tagGet = tagGet, tagLogin = tagLogin);

"""
@app.route('/chest/boj/all/')
def chestBOJAll():
	ac_wa_info = requestBOJ.getProblemList(flask.session.get('id_BOJ', ''))
	db.lock.acquire();
	data = util.getCategoryTree(db.categoryRoot, ac_wa_info, 0, hasFold = False);
	db.lock.release();
	return flask.render_template('chestBOJOneTable.html', tableContent = data);

@app.route('/chest/boj/tree')
def chestBOJTree():
	ac_wa_info = requestBOJ.getProblemList(flask.session.get('id_BOJ', ''))
	db.lock.acquire();
	data = util.getCategoryTree(db.categoryRoot, ac_wa_info, 0, hasFold = True);
	db.lock.release();
	return flask.render_template('chestBOJOneTable.html', tableContent = data);
"""

"""
@app.route('/chest/boj/', methods=['GET', 'POST'])
def chestBOJ():
	ac_wa_info = requestBOJ.getProblemList(flask.session.get('id_BOJ', ''))
	db.lock.acquire();
	search = flask.request.form.get('search', "").strip();
	if(flask.request.method == 'POST'):
		data = util.getCategoryTable(db.categoryRoot, ac_wa_info, "출처 ", -1, flask.request.form);
	else:
		data = util.getCategoryTable(db.categoryRoot, ac_wa_info, "출처 ", -1);
	db.lock.release();
	return flask.render_template('chestBOJ.html', tableContent = data, search = search);
"""

@app.route('/chest/boj/')
def chestBOJ():
	ac_wa_info = requestBOJ.getProblemList(flask.session.get('id_BOJ', ''))
	db.lock.acquire();
	search = flask.request.form.get('search', "").strip();
	data = db.categoryRoot;
	db.lock.release();
	return flask.render_template('chestBOJ.html', tableContent = json.dumps(data), ac_wa_info = json.dumps(ac_wa_info), search = search);




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




