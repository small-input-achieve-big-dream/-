# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse
from . import settings
from message.models import *
 
# 数据库操作
def testdb(request):
    return HttpResponse(settings.STATICFILES_DIRS)

