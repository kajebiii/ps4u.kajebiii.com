from rest_framework.urlpatterns import format_suffix_patterns
from kajebiii_boj import views
from django.conf.urls import url

urlpatterns = [
    url(r'^last-ac-source/(?P<problem>[0-9]+)/$', views.get_last_ac_source),
]

urlpatterns = format_suffix_patterns(urlpatterns)
