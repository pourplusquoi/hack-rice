/**
 * Created by Dilemma丶 on 9/23/2017.
 */
var adminApp;

adminApp = angular.module('adminApp', []);

adminApp.controller('DonationCtrl', function ($scope, $http) {

    var p =  {
        method: 'get',
        url: 'http://34.212.239.105:8000/api/getAllDonation'
    };
    $http(p).then(function (d) {
        $('#table').bootstrapTable({
            data: d.data.content,
            columns: [{
                field: 'orderID',
                title: 'order id'
            }, {
                field: 'status',
                title: 'status'
            }, {
                field: 'items',
                title: 'items'
            },{
                field: 'startDate',
                title: 'startDate'
            }, {
                field: 'endDate',
                title: 'endDate'
            }, {
                field: 'arrivingDate',
                title: 'arrivingDate'
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
            text: 'Cannot get donations',
            sticky: false,
            position: 'top-center',
            type: 'error',
            stayTime: 1500,
            closeText: ''
        });
    });


    $scope.statuses = ["pending","delivering","confirm"];

    var status_map = {0:"pending",1:"delivering",2:"confirm"};

    $scope.setStatus = function (id,status) {
        var p,status_;
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
        else if (status === void 0 || status.length === 0) {
            $().toastmessage('showToast', {
                text: 'Please select a status',
                sticky: false,
                position: 'top-center',
                type: 'error',
                stayTime: 1500,
                closeText: ''
            });
        }
        else {
            for (var i in status_map){
                if (status_map[i] == status)
                {
                    status_ = i;
                    break;
                }
            }
            p = {
                method: 'post',
                url: "http://34.212.239.105:8000/api/setDonateStatus",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data:{
                    od_id:id,
                    status:status_
                }
            };
            $http(p).then(function (d) {
                if (d.data.status == "0"){
                    $().toastmessage('showToast', {
                        text: 'Modify success!',
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
                        text: 'Modify failed..',
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