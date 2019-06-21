# -*- coding: utf-8 -*-

#--------包---------#
from django.shortcuts import render, redirect
from django.utils.datetime_safe import time
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
import json
import random
from message.models import *
    #插入employee表

from django.shortcuts import HttpResponseRedirect,Http404,HttpResponse
from django.http import HttpResponse, JsonResponse

from django.shortcuts import HttpResponseRedirect,Http404,HttpResponse
from django.http import HttpResponse
from django.forms.models import model_to_dict

from message.alipay import alipay


#--------视图-------#

def getIndex(request):
	LIST = {"title":"小投入成就大梦想"}
	DICT = {}
	if request.method == 'GET':
		DICT = request.GET.dict()
		action = DICT.pop('action', None)
		if action == 'logout':
			if request.session['userid']:
				del request.session['userid']
			if request.session['user_name']:
				del request.session['user_name']
			print('delete session')
	return render(request, 'index.html', LIST)

def getAbout_us(request):
	LIST = {"title":"关于我们"}
	return render(request, 'about-us.html', LIST)

def get404(request):
	LIST = {"title":"找不到页面"}
	return render(request, '404.html', LIST)

def gettest(request):	
	LIST = ['test1', 'test2']
	DICT = {'test3': '123', 'test4': '321'}
	return render(request, 'test.html', {'List': json.dumps(LIST), 'Dict': json.dumps(DICT)})
	# LIST = {"title":"测试"}
	# return render(request, 'test.html', LIST)

def getservices(request):
	LIST = {}
	if request.POST:
		LIST = request.POST.dict()
		if LIST.get('measure') != None:
			LIST['answer'] = count_money(LIST)
		elif LIST.get('buy') != None:
			url = ''
			# url = alipay.get_payment(name = , num = , account = LIST['money'])
			return redirect(url)
	return render(request, 'services.html', LIST)

def login(request):
	LIST = {}
	if request.method == 'POST':
		name = request.POST.get('user')
		pwd = request.POST.get('password')
		try:
			if '@' in name:
				Dao = user_login.objects.filter(email = name, password = pwd)[:1]
			else:
				Dao = user_login.objects.filter(telephone = name, password = pwd)[:1]
		except Exception as e:
			return render(request, 'login.html', {'error': '用户名格式不对'})
		print(Dao)
		if Dao.exists():
			ID = Dao[0].id
			request.session['userid'] = ID
			request.session['user_name'] = Dao[0].email
			request.session['telephone'] = Dao[0].telephone
			request.session['power'] = Dao[0].power
			print(request.session.get('user_name', None))
			return render(request, 'index.html', {'user_name': Dao[0].email})
		else:
			return render(request, 'login.html', {'error': '用户或密码错误'})
	return render(request, "login.html", LIST)

def givemoney(request):
	LIST = {}
	if request.method == 'GET':
		return render(request, "givemoney.html")
	if request.method == 'POST':

		idcard = random.randint(1,3)
		if idcard==2:
			idcard = True
		else:
			idcard = False
		user = request.POST.get('user')
		ins = request.POST.get('ins')
			# ps = request.POST.get('password1')
		accident_Application.objects.create(
				applicationID = user,
				tableID =ins,
				state =idcard,
				compensation_money='1000'
			)

		img = Img(img_url=request.FILES.get('img'))
		img.save()
		return  render(request, 'index.html')


def see(request):
	test = user_login.objects.all()
	return render(request, "see.html", locals())


def register(request):
	print(request.method)
	if request.method == 'GET':
		return render(request, "register.html")
	if request.method == 'POST':
		tel = request.POST.get('tel')
		em = request.POST.get('email')
		pwd = request.POST.get('password1')
		print(tel, em, pwd)
		Dao = user_login.objects.filter(Q(telephone=tel) | Q(email=em))
		print(Dao)
		if Dao.exists():
			return render(request, 'register.html', {'error': '用户已存在'})
		else:
			user_login.objects.create(
				telephone=int(tel),
				email=str(em),
				password=str(pwd),
				power='0'
			)
			return render(request, "login.html", locals())


def realname(request):

		LIST = {}
		idcard = user_login.objects.all()
		# user_loginList = user_login.objects.all()

		if request.method == 'GET':
			return render(request, "verify.html")
		if request.method == 'POST':
			real= request.POST.get('idcard')
			na = request.POST.get('name')
			ad = request.POST.get('address')

			if applicant_real.objects.filter(userID=real).exists() == True:
				if applicant_real.objects.filter(name=na).exists() == True:
					applicant.objects.create(
					name=na,
					userID=real,
					address=ad,
					style='0',
					score = '0'
				)
				test = user_login.objects.all()
				return render(request, "index.html", locals())
			else:
				return render(request, "verify.html", locals())


def get_finish_pay(request):
	LIST = {}
	try:
		LIST['total_amount'] = request.GET['total_amount']
		LIST['timestamp'] = request.GET['timestamp']
		LIST['out_trade_no'] = request.GET['out_trade_no']
		upload_trade_record(LIST)
		return render(request, 'finish_pay.html', LIST)
	except Exception as e:
		LIST['code_error'] = e.args
		return render(request, '404.html', LIST)


#-----------KA tmp-----------#
def get_admin(request):
	ID = request.session.get('userid', None)
	if ID == None:
		return render(request, 'index.html')
	Applicant = applicant.objects.filter(userID = ID)[:1]
	if Applicant.exists():
		LIST = {
			"name": Applicant[0].name,
			"idcard": Applicant[0].idcard,
			"address": Applicant[0].address
		}
		return render(request, 'admin.html', LIST)
	else:
		LIST = {'applicant_state': '0'}
		return render(request, 'admin.html', LIST)

def get_verify(request):
	LIST = {}
	if request.method == 'GET':
		return render(request, "verify.html")
	if request.method == 'POST':
		idcard = request.POST.get('idcard')
		name = request.POST.get('name')
		address = request.POST.get('address')

		if applicant_real.objects.filter(userID = idcard).exists() == True:
			if applicant_real.objects.filter(name = name).exists() == True:
				applicant.objects.create(
				userID = request.session.get('userid', None),
				name = name,
				idcard = idcard,
				address = address,
				style = '0',
				score = '0'
			)
			test = user_login.objects.all()
			return render(request, "manager", locals())
		else:
			return render(request, "verify.html", locals())

def get_inform(request):
	return render(request, "inform.html")

#end 视图

#----------逻辑------------#
#在逻辑这最好写上逻辑功能
#

def upload_trade_record(LIST):
	"""
	上传交易记录
	"""
	conn = trade_Records()
	conn.tableID = LIST['out_trade_no']
	conn.trade_money = LIST['total_amount']
	conn.save()


def count_money(LIST):
	"""
	计算获益金额
	"""
	answer = 1
	answer = "金额: " + str(answer)
	return answer

# def create_table()
# 	pass

#end 逻辑
