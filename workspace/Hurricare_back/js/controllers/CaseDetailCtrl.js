/**
 * Created by Dilemma丶 on 2017/3/28.
 */
var storage, petApp;

petApp = angular.module('petApp', []);

petApp.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false//必须配置为false，否则<base href=''>这种格式带base链接的地址才能解析
    });
}]);

petApp.controller('CaseDetailCtrl', function ($scope, $http, $location) {
        $scope.unit_text = new Array();
        $scope.unit_id = new Array();
        $scope.unit_images = new Array();
        $scope.unit_videos = new Array();
        $scope.attachments = new Array();
        $scope.videos = new Array();

        if ($location.search().id) {
            $scope.case_id = $location.search().id;
        }
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


        $scope.default = function () {
            var p = {
                method: 'get',
                url: '/case/case-by-id?',
                params: {
                    id: $scope.case_id
                }
            };
            $http(p).then(function (d) {
                $scope.case_name = d.data.case_name;
                for (var i in d.data.units) {
                    $scope.unit_text[i] = d.data.units[i].case_text;
                    $scope.unit_id[i] = d.data.units[i].id;
                }
                var str = '/cls/' + d.data.case_classification;
                var q = {
                    method: 'get',
                    url: str
                };
                $http(q).then(function (e) {
                    var str1 = '/cls/' + e.data.parent;
                    var r = {
                        method: 'get',
                        url: str1
                    };
                    $http(r).then(function (f) {
                        $scope.classification = f.data.classification_name;
                        $scope.changeDisease(f.data.classification_name);
                        $scope.disease = e.data.classification_name;
                        var a = {
                            method: 'get',
                            url: '/case/unit?',
                            params: {
                                unit_id: $scope.unit_id[0]
                            }
                        };
                        $http(a).then(function (b) {
                            $scope.unit_images[0] = b.data.images;
                            $scope.unit_videos[0] = b.data.videos;

                            var c = {
                                method: 'get',
                                url: '/case/unit?',
                                params: {
                                    unit_id: $scope.unit_id[1]
                                }
                            };
                            $http(c).then(function (d) {
                                $scope.unit_images[1] = d.data.images;
                                $scope.unit_videos[1] = d.data.videos;

                                var e = {
                                    method: 'get',
                                    url: '/case/unit?',
                                    params: {
                                        unit_id: $scope.unit_id[2]
                                    }
                                };
                                $http(e).then(function (f) {
                                    $scope.unit_images[2] = f.data.images;
                                    $scope.unit_videos[2] = f.data.videos;

                                    var g = {
                                        method: 'get',
                                        url: '/case/unit?',
                                        params: {
                                            unit_id: $scope.unit_id[3]
                                        }
                                    };
                                    $http(g).then(function (h) {
                                        $scope.unit_images[3] = h.data.images;
                                        $scope.unit_videos[3] = h.data.videos;

                                        var i = {
                                            method: 'get',
                                            url: '/case/unit?',
                                            params: {
                                                unit_id: $scope.unit_id[4]
                                            }
                                        };
                                        $http(i).then(function (j) {
                                            $scope.unit_images[4] = j.data.images;
                                            $scope.unit_videos[4] = j.data.videos;
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };

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

        $scope.update_case = function (case_name, disease, unit_text) {
            if (case_name === void 0 || case_name.length === 0) {
                $().toastmessage('showToast', {
                    text: 'Please enter the case name',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            } else if (disease === void 0 || disease.length === 0) {
                $().toastmessage('showToast', {
                    text: 'Please select a disease',
                    sticky: false,
                    position: 'top-center',
                    type: 'error',
                    stayTime: 1500,
                    closeText: ''
                });
            } else {
                var p = {
                    method: 'get',
                    url: '/case/classifications'
                };
                $http(p).then(function (d) {
                    data = d.data;
                    for (var i in data) {
                        if (data[i].classification_name === disease) {
                            $scope.classification_id = data[i].id;
                            console.log('parent:' + $scope.classification_id);
                            break;
                        }
                    }
                    var q = {
                        method: 'post',
                        url: '/case/update?',
                        params: {
                            id: $scope.case_id
                        },
                        data: {
                            case_name: case_name,
                            case_classification: $scope.classification_id
                        }
                    };
                    console.log('parent2:' + $scope.classification_id);
                    $http(q).then(function (d) {
                        $scope.modifyPic($scope.attachments[0], $scope.unit_id[0]);
                        $scope.modifyPic($scope.attachments[1], $scope.unit_id[1]);
                        $scope.modifyPic($scope.attachments[2], $scope.unit_id[2]);
                        $scope.modifyPic($scope.attachments[3], $scope.unit_id[3]);
                        $scope.modifyPic($scope.attachments[4], $scope.unit_id[4]);
                        $scope.modifyVideo($scope.videos[0], $scope.unit_id[0]);
                        $scope.modifyVideo($scope.videos[1], $scope.unit_id[1]);
                        $scope.modifyVideo($scope.videos[2], $scope.unit_id[2]);
                        $scope.modifyVideo($scope.videos[3], $scope.unit_id[3]);
                        $scope.modifyVideo($scope.videos[4], $scope.unit_id[4]);
                        for (var i in unit_text) {
                            var r = {
                                method: 'post',
                                url: '/case/update-unit?',
                                params: {
                                    id: $scope.unit_id[i]
                                },
                                data: {
                                    text: $scope.unit_text[i]
                                }
                            };
                            $http(r).then(function (d) {

                            });
                        }
                        $().toastmessage('showToast', {
                            text: 'Modify Success',
                            sticky: false,
                            position: 'top-center',
                            type: 'success',
                            stayTime: 1500,
                            closeText: ''
                        });
                    });
                });
            }
        };


        $scope.modifyPic = function (attachments, unit_id) {
            if (attachments != [] && attachments != undefined) {
                var a = {
                    method: 'delete',
                    url: '/upload/delete-all-image',
                    params: {
                        'unit_id': unit_id
                    }
                };
                $http(a).then(function (e) {
                    var data = {};
                    for (var i in attachments) {
                        var tmp = 'imageFiles[' + i.toString() + ']';
                        data[tmp] = attachments[i];
                        var tmp1 = 'imageInfo[' + i.toString() + ']';
                        data[tmp1] = null;
                    }
                    var form = new FormData();
                    for (var key in data) {
                        var v = data[key];
                        form.append(key, v);
                    }
                    var r = {
                        method: 'post',
                        url: '/upload/image',
                        params: {
                            'unit_id': unit_id
                        },
                        data: form,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': void 0
                        }
                    };
                    $http(r).then(function (d) {
                    }, function (f) {
                        var obj = eval("(" + f.data.message + ")");
                        $().toastmessage('showToast', {
                            text: obj.imageFiles[0],
                            sticky: false,
                            position: 'top-center',
                            type: 'error',
                            stayTime: 3000,
                            closeText: ''
                        });
                    });
                });
            }
        };


        $scope.modifyVideo = function (videos, unit_id) {
            if (videos != [] && videos != undefined) {
                var a = {
                    method: 'delete',
                    url: '/upload/delete-all-video',
                    params: {
                        'unit_id': unit_id
                    }
                };
                $http(a).then(function (e) {
                    var data = {};
                    for (var i in videos) {
                        var tmp = 'videoFiles[' + i.toString() + ']';
                        data[tmp] = videos[i];
                        var tmp1 = 'videoInfo[' + i.toString() + ']';
                        data[tmp1] = null;
                    }
                    var form = new FormData();
                    for (var key in data) {
                        var v = data[key];
                        form.append(key, v);
                    }
                    var r = {
                        method: 'post',
                        url: '/upload/video',
                        params: {
                            'unit_id': unit_id
                        },
                        data: form,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': void 0
                        }
                    };
                    $http(r).then(function (d) {
                    }, function (f) {
                        var obj = eval("(" + f.data.message + ")");
                        $().toastmessage('showToast', {
                            text: obj.videoFiles[0],
                            sticky: false,
                            position: 'top-center',
                            type: 'error',
                            stayTime: 3000,
                            closeText: ''
                        });
                    });
                });

            }
        };

        $scope.readFile = function (index) {
            $scope.attachments[index] = [];
            var count, file1, reader, stop, _i, _len, _ref, num = 0;
            stop = false;
            count = 0;
            var tmp_ = 'result' + index;
            var tmp_s = 'uploadpic' + index;
            document.getElementById(tmp_).innerHTML = '';
            _ref = document.getElementById(tmp_s).files;
            console.log(_ref);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file1 = _ref[_i];
                count++;
                if (!/image\/\w+/.test(file1.type)) {
                    $().toastmessage('showToast', {
                        text: 'Not image files, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (file1.size > 1024 * 1024) {
                    $().toastmessage('showToast', {
                        text: 'Larger than 1M, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (count > 3) {
                    $().toastmessage('showToast', {
                        text: 'More than 3 images, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (!stop) {
                    reader = new FileReader();
                    reader.readAsDataURL(file1);
                    console.log(file1);
                    console.log(count);
                    $scope.attachments[index].push(file1);
                    reader.onload = function (f) {
                        var str_ = 'pic' + index;
                        var str_num = str_ + num.toString();
                        document.getElementById(tmp_).innerHTML += '<img id = "' + str_num + '" src="" class="show_pic" alt="" />';
                        document.getElementById(str_num).setAttribute('src', this.result);
                        return ++num;
                    };
                }
            }
            if (stop) {
                $scope.attachments[index] = [];
            } else {
            }
        };


        $scope.readVideo = function (index) {
            $scope.videos[index] = [];
            var count, file1, reader, stop, _i, _len, _ref, num = 0;
            stop = false;
            count = 0;
            var tmp_ = 'resultv' + index;
            var tmp_s = 'uploadvideo' + index;
            document.getElementById(tmp_).innerHTML = '';
            _ref = document.getElementById(tmp_s).files;
            console.log(_ref);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                file1 = _ref[_i];
                count++;
                if (!/video\/\w+/.test(file1.type)) {
                    $().toastmessage('showToast', {
                        text: 'Not video files, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (file1.size > 1024 * 1024 * 500) {
                    $().toastmessage('showToast', {
                        text: 'Larger than 500M, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (count > 3) {
                    $().toastmessage('showToast', {
                        text: 'More than 3 videos, they won\'t be upload.',
                        sticky: false,
                        position: 'top-center',
                        type: 'error',
                        stayTime: 3000,
                        closeText: ''
                    });
                    stop = true;
                    break;
                }
                if (!stop) {
                    reader = new FileReader();
                    reader.readAsDataURL(file1);
                    $scope.videos[index].push(file1);
                    reader.onload = function (f) {
                        var str_ = 'video' + index;
                        var str_num = str_ + num.toString();
                        document.getElementById(tmp_).innerHTML += '<video id = "' + str_num + '" src="" class="show_pic" controls="controls"/>';
                        document.getElementById(str_num).setAttribute('src', this.result);
                        return ++num;
                    };
                }
            }
            if (stop) {
                $scope.videos[index] = []
            } else {
            }
            console.log($scope.videos);
        };


        $scope.reset = function () {
            $scope.case_name = void 0;
            $scope.classification = void 0;
            $scope.disease = void 0;
            $scope.unit_text[0] = '';
            $scope.unit_text[1] = '';
            $scope.unit_text[2] = '';
            $scope.unit_text[3] = '';
            $scope.unit_text[4] = '';

            $scope.attachments = [];
            document.getElementById('result').innerHTML = '';
        };

        $scope.default();
    }
);