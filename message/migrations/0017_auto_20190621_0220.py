# Generated by Django 3.0 on 2019-06-20 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0016_auto_20190620_2125'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applicant_real',
            name='userID',
            field=models.CharField(max_length=30),
        ),
    ]