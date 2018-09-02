from rest_framework.urlpatterns import format_suffix_patterns
from boj import views
from django.urls import path

urlpatterns = [
    path('problem-list/<slug:user_id>/', views.get_problem_list),
    path('ac-problem-list/<slug:user_id>/', views.get_ac_problem_list),
    path('all-contest-with-problem/', views.get_all_contest_with_problem),
]

urlpatterns = format_suffix_patterns(urlpatterns)
