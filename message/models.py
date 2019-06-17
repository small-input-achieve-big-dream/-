# _*_ coding:utf-8 _*_
from django.db import models
import django.utils.timezone as timezone
#python manage.py runserver 127.0.0.1:8080 启动服务器
#http://127.0.0.1:8080/admin/ 进入管理员界面
#python manage.py createsuperuser 创建管理员（admin ,1059117321）


# Create your models here
#django 框架提供ORM
#创造数据表 定义模型类
#进行数据迁移


#理赔记录表
class compensate_Records(models.Model):
	#理赔ID
	compensateID = models.IntegerField()
	#保单ID
	tableID = models.IntegerField()
	#订单创建时间
	startTime = models.DateTimeField(default = timezone.now)
	#订单修改时间
	changeTime = models.DateTimeField(auto_now = True)
	#经办人ID
	changerID = models.IntegerField()
	#修改内容
	content = models.CharField(max_length = 60)
	#发放教育金额
	count = models.IntegerField()
	class Meta:
		db_table = "compensate_Records"

#身故申请表
class accident_Application(models.Model):
	#申请ID
	applicationID = models.IntegerField()
	#保单ID
	tableID = models.IntegerField()
	#身故证明
	accident_verify = models.CharField(max_length = 200)
	#审批状态
	state = models.BooleanField()
	#身故保险金
	compensation_money = models.IntegerField()
	class Meta:
		db_table = "accident_Application"

#保险产品表
class products(models.Model):
	#产品名
	productsName = models.CharField(max_length = 30)
	#产品类型
	productsStyle = models.CharField(max_length = 30)
	#产品描述
	productsDes = models.CharField(max_length = 60)
	#投投保人年龄范围
	age_range = models.CharField(max_length = 60)
	#被保人年龄范围
	recognizee_age_range = models.CharField(max_length = 60)
	#保险期间
	date = models.CharField(max_length = 60)
	#已成交单数
	dealCount = models.IntegerField()
	class Meta:
		db_table = "products"

#交易记录表
class trade_Records(models.Model):
	#保单ID
	tableID = models.CharField(max_length = 30, unique = True)
	#交易金额
	trade_money = models.CharField(max_length = 30)
	#创建时间
	startTime = models.DateTimeField(default = timezone.now)
	class Meta:
		db_table = "trade_Records"

#保险收益明细表
class profit(models.Model):
	#产品ID
	productsID = models.IntegerField()
	#保险期限
	deadline = models.CharField(max_length = 30)
	#单次交费回报率
	oneReturen = models.IntegerField()
	#周交费回报率
	weekReturen = models.IntegerField()
	#月交费回报率
	monthReturn = models.IntegerField()
	class Meta:
		db_table = "profit"

#保单表
class table(models.Model):
	#产品ID
	productsID = models.IntegerField()
	#用户ID
	userID = models.IntegerField()
	#被投保人姓名
	recognizee_name = models.CharField(max_length = 30)
	#被投保人身份证
	recognizee_ID = models.IntegerField()
	#生效日期
	effectDate = models.DateTimeField(auto_now = True)
	#失效日期
	loseDate = models.DateTimeField(default = timezone.now)
	#交费周期
	payCycle = models.CharField(max_length = 30)
	#投入金额
	money = models.IntegerField()
	#投保人与被保人的关系
	relationship = models.CharField(max_length = 60)
	class Meta:
		db_table = "table"

#用户登录表
class user_login(models.Model):
	#用户电话
	telephone = models.IntegerField()
	#用户邮箱
	email = models.EmailField()
	#用户密码
	password = models.CharField(max_length = 60)
	#用户权限
	power = models.IntegerField()
	class Meta:
		db_table = "user_login"

#投保人信息表
class applicant(models.Model):
	#用户ID
	userID = models.IntegerField()
	#单位
	company = models.CharField(max_length = 100)
	#姓名
	name = models.CharField(max_length = 30)
	#身份证
	userID = models.IntegerField()
	#类型
	style = models.IntegerField()
	#生日
	birth = models.DateTimeField(auto_now = True)
	#电话
	telephone = models.IntegerField()
	#住址
	address = models.CharField(max_length = 200)
	#邮箱
	email = models.EmailField()
	#积分
	score = models.IntegerField()
	class Meta:
		db_table = "applicant"

#被保人信息报
class recognizee_Infor(models.Model):
	#身份证
	userID = models.IntegerField()
	#年龄
	age = models.IntegerField()
	#姓名
	name = models.CharField(max_length = 30)
	class Meta:
		db_table = "recognizee_Infor"

#投保人真实信息表
class applicant_real(models.Model):
	#身份证
	userID = models.IntegerField()
	#年龄
	age = models.IntegerField()
	#姓名
	name = models.CharField(max_length = 30)
	class Meta:
		db_table = "applicant_real"

#通信录
class realtionship(models.Model):
	# 用户ID
	userID = models.IntegerField()
	# 被保人身份证
	recognizee_ID = models.IntegerField()
	class Meta:
		db_table = "realtionship"

#投诉信息表
class complainInfor(models.Model):
	# 投诉人用户ID
	user_ID = models.IntegerField()
	# 投诉内容
	content = models.CharField(max_length = 300)
	# 状态
	state = models.BooleanField()
	# 处理人ID
	changerID = models.IntegerField()
	# 反馈内容
	Return = models.CharField(max_length = 60)
	# 投诉时间
	startTime = models.DateTimeField(default = timezone.now)
	# 处理时间
	changeTime = models.DateTimeField(auto_now = True)
	class Meta:
		db_table = "complainInfor"

