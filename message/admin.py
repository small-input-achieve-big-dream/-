from django.contrib import admin
from message.models import *
 
@admin.register(accident_Application)
class accident_Application_Admin(admin.ModelAdmin):
	list_display = ('applicationID','tableID')
 		
# Register your models here.
admin.site.register([compensate_Records,products,trade_Records,profit,table,user_login,applicant,recognizee_Infor,realtionship,complainInfor])