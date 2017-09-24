/**
 * Created by Dilemma丶 on 2017/3/30.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

storage = window.localStorage;

petApp.controller('ClassificationCtrl', function ($scope, $http, $window) {

    $scope.createCl = function (name, id) {
        var p;
        if (name === void 0 || name.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter classification name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (id === void 0 || id.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter parent classification id',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else {
            var tmp;
            if (id==0)
                tmp = null;
            else
                tmp = id;
            console.log('go');
            p = {
                method: 'post',
                url: '/cl/create',
                data: {
                    'classification_name': name,
                    'parent': tmp
                }
            };
            $http(p).then(function (d) {
                if (d.data.id != undefined) {
                    $().toastmessage('showToast', {
                        text: 'Create success!',
                        sticky: false,
                        position: 'top-center',
                        type: 'success',
                        stayTime: 2500,
                        closeText: ''
                    });
                    $scope.name = null;
                    $scope.pid = null;
                } else {
                    return $().toastmessage('showToast', {
                        text: 'Create failed..',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                }
            }, function (e) {
                return $().toastmessage('showToast', {
                    text: e.data[0].message,
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            });
        }
    };

    $scope.deleteCl = function (id) {
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
            var str = '/cls/' + id;
            p = {
                method: 'delete',
                url: str
            };
            $http(p).then(function (d) {
                $().toastmessage('showToast', {
                    text: 'Delete success!',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 2500,
                    closeText: ''
                });
                $scope.did = null;

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

    $scope.modCl = function (id,name,pid) {
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
        } else if (name === void 0 || name.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (pid === void 0 || pid.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the parent id',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }else {
            var tmp;
            if (pid==0)
                tmp = null;
            else
                tmp = pid;
            var str1 = '/cls/' + id;
            p = {
                method: 'put',
                url: str1,
                data: {
                    id:id,
                    classification_name:name,
                    parent:tmp
                }
            };
            $http(p).then(function (d) {
                $().toastmessage('showToast', {
                    text: 'Modify success!',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 2500,
                    closeText: ''
                });
                $scope.mid = null;
                $scope.cname = null;
                $scope.mpid = null;

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