from django.apps import AppConfig
from django.conf import settings


class KajebiiiBojConfig(AppConfig):
    name = 'kajebiii_boj'

    def ready(self):
        username = getattr(settings, "BOJ_ID", None)
        password = getattr(settings, "BOJ_PASSWORD", None)
        if username is None or password is None:
            print("Please Add BOJ_ID / BOJ_PASSWORD in backend/settings/secret.json")
            pass
        pass
