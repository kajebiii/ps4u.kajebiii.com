from rest_framework.urlpatterns import format_suffix_patterns
from kajebiii_boj import views
from django.urls import path

urlpatterns = [
    path('last-ac-source/<int:problem>/', views.get_last_ac_source),
]

urlpatterns = format_suffix_patterns(urlpatterns)
