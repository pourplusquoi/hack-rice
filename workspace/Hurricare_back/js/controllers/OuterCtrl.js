/**
 * Created by Dilemma丶 on 2017/3/26.
 */
var storage, petApp;

petApp = angular.module('petApp');

petApp.controller('OuterCtrl', function ($scope, $http) {

    var q = {
        method: 'get',
        url: '/api/current-user'
    };
    $http(q).then(function (d) {
        $scope.top_username = d.data;
    });

    $scope.logOut = function () {
        var p = {
            method: 'post',
            url: '/api/logout'
        };
        $http(p).then(function (d) {
            window.location.href = '../'
        });
    };
});