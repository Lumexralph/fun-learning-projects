from django.forms import ModelForm
from django.core.exceptions import ValidationError
from ogundelescrumy.models import ScrumyUser, ScrumyGoals, GoalStatus

class ScrumyUserForm(ModelForm):
  class Meta:
    model = ScrumyUser
    fields = ['username', 'password']


class ScrumyGoalsForm(ModelForm):
  class Meta:
    model = ScrumyGoals
    fields = '__all__'

class ScrumyGoalsUpdateForm(ModelForm):
  class Meta:
    model = ScrumyGoals
    fields = '__all__'