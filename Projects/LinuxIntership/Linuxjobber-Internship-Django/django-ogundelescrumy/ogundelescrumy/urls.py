from django.urls import path

from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('tasks/', views.add_goal, name='add_goal'),
  path('tasks/<int:task_id>/', views.move_goal, name='move_goal'),
  path('users/', views.add_user, name='add_user'),
  ]