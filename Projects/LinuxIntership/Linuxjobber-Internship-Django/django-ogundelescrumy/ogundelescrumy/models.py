from django.db import models

# Create your models here.
class ScrumyUser(models.Model):
  ROLES = (
    ('OW', 'Owner'),
    ('AD', 'Admin'),
    ('QA', 'Quality Analyst'),
    ('DV', 'Developer'),
  )
  username = models.CharField(max_length=100)
  password = models.CharField(max_length=128)
  role = models.CharField(max_length=2, choices=ROLES)

  def __str__(self):
    return self.username


class ScrumyGoals(models.Model):
  scrum_user_assigned_to = models.ForeignKey(ScrumyUser, on_delete=models.CASCADE)
  details = models.TextField()
  goal_state = models.ForeignKey('GoalStatus', on_delete=models.CASCADE)
  date_created = models.DateField()
  date_updated = models.DateField()
  date_verified = models.DateField()
  date_completed = models.DateField()

  def __str__ (self):
    return self.details



class GoalStatus(models.Model):
  STATUS = (
    ('V', 'Verified'),
    ('P', 'Pending'),
    ('D', 'Done'),
  )

  TYPES = (
    ('WG', 'Weekly Goals'),
    ('DG', 'Daily Goals'),
  )

  goal_status = models.CharField(max_length=1, choices=STATUS)
  goal_type = models.CharField(max_length=2, choices=TYPES)

  def __str__(self):
    return self.goal_type + " " + self.goal_status