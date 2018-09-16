from django.db import models


class Submission(models.Model):
    submission = models.IntegerField()
    problem = models.IntegerField()
    result = models.CharField(max_length=9)
    source = models.TextField()
    language = models.CharField(max_length=99)

    class Meta:
        ordering = ('submission',)

    def __str__(self):
        return 'Submission %s (%s, %s, %s)' % (self.submission, self.problem, self.result, self.language)
