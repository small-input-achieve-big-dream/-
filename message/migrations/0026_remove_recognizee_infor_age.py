# Generated by Django 3.0 on 2019-06-22 04:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0025_auto_20190622_0151'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recognizee_infor',
            name='age',
        ),
    ]