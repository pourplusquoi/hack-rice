/**
 * Created by Dilemma丶 on 9/23/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('PersonalCtrl', function ($scope, $http, $window) {

    $scope.donations = {};
    $scope.requests = {};

    $scope.isFeedingback = false;
    $scope.request_id = -1;

    //start default
    $scope.currentUser = null;
    $scope.currentNickname = null;
    $scope.currentId = -1;
    if ($window.sessionStorage.getItem('username')) {
        $scope.currentUser = $window.sessionStorage.getItem('username');
        var current = {
            method: 'get',
            url: 'http://34.212.239.105:8000/api/getCurrentUser',
            params: {username: $scope.currentUser}
        };
        $http(current).then(function (d) {
            $scope.currentNickname = d.data.nickname;
            $scope.currentId = d.data.uid;


            //get default donations stop ajax
            var donation = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getDonation',
                params: {uid: $scope.currentId}
            };
            $http(donation).then(function (d) {
                $scope.donations = d.data.content;
            });

            //get default requests stop ajax
            var request = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getRequest',
                params: {uid: $scope.currentId}
            };
            $http(request).then(function (d) {
                $scope.requests = d.data.content;
            });

            //get default userinfo stop ajax
            var userinfo = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getUserInfo',
                params: {uid: $scope.currentId}
            };
            $http(userinfo).then(function (d) {
                $scope.username = d.data.username;
                $scope.nickname = d.data.nickname;
                $scope.name = d.data.name;
                if (d.data.gender == 1)
                    $scope.gender = "Male";
                else
                    $scope.gender = "Female";
                $scope.email = d.data.email;
                $scope.tel = d.data.phone;
                if (d.data.addr == undefined || d.data.addr.length == 0 || d.data.addr == void 0)
                    d.data.addr = "";
                $scope.address = d.data.addr;
                $scope.zipcode = d.data.zipcode;
                $scope.ssn = d.data.ssn;
                $scope.password = void 0;
                $scope.password2 = void 0;
            });
        });
    }
    else {
        alert('You must sign in to view the site');
        $window.location = './index.html';
    }

    $scope.logout = function () {
        $window.sessionStorage.clear();
        $window.location = './index.html';
        $scope.currentUser = null;
        $scope.currentNickname = null;
        $scope.currentId = -1;
    };
    //end


    $scope.genders = ['Male', 'Female'];
    $scope.register = function (nickname, name, gender, tel, email, address, zipcode, ssn, password, password2) {
        var p;
        console.log(gender);
        var reg_tel = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        var reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var reg_zip = /^[0-9]{5}$/;
        var reg_ssn = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
        if (nickname === void 0 || nickname.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your nickname',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (gender === null || gender === void 0 || gender.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your gender',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (tel === void 0 || tel.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your phone number',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (email === void 0 || email.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your email address',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (zipcode === void 0 || zipcode.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your zipcode',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (ssn === void 0 || ssn.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your SSN number',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (password === void 0 || password.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your password',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (password2 === void 0 || password2.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your password again',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (!reg_tel.test(tel)) {
            $().toastmessage('showToast', {
                text: 'Phone number should match 111-222-3333 pattern',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (!reg_email.test(email)) {
            $().toastmessage('showToast', {
                text: 'E-mail address should match abc@a.com pattern',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (!reg_zip.test(zipcode)) {
            $().toastmessage('showToast', {
                text: 'Zipcode should match 12345 pattern',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (!reg_ssn.test(ssn)) {
            $().toastmessage('showToast', {
                text: 'SSN number should match 111-22-3333 pattern',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (password != password2) {
            $().toastmessage('showToast', {
                text: 'Please make sure the passwords are identical',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else {
            var gen;
            if (gender == "Male")
                gen = 1;
            else gen = 0;
            p = {
                method: 'post',
                url: 'http://34.212.239.105:8000/api/updateUserInfo',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    uid: $scope.currentId,
                    nickname: nickname,
                    name: name,
                    gender: gen,
                    phone: tel,
                    email: email,
                    addr: address,
                    zipcode: zipcode,
                    ssn: ssn,
                    password: password
                }
            };
            $http(p).then(function (d) {
                if (d.data.status == 0) {
                    $().toastmessage('showToast', {
                        text: 'Update Success',
                        sticky: false,
                        position: 'top-center',
                        type: 'success',
                        stayTime: 1500,
                        closeText: ''
                    });
                    $window.setInterval(function () {
                        $window.location.href = "./personal.html"
                    }, 2000);
                } else {
                    return $().toastmessage('showToast', {
                        text: 'Update failed',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                }
            }, function (e) {
                return $().toastmessage('showToast', {
                    text: 'Network errors..',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            });
        }
    };

    $scope.feedback = function (id) {
        $scope.isFeedingback = true;
        $scope.request_id = id;
    };

    $scope.back = function () {
        $scope.isFeedingback = false;
    };

    $scope.alert_message = function(){
        console.log('false');
        $().toastmessage('showToast', {
            text: 'You\'ve already commented',
            sticky: false,
            position: 'top-center',
            type: 'warning',
            stayTime: 1500,
            closeText: ''
        });
    };

    $scope.addFeedback = function (title, content) {
        var p = {
            method: 'post',
            url: 'http://34.212.239.105:8000/api/addFeedback',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: {
                uid: $scope.currentId,
                title: title,
                content: content,
                ord_id: $scope.request_id
            }
        };
        $http(p).then(function (d) {
            if (d.data.status == 0) {
                $().toastmessage('showToast', {
                    text: 'Feedback Success',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 1500,
                    closeText: ''
                });
                $window.setInterval(function () {
                    $scope.isFeedingback = false;
                    $window.location.href = "./personal.html"
                }, 2000);
            } else {
                return $().toastmessage('showToast', {
                    text: 'Feedback failed',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            }
        }, function (e) {
            return $().toastmessage('showToast', {
                text: 'Network errors..',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        });
    }
})