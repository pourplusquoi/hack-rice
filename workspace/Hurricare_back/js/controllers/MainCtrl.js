/**
 * Created by Dilemma丶 on 2017/2/28.
 */
var storage, adminApp;

adminApp = angular.module('adminApp', []);

adminApp.controller('MainCtrl', function ($scope, $http, $window) {

    var p = {
        method: 'get',
        url: 'http://34.212.239.105:8000/api/getStat',
    };
    $http(p).then(function (d) {
        $scope.donation_num = d.data.donate;
        $scope.request_num = d.data.req;
        $scope.match_num = d.data.match;
        $scope.user_num = d.data.user;
    });
});