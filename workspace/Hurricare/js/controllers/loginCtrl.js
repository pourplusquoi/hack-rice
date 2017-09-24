/**
 * Created by Dilemma丶 on 9/22/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('LoginCtrl', function ($scope, $http, $window) {
    //start default
    $scope.currentUser = null;
    $scope.currentNickname = null;
    $scope.currentId = -1;
    if ($window.sessionStorage.getItem('username')) {
        alert("You've logged in");
        $window.location = './index.html';
    }
    //end

    $scope.login = function (username, pwd) {
        var p;
        if (username === void 0 || username.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your username',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (pwd === void 0 || pwd.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter your password',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else {
            p = {
                method: 'post',
                url: 'http://34.212.239.105:8000/api/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {username: username, password: pwd}
            };
            $http(p).then(function (d) {
                if (d.data.status == 0) {
                    console.log("yes");
                    $window.sessionStorage.setItem('username', username);
                    return $window.location.href = "./index.html";
                } else {
                    console.log(d.data.success);
                    return $().toastmessage('showToast', {
                        text: 'Invalid username or password',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                }
            }, function (e) {
                console.log(username);
                console.log(pwd);
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

})