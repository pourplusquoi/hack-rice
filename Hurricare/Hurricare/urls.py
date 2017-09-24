"""Hurricare URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from . import api

urlpatterns = [
    url(r'^api/admin/', admin.site.urls),
    url(r'^api/getCurrentUser$', api.getCurrentUser),
    url(r'^api/login$', api.login),
    url(r'^api/logout$', api.logout),
    url(r'^api/registration$', api.registration),
    url(r'^api/getCategory_1$',api.getCategory_1),
    url(r'^api/getCategory_2$',api.getCategory_2),
    url(r'^api/getWarehouse$',api.getWarehouse),
    url(r'^api/addDonation$', api.addDonation),
    url(r'^api/addRequest$', api.addRequest),
    url(r'^api/getDonation$',api.getDonation),
    url(r'^api/getRequest$',api.getRequest),
    url(r'^api/getUserInfo$',api.getUserInfo),
    url(r'^api/updateUserInfo$',api.updateUserInfo),
    url(r'^api/getNews$',api.getNews),
    url(r'^api/addFeedback$', api.addFeedback),
    url(r'^api/getFeedback$', api.getFeedback),
    url(r'^api/getTweet$',api.getTweet),
    url(r'^api/getStat$',api.getStat),
    url(r'^api/getAllUserInfo$',api.getAllUserInfo),
    url(r'^api/deleteUser$',api.deleteUser),
    url(r'^api/resetPassword$',api.resetPassword),
    url(r'^api/setDonateStatus$',api.setDonateStatus),
    url(r'^api/setRequestStatus$',api.setRequestStatus),
    url(r'^api/getAllDonation$',api.getAllDonation),
    url(r'^api/getAllRequest$',api.getAllRequest),

]
