from django.shortcuts import render

def getIndex(request):
	return render(request, 'index.html')

def getAbout_us(request):
	return render(request, 'about-us.html')

def get404(request):
	return render(request, '404.html')

def gettest(request):
	return render(request, 'test.html')