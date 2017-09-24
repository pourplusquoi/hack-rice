/**
 * Created by Dilemma丶 on 2017/3/14.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

storage = window.localStorage;

petApp.controller('PwdCtrl', function ($scope, $http) {

    $scope.resetPwd = function (id) {
        var p;
        if (id === void 0 || id.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the id',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else {
            var str = '/user/update?id=' + id;
            console.log(str);
            p = {
                method: 'put',
                url: str,
                data: {
                    password: 'pet'
                }
            };
            $http(p).then(function (d) {
                $().toastmessage('showToast', {
                    text: 'Reset success!',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 2500,
                    closeText: ''
                });
                $scope.id = null;

            }, function (e) {
                return $().toastmessage('showToast', {
                    text: e.data.message,
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            });
        }
    };
    var users = {
        method: 'get',
        url: '/users'
    };
    $http(users).then(function (d) {
    });
    // search = $location.search();
    // token = search['access_token'];
    // if (token != null) {
    //     localStorage.setItem(storage, token);
    //     return $window.location.href = "main.html";
    // }

    $scope.modAuthority = function (id, authority) {
        var p;
        if (id === void 0 || id.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the id',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (authority === void 0 || authority.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please select an authority',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else {
            var str = '/user/update?id=' + id;
            console.log(str);
            p = {
                method: 'put',
                url: str,
                data: {
                    user_type: authority
                }
            };
            $http(p).then(function (d) {
                $().toastmessage('showToast', {
                    text: 'Reset success!',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 2500,
                    closeText: ''
                });
                $scope.id2 = null;
                $scope.authority = null;

            }, function (e) {
                return $().toastmessage('showToast', {
                    text: e.data.message,
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            });
        }
    };
});