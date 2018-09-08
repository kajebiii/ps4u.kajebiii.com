from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=99, blank=False)
    abbreviation = models.CharField(max_length=19, blank=False, unique=True)

    def __str__(self):
        return '(%s) %s' % (self.abbreviation, self.name)


class Problem(models.Model):
    thinking_rating = models.IntegerField(default=-1)
    implement_rating = models.IntegerField(default=-1)
    problem_summary = models.TextField(default="")
    solution_summary = models.TextField(default="")
    tags = models.ManyToManyField(Tag, blank=True)

    class Meta:
        abstract = True
