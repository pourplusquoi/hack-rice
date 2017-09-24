from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
#import MySQLdb
from db.models import *
import hashlib
import datetime,time
import geography
from ast import literal_eval

#def getCurrentUser(request):
#    db = MySQLdb.connect('localhost', 'root', '', 'hurricare')
#    cursor = db.cursor()
#    sql = "SELECT * FROM users WHERE (%s,%s,%s,%s)"
#    try:
#        cursor.execute(sql, (url, tit, desc, date))
#        db.commit()
#    except MySQLdb.Error, e:
#        try:
#            print "MySQL Error [%d]: %s" % (e.args[0], e.args[1])
#        except IndexError:
#            print "MySQL Error: %s" % str(e)

def getCurrentUser(request):
	#access DB if needed
	username = request.GET.get('username')
	if username is None:
		return JsonResponse({'status':'1'})
	print(username)
	row = User.objects.get(username=username)
	userID = row.u_id
	nickname = row.nickname
	return JsonResponse({'status':'0', 'username':username, 'nickname':nickname, 'uid':userID, 'action':'getCurrentUser'})

def login(request):
	username = str(request.POST.get('username'))
	password = str(request.POST.get('password'))
	print(username)
	print(password)
	hashed_pass = hashlib.md5(password).hexdigest()
	check  = User.objects.filter(username=username).filter(password=hashed_pass)
	if len(check) == 0:
		print('fail!')
		return JsonResponse({'status': '1', 'action':'login'})
	else:
		request.session['username'] = username
		return JsonResponse({'status': '0', 'action': 'login'})

def logout(request):
	if 'username' in request.session:
		del request.session['username']
		return JsonResponse({'status':'0', 'action':'logout'})
	else:
		return JsonResponse({'status':'1', 'action':'logout'})

def registration(request):
	name = request.POST.get('name')
	gender = int(request.POST.get('gender'))
	email = request.POST.get('email')
	phone = request.POST.get('phone')
	nickname = request.POST.get('nickname')
	username = request.POST.get('username')
	password = request.POST.get('password')
	ssn = request.POST.get('ssn')
	zipcode = request.POST.get('zipcode')
	addr = request.POST.get('addr')
	location = str(geography.getLocation(addr))
	#uid = request.POST['uid']
	hashed_pass = hashlib.md5(password).hexdigest()
	try:
		addUser = User(name=name,gender=gender,email=email,phone=phone,nickname=nickname,username=username,password=hashed_pass,ssn=ssn,zipcode=zipcode,addr=addr,location=location)
		addUser.save()
	except:
		return JsonResponse({'status':'1', 'Error': 'db_error', 'action':'registration'})
	else:
		return JsonResponse({'status': '0', 'action':'registration'})



def getCategory_1(request):
	response = {}
	for row in Dictionary_Category1.objects.all():
		response[row.dc1_id] = row.translate
	return JsonResponse(response)



def getCategory_2(request):
	cate = request.GET.get('category')
	filted = Dictionary_Category2.objects.filter(dc1_id=cate)
	response={}
	for row in filted:
		response[row.dc2_id] = row.translate
	return JsonResponse(response)

def getWarehouse(request):
	response={}
	for row in Warehouse.objects.all():
		response[row.w_id] = row.addr
	return JsonResponse(response)

def addDonation(request):
	number = request.POST.get('number')
	wid = request.POST.get('warehouseID')
	print(request.POST.get('number'))
	print(request.POST.get('warehouseID'))
	uid = int(request.POST.get('uid'))
	arrive = request.POST.get('arrivingDate')
	ts = time.time()
	nowTime = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
	if number is None:
		return JsonResponse({'status':'1'})
	number = int(number)
	print(nowTime)
	print(arrive)
	try:
		Order_Donate.objects.create(u_id=uid,status=0,startDate=nowTime,endDate=None,arrivingDate=arrive)
		for i in range(number):
			cat1 = request.POST.get(str(i)+'_0')
			cat2 = request.POST.get(str(i)+'_1')
			quantity = request.POST.get(str(i)+'_2')
			oid = Order_Donate.objects.get(startDate=nowTime).od_id
			Item.objects.create(or_id=oid, c2_id=cat2, quantity=quantity,w_id=wid,remain=quantity)
		match()
		return JsonResponse({'status': '0'})
	except:
		return JsonResponse({'status': '1'})

def addRequest(request):
	uid = int(request.POST.get('uid'))
	cat1 = int(request.POST.get('cat1'))
	cat2 = int(request.POST.get('cat2'))
	quantity = int(request.POST.get('quantity'))
	ts = time.time()
	nowTime = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
	try:
		Order_Request.objects.create(u_id=uid,status=0,c2_id=cat2,quantity=quantity,startDate=nowTime,endDate=None, remain=quantity)
		match()
		return JsonResponse({'status': '0'})
	except:
		return JsonResponse({'status': '1'})



