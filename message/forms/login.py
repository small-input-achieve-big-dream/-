from django import forms

class loginform(forms.Form):
	username =forms.CharField(max_length=12,min_length = 6, required = True , error_messages={"required":'用户账号不能为空','invalid':'格式错误'},widget = forms.TextInput  attrs = {"class":"user_login"}))
	passwd = forms.CharField(max_length=16,min_length = 6,widget = forms.PasswordInput)