from django.db import models

# Create your models here.
class Test(models.Model):
    num = models.CharField(max_length=20)
    name = models.CharField(max_length=20)