def getDonation(request):
	uid = request.GET.get('uid')
	rows = Order_Donate.objects.filter(u_id=uid)
	response={'content':[]}
	for row in rows:
		order = {}
		#response['content'].append({})
		order['orderID'] = row.od_id
		dic={0:"pending",1:"delivering",2:"confirm"}
		order['status'] = dic[row.status] # 0-pending 1-delivering 2-confirm
		order['startDate'] = row.startDate
		order['endDate'] = row.endDate
		order['arrivingDate'] = row.arrivingDate
		items = []
		ord_item = Item.objects.filter(or_id=row.od_id)
		for oneItem in ord_item:
			cat1_id = Dictionary_Category2.objects.get(dc2_id=oneItem.c2_id).dc1_id
			cat1_name = Dictionary_Category1.objects.get(dc1_id=cat1_id).translate
			items.append({'category_1':str(cat1_name),'category_2':str(Dictionary_Category2.objects.get(dc2_id=oneItem.c2_id).translate), 'warehouse':str(Warehouse.objects.get(w_id=oneItem.w_id).addr),'quantity':str(oneItem.quantity)})
		order['items'] = items
		response['content'].append(order)
	return JsonResponse(response)



def getRequest(request):
	uid = request.GET.get('uid')
	rows = Order_Request.objects.filter(u_id=uid)
	response = {'content':[]}
	for row in rows:
		order = {}
		order['orderID'] = row.or_id
		status_dic={0:"pending",1:"delivering",2:"confirm"}
		order['status'] = status_dic[row.status]
		order['category_2'] = str(Dictionary_Category2.objects.get(dc2_id=row.c2_id).translate)
		cat1_id = Dictionary_Category2.objects.get(dc2_id=row.c2_id).dc1_id
		cat1_name = Dictionary_Category1.objects.get(dc1_id=cat1_id).translate
		order['category_1'] = str(cat1_name)
		order['quantity'] = row.quantity
		order['startDate'] = row.startDate
		order['endDate'] = row.endDate
		order['ismarked'] = row.ismarked
		response['content'].append(order)
	return JsonResponse(response)

def getUserInfo(request):
	#access DB if needed
	userID = request.GET.get('uid')
	if userID is None:
		return JsonResponse({'status':'1'})
	print(userID)
	row = User.objects.get(u_id=userID)
	# userID = row.u_id
	username = row.username
	nickname = row.nickname
	gender = row.gender
	mail = row.email
	phone = row.phone
	name = row.name
	addr = row.addr
	ssn = row.ssn
	zipcode = row.zipcode
	return JsonResponse({'status':'0', 'username':username, 'nickname':nickname, 'gender':gender,'email':mail,'phone':phone,'name':name,'addr':addr,'ssn':ssn,'zipcode':zipcode,'action':'getUserInfo'})

def updateUserInfo(request):
	uid = request.POST.get('uid')
	userObj = User.objects.get(u_id=uid)
	userObj.name = request.POST.get('name')
	userObj.gender = int(request.POST.get('gender'))
	userObj.email = request.POST.get('email')
	userObj.phone = request.POST.get('phone')
	userObj.nickname = request.POST.get('nickname')
	password = request.POST.get('password')
	userObj.password = hashlib.md5(password).hexdigest()
	userObj.ssn = request.POST.get('ssn')
	userObj.zipcode = request.POST.get('zipcode')
	userObj.addr = request.POST.get('addr')
	userObj.location = str(geography.getLocation(request.POST.get('addr')))
	userObj.save()
	#uid = request.POST['uid']
	return JsonResponse({'status':'0', 'action':'updateUserInfo'})

def getNews(request):
	news = News.objects.order_by('-n_id')[0:3]
	response = {}
	i = 0
	for piece in news:
		response[i] = {'title':piece.title,'content':piece.content,'url_pic':piece.url_pic,'url_web':piece.url_web}
		i+=1
	return JsonResponse(response)


def addFeedback(request):
	uid = request.POST.get('uid')
	ord_id = request.POST.get('ord_id')
	title = request.POST.get('title')
	content = request.POST.get('content')
	#try:
	Feedback.objects.create(u_id=uid, ord_id=ord_id, title=title, content=content)
	obj = Order_Request.objects.get(or_id=ord_id)
	obj.ismarked=True
	obj.save()
	return JsonResponse({'status':'0'})
	# except:
	# 	return JsonResponse({'status':'1'})


def getFeedback(request):
	feedbacks = Feedback.objects.order_by('-f_id')[0:3]
	response = {}
	i = 0
	for piece in feedbacks:
		response[i] = {'title':piece.title,'content':piece.content}
		i+=1
	return JsonResponse(response)
	
def getTweet(request):
	tweet = Tweet.objects.filter(mark=0)
	response = {'data':[]}
	count = 0
	for row in tweet:
		if count > 4:
			break
		if row.location is None or len(row.location)==0:
			row.mark = 1
			row.save()
			continue
		#print("***************"+str(row.location))
		location = geography.getLocation(row.location)
		#print("---------------")
		if location is None:
			continue
	 	response['data'].append({'location':location}) #geography.getLocation(row.location)
	 	row.mark=1
	 	row.save()
	 	count += 1
	# oneTweet = Tweet.objects.get(t_id=803)
	# response={}
	# for i in range(5):
	# 	response['location'+str(i)] = geography.getLocation(oneTweet.location)
	return JsonResponse(response)

