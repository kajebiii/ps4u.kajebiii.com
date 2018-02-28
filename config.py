import os
from app.db import secret

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

THREADS_PER_PAGE = 2

CSRF_ENABLED     = True

if secret == None:
	print("please setting your own secret keys")
CSRF_SESSION_KEY = secret['CSRF_SESSION_KEY'] if secret != None and 'CSRF_SESSION_KEY' in secret else "Dw0MVse5Un2qDcrVNYZo"

SECRET_KEY = secret['SECRET_KEY'] if secret != None and 'SECRET_KEY' in secret else "wIYPJDCAfgoczzrhgc5E"
