from django.shortcuts import render
from message.models import *
#--------视图-------#
def getIndex(request):
	return render(request, 'index.html')

def getAbout_us(request):
	return render(request, 'about-us.html')

def get404(request):
	return render(request, '404.html')

def gettest(request):	
	return render(request, 'test.html')

def getservices(request):
	return render(request, 'services.html')

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

#逻辑

def upload_trade_record(LIST):
	conn = trade_Records()
	conn.tableID = LIST['out_trade_no']
	conn.trade_money = LIST['total_amount']
	conn.save()