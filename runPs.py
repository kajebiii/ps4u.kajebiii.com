from app import app, db, requestKajebiiiCode
import argparse
import threading, time

print('1. Import')
db.importData()
app.config.from_object('config')

print('2. Thread')

th = [];
th.append(threading.Thread(target = requestKajebiiiCode.parseBOJ, daemon = True))
th = th + db.getThreadList();

requestKajebiiiCode.alive = True
for t in th:
	t.start()
time.sleep(1)

parser = argparse.ArgumentParser()
parser.add_argument('-d', action='store_true')
parser.add_argument('-t', action='store_true')
options = parser.parse_args()
DEBUG = True if options.d else False;
TEST = 8000 if options.t else 8888;


print('3. Run')
app.run(port=TEST, debug=DEBUG)

print('4. Kill Thread')

requestKajebiiiCode.alive = False
db.alive = False

for t in th:
	t.join()

print('5. Export')
db.exportData()



