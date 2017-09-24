/**
 * Created by Dilemma丶 on 9/22/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('MainCtrl', function ($scope, $http, $window) {

    //start default
    $scope.currentUser = null;
    $scope.currentNickname = null;
    $scope.currentId = -1;
    if ($window.sessionStorage.getItem('username')) {
        $scope.currentUser = $window.sessionStorage.getItem('username');
        console.log($scope.currentUser);
        var current = {
            method: 'get',
            url: 'http://34.212.239.105:8000/api/getCurrentUser',
            params: {username: $scope.currentUser}
        };
        $http(current).then(function (d) {
            $scope.currentNickname = d.data.nickname;
            $scope.currentId = d.data.uid;
        });
    };

    $scope.logout = function(){
        $window.sessionStorage.clear();
        $window.location = './index.html';
        $scope.currentUser = null;
        $scope.currentNickname = null;
        $scope.currentId = -1;
    };
    //end

    var news = {
        method: 'get',
        url: 'http://34.212.239.105:8000/api/getNews'
    };
    $http(news).then(function (d) {
        $scope.news1 = d.data[0];
        $scope.news2 = d.data[1];
        $scope.news3 = d.data[2];
    });


    var feedback = {
        method: 'get',
        url: 'http://34.212.239.105:8000/api/getFeedback'
    };
    $http(feedback).then(function (d) {
        $scope.feedback1 = d.data[0];
        $scope.feedback2 = d.data[1];
        $scope.feedback3 = d.data[2];
    });

});