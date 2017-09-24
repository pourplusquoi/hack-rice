/**
 * Created by Dilemma丶 on 2017/2/28.
 */
var adminApp;

adminApp = angular.module('adminApp', []);

adminApp.controller('LoginCtrl', function ($scope, $http, $window) {

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
            if (username == "admin" && pwd == "admin") {
                return $window.location = "./index.html";
            } else {
                return $().toastmessage('showToast', {
                    text: 'Invalid username or password',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            }
        }
    };
});