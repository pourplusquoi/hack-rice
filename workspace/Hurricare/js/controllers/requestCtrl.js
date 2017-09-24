/**
 * Created by Dilemma丶 on 9/22/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('RequestCtrl', function ($scope, $http, $window) {

        $scope.items = [];
        $scope.tmp = [];
        var data, data1;

        //start default
        $scope.currentUser = null;
        $scope.currentNickname = null;
        $scope.currentId = -1;
        if ($window.sessionStorage.getItem('username')) {
            $scope.currentUser = $window.sessionStorage.getItem('username');
            var current = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getCurrentUser',
                params: {username: $scope.currentUser}
            };
            $http(current).then(function (d) {
                $scope.currentNickname = d.data.nickname;
                $scope.currentId = d.data.uid;
            });

        }
        else {
            alert('You must sign in to view the site');
            $window.location = './index.html';
        }

        $scope.logout = function () {
            $window.sessionStorage.clear();
            $window.location = './index.html';
            $scope.currentUser = null;
            $scope.currentNickname = null;
            $scope.currentId = -1;
        };
        //end

        if ($scope.currentUser) {
            //get default category1
            var tmp = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getCategory_1'
            };
            $http(tmp).then(function (d) {
                data = d.data;
                for (var i in d.data) {
                    $scope.tmp.push(d.data[i]);
                }
            });
        }

        $scope.add = function () {
            var obj;
            obj = {
                "category1": void 0,
                "category2": void 0,
                "category1s": $scope.tmp,
                "category2s": void 0,
                "category2_list": void 0,
                "quantity": void 0
            };
            $scope.items.push(obj);
            console.log($scope.items[0]);
        };

        $scope.delete = function (idx) {
            if ($scope.items.length === 1) {
                return $().toastmessage('showToast', {
                    text: 'You must donate at least one item',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            } else {
                return $scope.items.splice(idx, 1);
            }
        };

        $scope.changeCategory = function (index, category) {
            $scope.items[index].category2s = [];
            if (category != null) {
                var tmp_id;
                for (var j in data) {
                    if (data[j] == category) {
                        tmp_id = j;
                        break;
                    }
                }
                var tmp2 = {
                    method: 'get',
                    url: 'http://34.212.239.105:8000/api/getCategory_2',
                    params: {category: tmp_id}
                };
                $http(tmp2).then(function (d) {
                    $scope.items[index].category2_list = d.data;
                    for (var i in d.data)
                        $scope.items[index].category2s.push(d.data[i]);
                });
            }
        };

        $scope.insert = function (currentId, items) {
            var reg = /^[1-9]+[0-9]*$/;
            for (var i in items) {
                if (items[i].category1 === void 0 || items[i].category1.length === 0) {
                    $().toastmessage('showToast', {
                        text: 'Please select a category',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                    return;
                }
                else if (items[i].category2 === void 0 || items[i].category2.length === 0) {
                    $().toastmessage('showToast', {
                        text: 'Please select a specific item',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                    return;
                }
                else if (items[i].quantity === void 0 || items[i].quantity.length === 0) {
                    $().toastmessage('showToast', {
                        text: 'Please enter the quantity',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                    return;
                }
                else if (!reg.test(items[i].quantity)) {
                    $().toastmessage('showToast', {
                        text: 'Quantity should be a non-negative number',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 1500,
                        closeText: ''
                    });
                    return;
                }
            }

            for (var i in items) {
                var data0 = new Object();
                for (var x in data) {
                    if (data[x] == items[i].category1) {
                        data0["cat1"] = x;
                        break;
                    }
                }
                for (var y in items[i].category2_list) {
                    if (items[i].category2_list[y] == items[i].category2) {
                        data0["cat2"] = y;
                        break;
                    }
                }
                data0["quantity"] = items[i].quantity;
                data0["uid"] = $scope.currentId;
                console.log(data0);
                var call = {
                    method: 'post',
                    url: 'http://34.212.239.105:8000/api/addRequest',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: data0
                };
                $http(call).then(function (d) {
                    if (d.data.status == "0") {
                        $().toastmessage('showToast', {
                            text: 'Request item success',
                            sticky: false,
                            position: 'top-center',
                            type: 'success',
                            stayTime: 1500,
                            closeText: ''
                        });
                        $window.setInterval(function () {
                            $window.location = './personal.html'
                        }, 2000);
                    }
                    else {
                        $().toastmessage('showToast', {
                            text: 'Request failed',
                            sticky: false,
                            position: 'top-center',
                            type: 'error',
                            stayTime: 1500,
                            closeText: ''
                        });
                    }
                });
            }


        };

        //pre-do
        $scope.add();
    }
);