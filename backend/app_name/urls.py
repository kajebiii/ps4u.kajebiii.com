from rest_framework.urlpatterns import format_suffix_patterns
from app_name import views
from django.conf.urls import url
from django.conf.urls import include

urlpatterns = [
    url(r'^user/$', views.UserView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)
