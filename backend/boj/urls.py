from rest_framework.urlpatterns import format_suffix_patterns
from boj import views
from django.urls import path

urlpatterns = [
    path('problem-list/<slug:user_id>/', views.get_problem_list),
]

urlpatterns = format_suffix_patterns(urlpatterns)
