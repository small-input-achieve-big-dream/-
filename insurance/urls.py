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
from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path(r'admin/', admin.site.urls),
    path('', view.getIndex),
    re_path(r'.*index.html/$', view.getIndex),
    re_path(r'.*about-us.html/$', view.getAbout_us),
    re_path(r'.*404.html/$', view.get404),
    re_path(r'.*login.html/$', view.login,name = "login"),
    re_path(r'.*register.html/$', view.register,name = "register"),
    re_path(r'^testdb/$', testdb.testdb),
    # path('algoRegix/', csrf_exempt(views.algoRegix), name='algoRegix'),
    re_path(r'.*givemoney.html/$', view.givemoney),
    # re_path(r'.*mine.html/$', view.mine),
    re_path(r'.*finish_pay.html/$', view.get_finish_pay),
    re_path(r'.*realname.html/$', view.realname),
    re_path(r'.*see.html/$', view.see),
    re_path(r'.*test/$', view.gettest),
    re_path(r'.*services/$', view.getservices),

    re_path(r'.*manager/$', view.get_admin),
    re_path(r'.*verify.html/$', view.get_verify),
    re_path(r'.*inform.html/$', view.get_inform),
    re_path(r'.*complain.html/$', view.get_complain),
    re_path(r'.*compensate.html/$', view.get_compensate),
    re_path(r'.*mytable.html/$', view.get_mytable),
    re_path(r'.*mytrade.html/$', view.get_mytrade),
    re_path(r'.*relationship.html/$', view.get_relationship),
    re_path(r'.*small.html/$', view.get_smallinform),
    re_path(r'.*add_recognizee.html/$', view.get_add_recognizee),
    re_path(r'.*tableform.html/$', view.get_tableform),
    re_path(r'.*table_detail.html/$', view.get_table_detail),
    re_path(r'.*pay.html/$', view.pay),
    re_path(r'.*showtable.html/$', view.get_showtable),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
