from app import app, db, requestKajebiiiCode
import argparse
import threading, time

print('1. Import')
db.importData()

print('2. Thread')

th = list()
th.append(threading.Thread(target = requestKajebiiiCode.parseBOJ, daemon = True))

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
for t in th:
	t.join()

print('5. Export')
db.exportData()



