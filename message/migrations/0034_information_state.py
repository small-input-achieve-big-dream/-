# Generated by Django 3.0 on 2019-06-24 01:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0033_user_login_money'),
    ]

    operations = [
        migrations.AddField(
            model_name='information',
            name='state',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
    ]