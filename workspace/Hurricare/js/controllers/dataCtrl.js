/**
 * Created by Dilemma丶 on 9/23/2017.
 */
var careApp;

careApp = angular.module('careApp', []);

careApp.controller('dataCtrl', function ($scope, $http) {

        var map;
        var heatmapData;

        function randomNormalDistribution() {
            var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
            do {
                u = Math.random() * 2 - 1.0;
                v = Math.random() * 2 - 1.0;
                w = u * u + v * v;
            }
            while (w == 0.0 || w >= 1.0)
            c = Math.sqrt((-2 * Math.log(w)) / w);
            return u * c * 0.08;
        }

        $scope.initMap = function () {
            var houston = new google.maps.LatLng(29.755427, -95.376123);
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: houston,
                mapTypeId: 'terrain'
            });
            heatmapData = [];
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                opacity: 0.5,
                dissipating: true,
                radius: 80
            });

            setInterval(
                $scope.func(),
                300
            );
        };

        $scope.func = function () {
            var current = 0;
            var markers = [];
            var batch = 0;
            var p = {
                method: 'get',
                url: 'http://34.212.239.105:8000/api/getTweet'
            };
            $http(p).then(function (d) {
                for (var x in d.data) {
                    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
                    markers.push(new google.maps.Marker({
                        position: {
                            lat: d.data[x][0] + randomNormalDistribution(),
                            lng: d.data[x][1] + randomNormalDistribution()
                        },
                        map: map,
                        icon: image,
                        count: batch
                    }));
                    for (var i = 0; i < markers.length; i++) {
                        if (markers[i].count > batch - 4) {
                            if (markers[i].map == null)
                                markers[i].setMap(map);
                        }
                        else {
                            markers[i].setMap(null);
                        }
                    }
                    batch++;
                }
            });
        };

        $scope.initMap();
    }
);
