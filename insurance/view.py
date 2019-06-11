from django.shortcuts import render

def getIndex(request):
	return render(request, 'index.html')

def getAbout_us(request):
	return render(request, 'about-us.html')