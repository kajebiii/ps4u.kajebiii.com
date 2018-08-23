from rest_framework.urlpatterns import format_suffix_patterns
from atcoder import views
from django.conf.urls import url
from django.conf.urls import include

urlpatterns = [
    url(r'^atcoder/problemlist/$', views.getProblemList),
]

urlpatterns = format_suffix_patterns(urlpatterns)