# def getMyFeedback(request):
# 	uid = request.POST.get('uid')

def match():
    for request in Order_Request.objects.exclude(remain=0):
        for user in User.objects.filter(u_id=request.u_id):
            warehouse = Warehouse.objects.all()
            sorted_warehouse = sorted(warehouse,key=lambda house: geography.distance(user.location, geography.getLocation(house.addr)))
            for house in sorted_warehouse:
                for item in Item.objects.filter(c2_id=request.c2_id, w_id=house.w_id).exclude(remain=0):
                    if item.remain < request.remain:
                        request.remain -= item.remain
                        item.remain = 0
                    else:
                        item.remain -= request.remain
                        request.remain = 0
                    Match_Or_Item.objects.create(i_id=item.i_id, or_id=request.or_id, isDelivered=False)


def getStat(request):
	donate = len(Item.objects.all())
	req = len(Order_Request.objects.all())
	match = len(Match_Or_Item.objects.all())
	user = len(User.objects.all())
	response={'donate':donate, 'req':req, 'match':match, 'user':user}
	return JsonResponse(response)

def getAllUserInfo(request):
	response={'data':[]}
	for user in User.objects.all():
		userInfo={}
		userInfo['name'] = user.name
		genderDict = {True:'Male', False:'Female'}
		userInfo['gender'] = genderDict[user.gender]
		userInfo['email'] = user.email
		userInfo['phone'] = user.phone
		userInfo['nickname'] = user.nickname
		userInfo['username'] = user.username
		userInfo['ssn'] = user.ssn
		userInfo['zipcode'] = user.zipcode
		userInfo['addr'] = user.addr
		userInfo['uid'] = user.u_id
		response['data'].append(userInfo)
	return JsonResponse(response)

def deleteUser(request):
	uid = request.POST.get('uid')
	try:
		User.objects.get(u_id=uid).delete()
		return JsonResponse({'status':'0'})
	except:
		return JsonResponse({'status':'1'})

def resetPassword(request):
	uid = request.POST.get('uid')
	try:
		user = User.objects.get(u_id=uid)
		user.password = hashlib.md5('hurricare').hexdigest()
		user.save()
		return JsonResponse({'status':'0'})
	except:
		return JsonResponse({'status':'1'})

def setDonateStatus(request):
	orderID = request.POST.get('od_id')
	status = request.POST.get('status')
	try:
		obj = Order_Donate.objects.get(od_id=orderID)
		obj.status = status
		if int(status) == 2:
			ts = time.time()
			nowTime = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
			obj.endDate=nowTime
		obj.save()
		return JsonResponse({'status':'0'})
	except:
		return JsonResponse({'status':'1'})


def setRequestStatus(request):
	orderID = request.POST.get('or_id')
	status = request.POST.get('status')
	try:
		obj = Order_Request.objects.get(or_id=orderID)
		obj.status = status
		if int(status) == 2:
			ts = time.time()
			nowTime = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
			obj.endDate=nowTime
		obj.save()
		return JsonResponse({'status':'0'})
	except:
		return JsonResponse({'status':'1'})

def getAllDonation(request):
	rows = Order_Donate.objects.all()
	response={'content':[]}
	for row in rows:
		order = {}
		#response['content'].append({})
		order['orderID'] = row.od_id
		dic={0:"pending",1:"delivering",2:"confirm"}
		order['status'] = dic[row.status] # 0-pending 1-delivering 2-confirm
		order['startDate'] = row.startDate
		order['endDate'] = row.endDate
		order['arrivingDate'] = row.arrivingDate
		ord_item = Item.objects.filter(or_id=row.od_id)
		items = ""
		for oneItem in ord_item:
			cat1_id = Dictionary_Category2.objects.get(dc2_id=oneItem.c2_id).dc1_id
			cat1_name = Dictionary_Category1.objects.get(dc1_id=cat1_id).translate
			items += 'category_1: '+str(cat1_name)+'; category_2: '+str(Dictionary_Category2.objects.get(dc2_id=oneItem.c2_id).translate)+'; warehouse: '+str(Warehouse.objects.get(w_id=oneItem.w_id).addr)+'; quantity: '+str(oneItem.quantity)+'\n'
		order['items'] = items
		response['content'].append(order)
	return JsonResponse(response)


def getAllRequest(request):
	rows = Order_Request.objects.all()
	response = {'content':[]}
	for row in rows:
		order = {}
		order['orderID'] = row.or_id
		status_dic={0:"pending",1:"delivering",2:"confirm"}
		order['status'] = status_dic[row.status]
		order['category_2'] = str(Dictionary_Category2.objects.get(dc2_id=row.c2_id).translate)
		cat1_id = Dictionary_Category2.objects.get(dc2_id=row.c2_id).dc1_id
		cat1_name = Dictionary_Category1.objects.get(dc1_id=cat1_id).translate
		order['category_1'] = str(cat1_name)
		order['quantity'] = row.quantity
		order['startDate'] = row.startDate
		order['endDate'] = row.endDate
		order['ismarked'] = row.ismarked
		response['content'].append(order)
	return JsonResponse(response)






