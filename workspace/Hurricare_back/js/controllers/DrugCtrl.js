/**
 * Created by Dilemma丶 on 2017/4/11.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

storage = window.localStorage;

petApp.controller('DrugCtrl', function ($scope, $http) {

    $scope.createDrug = function (name, desc) {
        var p;
        if (name === void 0 || name.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the drug name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (desc === void 0 || desc.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the drug description',
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
                url: '/drugs',
                data: {
                    'drug_name': name,
                    'drug_desc': desc
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
                    $scope.desc = null;
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

    $scope.deleteDrug = function (id) {
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
            var str = '/drugs/' + id;
            console.log(str);
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

    $scope.modifyDrug = function (id, name, desc) {
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
                text: 'Please enter the new name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (desc === void 0 || desc.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the new description',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else {
            var str = '/drug/update?id=' + id;
            console.log(str);
            p = {
                method: 'put',
                url: str,
                data: {
                    'drug_name': name,
                    'drug_desc': desc
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
                $scope.id1 = null;
                $scope.name1 = null;
                $scope.desc1 = null;

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

    var drug = {
        method: 'get',
        url: '/drugs'
    };
    $http(drug).then(function (d) {
    });
});