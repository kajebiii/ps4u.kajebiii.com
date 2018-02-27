import os
BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

THREADS_PER_PAGE = 2

CSRF_ENABLED     = True

CSRF_SESSION_KEY = "csrf_session_key"

SECRET_KEY = "secret_key"
