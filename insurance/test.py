from message.alipay import alipay
if __name__ == '__main__':
	a = alipay.get_payment()
	b = a.get("12321312321321321", "123213213213213213213", "3")
	print(b)