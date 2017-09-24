/**
 * Created by Dilemma丶 on 2017/3/16.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

petApp.controller('CreateCtrl', function ($scope, $http) {

    $scope.classifications = [];
    $scope.diseases = [];

    var data;

    var p = {
        method: 'get',
        url: '/case/classifications'
    };
    $http(p).then(function (d) {
        data = d.data;
        for (var i in data) {
            if (data[i].parent === null) {
                $scope.classifications.push(data[i].classification_name);
            }
        }
    });

    $scope.changeDisease = function (cl) {
        $scope.diseases = [];
        if (cl != null) {
            var tmp_id;
            for (var i in data) {
                if (data[i].classification_name == cl) {
                    tmp_id = data[i].id;
                    break;
                }
            }
            for (var j in data) {
                if (data[j].parent == tmp_id) {
                    $scope.diseases.push(data[j].classification_name);
                }
            }
        }
    };

    $scope.create_case = function (name, classification) {
        if (name === void 0 || name.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please enter the case name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else if (classification === void 0 || classification === null ||classification.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please select the disease name',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        } else {
            var x = -1;
            for (var i in data) {
                if (data[i].classification_name == classification) {
                    x = data[i].id;
                    break;
                }
            }
            var p = {
                method: 'post',
                url: '/case/create',
                data: {
                    'case_name': name,
                    'case_classification': x
                }
            };
            $http(p).then(function (d) {
                window.location.href = 'create2?id=' + d.data;
            }, function (e) {
                $().toastmessage('showToast', {
                    text: 'Create a base case failed..',
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
        $scope.case_name = void 0;
        $scope.classifications = [];
        var s = {
            method: 'get',
            url: '/case/classifications'
        };
        $http(s).then(function (d) {
            data = d.data;
            for (var i in data) {
                if (data[i].parent === null) {
                    $scope.classifications.push(data[i].classification_name);
                }
            }
        });
        $scope.diseases = [];
    }
});