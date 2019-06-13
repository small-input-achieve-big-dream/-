"""insurance URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from . import testdb, view, settings
from django.conf.urls.static import static
from django.conf.urls import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', view.getIndex),
    re_path(r'.*index.html/$', view.getIndex),
    re_path(r'.*about-us.html/$', view.getAbout_us),
    re_path(r'.*404.html/$', view.get404),
    re_path(r'^testdb/$', testdb.testdb),
    path(r'test/', view.gettest)
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
