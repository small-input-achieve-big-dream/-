# Generated by Django 2.2.2 on 2019-06-18 09:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0013_auto_20190618_1722'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applicant_real',
            name='age',
        ),
    ]