from django.db import models


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    parent_category = models.ForeignKey("self", on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Category %s: %s' % (self.id, self.title)


class Contest(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    parent_category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Contest %s: %s' % (self.id, self.title)


class Problem(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.TextField()
    can_submit = models.BooleanField()
    parent_contest = models.ManyToManyField(Contest)

    class Meta:
        ordering = ('id',)

    def __str__(self):
        return 'Problem %s: %s' % (self.id, self.title)
