/**
 * Created by Dilemma丶 on 2017/3/14.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

storage = window.localStorage;

petApp.controller('ModifyCtrl', function ($scope, $http) {

    $scope.diseases = [];
    $scope.cases = [];

    $('#petCase').css('display', 'none');
    $('#btn-back').css('display', 'none');

    var p = {
        method: 'get',
        url: '/case/classifications'
    };
    $http(p).then(function (d) {
        $scope.classifications = d.data;
        $scope.changeClass(1);
    });

    $scope.myFilter = function (item) {
        return item.parent === null;
    };


    $scope.goToCase = function (id) {
        $scope.cases = [];
        var q = {
            method: 'get',
            url: '/case/cases-by-cl?',
            params: {
                cl: id
            }
        };
        $http(q).then(function (d) {
            $scope.cases = d.data;
        });

        $('#petCase').css('display', 'block');
        $('#btn-back').css('display', 'inline-block');
        $('#petClass').css('display', 'none');
    };

    $scope.goToDetail = function(id){
        window.location.href = "detail?id=" + id;
    };

    $scope.changeClass = function (id) {
        console.log(id);
        $scope.diseases = [];
        for (var i in $scope.classifications) {
            if ($scope.classifications[i].parent == id) {
                $scope.diseases.push($scope.classifications[i]);
            }
        }
    };

    $scope.delete = function (id) {
        var q = {
            method: 'delete',
            url: '/case/delete?',
            params: {
                id: id
            }
        };
        $http(q).then(function (d) {
            window.location.href = "modify";
        });
    };

    $scope.goBack = function(){
        $('#petCase').css('display', 'none');
        $('#btn-back').css('display', 'none');
        $('#petClass').css('display', 'block');
    }
});