# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
 
from message.models import *
 
# 数据库操作
def testdb(request):
    test1 = products()
    test1.group = 3
    test1.productsID = 1
    test1.dealCount = 1
   
    test1.save()
    return HttpResponse("<p>数据添加成功！</p>")