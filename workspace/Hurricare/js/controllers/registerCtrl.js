/**
 * Created by Dilemma丶 on 9/22/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('RegisterCtrl', function ($scope, $http, $window) {
    //start default
    $scope.currentUser = null;
    $scope.currentNickname = null;
    $scope.currentId = -1;
    if ($window.sessionStorage.getItem('username')) {
        alert("You've logged in");
        $window.location = './index.html'
    }
    //end

    $scope.genders = ['Male', 'Female'];
    $scope.register = function (username, nickname, name, gender, tel, email, address, zipcode, ssn, password, password2) {
        var p;
        console.log(gender);
        var reg_tel = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
        var reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var reg_zip = /^[0-9]{5}$/;
        var reg_ssn = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;
        if (username === void 0 || username.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your username',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else if (nickname === void 0 || nickname.length === 0) {
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
                url: 'http://34.212.239.105:8000/api/registration',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {
                    username: username,
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
                        text: 'Register Success',
                        sticky: false,
                        position: 'top-center',
                        type: 'success',
                        stayTime: 1500,
                        closeText: ''
                    });
                    $window.setInterval(function(){$window.location.href = "./login.html"},2000);
                } else {
                    return $().toastmessage('showToast', {
                        text: 'Existing username!',
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
    }
    ;

})