/**
 * Created by Dilemma丶 on 2017/3/9.
 */
var adminApp;

adminApp = angular.module('adminApp', []);

adminApp.controller('UserCtrl', function ($scope, $http) {

    var p =  {
        method: 'get',
        url: 'http://34.212.239.105:8000/api/getAllUserInfo'
    };
    $http(p).then(function (d) {
        $('#table').bootstrapTable({
            data: d.data.data,
            columns: [{
                field: 'uid',
                title: 'user id'
            }, {
                field: 'username',
                title: 'Username'
            }, {
                field: 'nickname',
                title: 'Nickname'
            }, {
                field: 'name',
                title: 'Full name'
            }, {
                field: 'gender',
                title: 'Gender'
            }, {
                field: 'ssn',
                title: 'SSN number'
            }, {
                field: 'phone',
                title: 'Phone number'
            }, {
                field: 'email',
                title: 'Email number'
            }, {
                field: 'addr',
                title: 'Address'
        }],
            showToggle: true,
            showColumns: true,
            search: true,
            selectItemName:'toobar1',
            pagination:true,
            sortName: 'name',
            sortOrder:'desc'
        });
    }, function (e) {
        return $().toastmessage('showToast', {
            text: 'Cannot get users',
            sticky: false,
            position: 'top-center',
            type: 'error',
            stayTime: 1500,
            closeText: ''
        });
    });


    $scope.deleteUser = function (id) {
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
            p = {
                method: 'post',
                url: "http://34.212.239.105:8000/api/deleteUser",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:{
                    uid:id
                }
            };
            $http(p).then(function (d) {
                if (d.data.status == "0"){
                    $().toastmessage('showToast', {
                        text: 'Delete success!',
                        sticky: false,
                        position: 'top-center',
                        type: 'success',
                        stayTime: 2500,
                        closeText: ''
                    });
                    $scope.id = null;
                }
                else {
                    $().toastmessage('showToast', {
                        text: 'Delete failed..',
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
            p = {
                method: 'post',
                url: "http://34.212.239.105:8000/api/resetPassword",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:{
                    uid:id
                }
            };
            $http(p).then(function (d) {
                if (d.data.status == "0"){
                    $().toastmessage('showToast', {
                        text: 'Reset to \'hurricare\'!',
                        sticky: false,
                        position: 'top-center',
                        type: 'success',
                        stayTime: 2500,
                        closeText: ''
                    });
                    $scope.id = null;
                }
                else {
                    $().toastmessage('showToast', {
                        text: 'Reset failed..',
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
});