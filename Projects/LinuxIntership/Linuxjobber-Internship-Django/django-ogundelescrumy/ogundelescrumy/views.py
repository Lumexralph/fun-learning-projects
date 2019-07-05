from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import ScrumyUser, ScrumyGoals, GoalStatus
from ogundelescrumy.forms import ScrumyUserForm, ScrumyGoalsForm, ScrumyGoalsUpdateForm

# Create your views here.

def index(request):
  # user = ScrumyUser.objects.get(pk=1)
  all_users = ScrumyUser.objects.all()
  number_of_users = all_users.count()
  

  for i in range(1, number_of_users):
    get_object_or_404(ScrumyUser, id=i)

  context = {'all_user': all_users}
  return render(request, 'index.html', context)


def move_goal(request, task_id):
  task =  ScrumyGoals.objects.get(pk=task_id
  )

  if request.method == "POST":
    move_goal_form = ScrumyGoalsUpdateForm(request.POST)

    if move_goal_form.is_valid():
       task.goal_state = move_goal_form.cleaned_data.get('goal_state')
       task.save()
       return redirect('index')

  else:
    move_goal_form = ScrumyGoalsUpdateForm(instance = task)
    context = {
                'move_goal_form' : move_goal_form,
                'task_id': task_id
                }
    
    return render(request, 'move_goal.html', context)


      


def add_user(request):
  # if data has been inputed
  if request.method == "POST":
    user_form = ScrumyUserForm(request.POST)

    if user_form.is_valid():
       user = user_form.save(commit=False)
       user.role = "DV"
       user.save()
       return redirect('index')

  else:
    # display a new user form before 
    # data is inputed
    user_form = ScrumyUserForm()
    context = {'user_form' : user_form}

    # save in db
    # new_user.save()
    return render(request, 'add_user.html', context) 


def add_goal(request):
  # if data has been inputed
  if request.method == "POST":
    new_goal_form = ScrumyGoalsForm(request.POST)

    if new_goal_form.is_valid():
       new_goal_form.save()
       return redirect('index')

  else:
    # display a new user form before 
    # data is inputed
    new_goal_form = ScrumyGoalsForm()
    context = {'new_goal_form' : new_goal_form}
    # save in db
    # new_user.save()
    return render(request, 'add_goal.html', context) 
   
  