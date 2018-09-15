from django.db import models
import problems.models


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    merge_parent_title = models.TextField()
    parent_category = models.ForeignKey("self", on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Category %s: %s' % (self.id, self.title)


class Contest(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    merge_parent_title = models.TextField()
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Contest %s: %s' % (self.id, self.title)


class Problem(problems.models.Problem):
    id = models.IntegerField(primary_key=True)
    title = models.TextField(blank=True)
    can_submit = models.BooleanField()
    description_length = models.IntegerField()
    parent_contest = models.ManyToManyField(Contest, blank=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Problem %s: %s' % (self.id, self.title)
