# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Dictionary_Status(models.Model):
    ds_id = models.IntegerField(primary_key=True)
    translate = models.CharField(max_length=20)

class Dictionary_Category1(models.Model):
    dc1_id = models.IntegerField(primary_key=True)
    translate = models.CharField(max_length=20)

class Dictionary_Category2(models.Model):
	dc1_id = models.IntegerField(null=True)
	dc2_id = models.IntegerField(primary_key=True)
	translate = models.CharField(max_length=20)

class User(models.Model):
	name = models.CharField(max_length=20)
	gender = models.BooleanField()
	email = models.EmailField()
	phone = models.CharField(max_length=12)
	nickname = models.CharField(max_length=45, unique=True)
	username = models.CharField(max_length=45, unique=True)
	password = models.CharField(max_length=45)
	ssn = models.CharField(max_length=11)
	zipcode = models.CharField(max_length=5)
	addr = models.TextField(max_length=45)
	location = models.CharField(max_length=45)
	u_id = models.AutoField(primary_key=True)

class Order_Request(models.Model):
    or_id = models.AutoField(primary_key=True)
    u_id = models.IntegerField()
    # status = models.CharField(max_length=20)
    status = models.IntegerField()
    c2_id = models.IntegerField()
    quantity = models.IntegerField()
    remain = models.IntegerField()#new add
    startDate = models.DateTimeField()
    endDate = models.DateTimeField(null=True)
    ismarked = models.BooleanField(default=False)

class Order_Donate(models.Model):
    od_id = models.AutoField(primary_key=True)
    u_id = models.IntegerField() #donator
    # status = models.CharField(max_length=20)
    status = models.IntegerField() # 0-unmatched 1-matched 2-delivered
    startDate = models.DateTimeField()
    endDate = models.DateTimeField(null=True)
    arrivingDate = models.DateField(null=True)

class Item(models.Model):
    i_id = models.AutoField(primary_key=True)
    or_id = models.CharField(max_length=45)
    #od_id = models.CharField(max_length=45)
    c2_id = models.CharField(max_length=45)
    quantity =  models.IntegerField()
    remain = models.IntegerField()#new add
    w_id = models.IntegerField(null=True)

class Warehouse(models.Model):
    w_id = models.AutoField(primary_key=True)
    addr = models.CharField(max_length=45)
    space = models.CharField(max_length=3)
    contact = models.CharField(max_length=11)

#class Category1(models.Model):
#    c1_id = models.IntegerField(primary_key=True)
    # content = models.CharField(max_length=45)
#    content = models.IntegerField()

#class Category2(models.Model):
#    c2_id = models.IntegerField(primary_key=True)
#    c1_id = models.IntegerField()
#    content = models.IntegerField()

class Feedback(models.Model):
    f_id = models.AutoField(primary_key=True)
    u_id = models.IntegerField()
    ord_id = models.IntegerField()
    title = models.TextField()
    content = models.TextField()

class Cargo(models.Model):
    c_id = models.AutoField(primary_key=True)
    c_driver = models.CharField(max_length=20)
    w_id = models.IntegerField()
    capacity = models.IntegerField()

class News(models.Model):
    n_id = models.AutoField(primary_key=True)
    title = models.TextField()
    content = models.TextField()
    url_pic = models.URLField()
    url_web = models.URLField()

class Match_Or_Item(models.Model):
    mori_id = models.AutoField(primary_key=True)
    or_id = models.IntegerField()
    i_id = models.IntegerField()
    isDelivered = models.BooleanField()#new add

class Tweet(models.Model):
    t_id = models.AutoField(primary_key=True)
    tid = models.CharField(max_length=50)
    time = models.CharField(max_length=50)
    location = models.CharField(max_length=200)
    msg = models.CharField(max_length=2000)
    mark = models.IntegerField()
    

