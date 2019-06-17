#--------包---------#
from django.shortcuts import render, redirect
from message.models import *
    #插入employee表
from django.shortcuts import HttpResponseRedirect,Http404,HttpResponse,render_to_response
from django.http import HttpResponse
from message.alipay import alipay


#--------视图-------#
def getIndex(request):
	return render(request, 'index.html',{"title":"小投入成就大梦想"})

def getAbout_us(request):
	return render(request, 'about-us.html',{"title":"关于我们"})

def get404(request):
	return render(request, '404.html',{"title":"找不到页面"})

def gettest(request):	
	return render(request, 'test.html',{"title":"测试"})

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
	user_loginList = user_login.objects.all()
	# user_loginList = user_login.objects.get(id=2)
	return  render_to_response("login.html",locals())
	# return render(request,'login.html',{"title":"登录",'user_login':user_loginList})

def getusermessage(request):
	return render(request,'register.html',{"title":"注册"})

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
