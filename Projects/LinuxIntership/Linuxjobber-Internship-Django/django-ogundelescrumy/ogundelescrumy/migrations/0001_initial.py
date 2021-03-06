# Generated by Django 2.0.4 on 2018-04-27 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='GoalStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('goal_status', models.CharField(choices=[('V', 'Verified'), ('P', 'Pending'), ('D', 'Done')], max_length=1)),
                ('goal_type', models.CharField(choices=[('WG', 'Weekly Goals'), ('DG', 'Daily Goals')], max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='ScrumyGoals',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('details', models.TextField()),
                ('date_created', models.DateField()),
                ('date_updated', models.DateField()),
                ('date_verified', models.DateField()),
                ('date_completed', models.DateField()),
                ('goal_state', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ogundelescrumy.GoalStatus')),
            ],
        ),
        migrations.CreateModel(
            name='ScrumyUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=128)),
                ('role', models.CharField(choices=[('OW', 'Owner'), ('AD', 'Admin'), ('QA', 'Quality Analyst'), ('DV', 'Developer')], max_length=2)),
            ],
        ),
        migrations.AddField(
            model_name='scrumygoals',
            name='scrum_user_assigned_to',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ogundelescrumy.ScrumyUser'),
        ),
    ]
