/**
 * Created by Dilemma丶 on 2017/4/11.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

storage = window.localStorage;

petApp.controller('ActionCtrl', function ($scope, $http, filterFilter) {

    $scope.users = [
        {name: '前台', id: 0},
        {name: '医助', id: 1},
        {name: '医师', id: 2}
    ];

    var depart = {
        method: 'get',
        url: '/deps'
    };
    $http(depart).then(function (d) {
        $scope.departments = d.data;
    });

    var drug = {
        method: 'get',
        url: '/drugs'
    };
    $http(drug).then(function (d) {
        $scope.drugs = d.data;
        $scope.drugSelection = [];
    });

    var instrument = {
        method: 'get',
        url: '/instruments'
    };
    $http(instrument).then(function (d) {
        $scope.instruments = d.data;
        $scope.instrumentSelection = [];
    });

    $scope.addDrug = function (id) {
        var idx = $scope.drugSelection.indexOf(id);

        // Is currently selected
        if (idx > -1) {
            $scope.drugSelection.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.drugSelection.push(id);
        }
    };

    $scope.addIns = function (id) {
        var idx = $scope.instrumentSelection.indexOf(id);

        // Is currently selected
        if (idx > -1) {
            $scope.instrumentSelection.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.instrumentSelection.push(id);
        }
    };

    $scope.createAction = function (name, desc, user, drug, instrument, department) {
        var p;
        if (name === void 0 || name.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the action name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (desc === void 0 || desc.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the action description',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (user === void 0 || user.length === 0 || user === null) {
            $().toastmessage('showToast', {
                text: 'Please check the action user type',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (drug === void 0 || drug === null) {
            $().toastmessage('showToast', {
                text: 'Please check the drug',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (instrument === void 0 || instrument === null) {
            $().toastmessage('showToast', {
                text: 'Please check the instrument',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (department === void 0 || department.length === 0 || department === null) {
            $().toastmessage('showToast', {
                text: 'Please check the department',
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
                url: '/api/create_action',
                data: {
                    action_name: name,
                    action_desc: desc,
                    action_user_type: user.id,
                    drugs: drug,
                    instruments: instrument,
                    department_id: department.id
                }
            };
            $http(p).then(function (d) {
                $().toastmessage('showToast', {
                    text: 'Create success!',
                    sticky: false,
                    position: 'top-center',
                    type: 'success',
                    stayTime: 2500,
                    closeText: ''
                });
                $scope.reset();

            }, function (e) {
                return $().toastmessage('showToast', {
                    text: e.data.message,
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            })
        }
        ;
    };

    $scope.deleteAction = function (id) {
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
            var str = '/api/delete_action?id=' + id;
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


    $scope.reset = function () {
        document.getElementById('form1').reset();
        $scope.name = void 0;
        $scope.desc = void 0;
        $scope.user = void 0;
        $scope.department = void 0;
        $scope.drugSelection = [];
        $scope.instrumentSelection = [];
    };


    var action = {
        method: 'get',
        url: '/departments/actions'
    };
    $http(action).then(function (d) {
    });

});