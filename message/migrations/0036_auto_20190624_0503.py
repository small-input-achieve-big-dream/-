# Generated by Django 3.0 on 2019-06-24 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0035_auto_20190624_0200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='msg',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='products',
            name='productID',
            field=models.IntegerField(),
        ),
    ]
