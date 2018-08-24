from rest_framework.urlpatterns import format_suffix_patterns
from atcoder import views
from django.conf.urls import url

urlpatterns = [
    url(r'^atcoder/problem-list/$', views.get_problem_list),
    url(r'^atcoder/base-information/$', views.get_base_information),
]

urlpatterns = format_suffix_patterns(urlpatterns)
