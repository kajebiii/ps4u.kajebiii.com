from django.db import models


class Problem(models.Model):
    thinking_rating = models.IntegerField(default=-1)
    implement_rating = models.IntegerField(default=-1)
    problem_summary = models.TextField(default="")
    solution_summary = models.TextField(default="")

    class Meta:
        abstract = True
