# Generated by Django 2.1 on 2018-09-02 04:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boj', '0002_problem_can_submit'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='merge_parent_title',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='contest',
            name='merge_parent_title',
            field=models.TextField(default='will be update'),
            preserve_default=False,
        ),
    ]
