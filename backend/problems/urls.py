from rest_framework.urlpatterns import format_suffix_patterns
from problems import views
from django.urls import path

urlpatterns = [
    path('tag/', views.TagListView.as_view()),
    path('tag/<int:tag_id>', views.TagView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
