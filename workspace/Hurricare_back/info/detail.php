<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" ng-app="petApp" ng-controller="OuterCtrl">
<head>
<meta charset="<?= Yii::$app->charset ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?= Html::csrfMetaTags() ?>
<title><?= Html::encode($this->title) ?></title>
<?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div id="sidebar-collapse" class="col-sm-3 col-lg-2 sidebar">
    <form role="search">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
        </div>
    </form>
    <ul class="nav menu">
        <li><a href="index"><span class="glyphicon glyphicon-dashboard"></span> Main Page</a></li>
        <li class="parent ">
            <a href="#">
                <span class="glyphicon glyphicon-list-alt"></span> Front Management
                <span data-toggle="collapse" href="#sub-item-11" class="icon pull-right">
                    <em class="glyphicon glyphicon-s glyphicon-plus"></em></span>
            </a>
            <ul class="children collapse" id="sub-item-11">
                <li>
                    <a class="" href="department">
                        <span class="glyphicon glyphicon-pencil"></span> Room Management
                    </a>
                </li>
                <li>
                    <a class="" href="drug">
                        <span class="glyphicon glyphicon-pencil"></span> Drug Management
                    </a>
                </li>
                <li>
                    <a class="" href="instrument">
                        <span class="glyphicon glyphicon-pencil"></span> Instrument Management
                    </a>
                </li>
                <li>
                    <a class="" href="action">
                        <span class="glyphicon glyphicon-pencil"></span> Action Management
                    </a>
                </li>
            </ul>
        </li>
        <li class=""><a href="classification"><span class="glyphicon glyphicon-list"></span> Classes Management</a></li>
        <li class="parent ">
            <a href="#">
                <span class="glyphicon glyphicon-list-alt"></span> Cases Management <span data-toggle="collapse"
                                                                                          href="#sub-item-1"
                                                                                          class="icon pull-right"><em
                        class="glyphicon glyphicon-s glyphicon-plus"></em></span>
            </a>
            <ul class="children collapse" id="sub-item-1">
                <li>
                    <a class=""  href="create1">
                        <span class="glyphicon glyphicon-plus"></span> Create Case
                    </a>
                </li>
                <li>
                    <a class="active" style="color: white !important;" href="modify">
                        <span class="glyphicon glyphicon-pencil"></span> Modify&Delete Case
                    </a>
                </li>
            </ul>
        </li>
        <li><a href="user"><span class="glyphicon glyphicon-th-list"></span> Users Management</a></li>
        <li><a href="pwd"><span class="glyphicon glyphicon-info-sign"></span> Users Maintenance</a></li>
        <li role="presentation" class="divider"></li>
        <li><a href="profile"><span class="glyphicon glyphicon-user"></span> Personal Profile</a></li>
    </ul>
</div><!--/.sidebar-->

<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main" ng-controller="CaseDetailCtrl">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="index"><span class="glyphicon glyphicon-home"></span></a></li>
            <li class="active">Modify Case Detail</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Modify Case Detail</h1>
        </div>
    </div><!--/.row-->


    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-list-alt"></span>Content</div>
                <div class="panel-body">
                    <div class="col-md-6">
                        <form enctype="multipart/form-data">

                            <div class="form-group">
                                <label>Case Name</label>
                                <input class="form-control" ng-model="case_name" placeholder="Name of the case">
                            </div>

                            <div class="form-group">
                                <label>Disease Classification</label>
                                <select ng-change="changeDisease(classification)" ng-options="a for a in classifications" ng-model="classification" class="form-control">
                                    <option  value="">请选择</option></select>
                            </div>

                            <div class="form-group">
                                <label>Disease Name</label>
                                <select ng-options="b for b in diseases" ng-model="disease" class="form-control">
                                    <option  value="">请选择</option></select>
                            </div>

                            <div class="form-group">
                                <label>Case Name Text</label>
                                <textarea style="resize: none;" class="form-control" rows="3" ng-model="unit_text[0]"></textarea>
                            </div>

                            <div>
                                <input onchange="angular.element(this).scope().readFile(0)" type="file"
                                       id="uploadpic0" multiple class="pic">
                                <div class="pure">Case Name Images.</div>
                                <div id="result0" class="pic2" ng-model="attachments[0]">
                                    <img ng-repeat="pic in unit_images[0]" ng-src="{{pic}}" class="show_pic" alt="" />
                                </div>
                            </div>

                            <div>
                                <input onchange="angular.element(this).scope().readVideo(0)" type="file"
                                       id="uploadvideo0" multiple class="pic">
                                <div class="pure">Case Name Videos.</div>
                                <div id="resultv0" class="pic2" ng-model="videos[0]">
                                    <video controls="controls" ng-repeat="v in unit_videos[0]" ng-src="{{v}}" class="show_pic" control="controls" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Serve Text</label>
                                <textarea style="resize: none;" class="form-control" rows="3" ng-model="unit_text[1]"></textarea>
                            </div>

                            <div>
                                <input onchange="angular.element(this).scope().readFile(1)" type="file"
                                       id="uploadpic1" multiple class="pic">
                                <div class="pure">Serve Images Here.</div>
                                <div id="result1" class="pic2" ng-model="attachments[1]">
                                    <img ng-repeat="pic in unit_images[1]" ng-src="{{pic}}" class="show_pic" alt="" />
                                </div>
                            </div>

                            <div>
                                <input onchange="angular.element(this).scope().readVideo(1)" type="file"
                                       id="uploadvideo1" multiple class="pic">
                                <div class="pure">Serve Videos Here.</div>
                                <div id="resultv1" class="pic2" ng-model="videos[1]">
                                    <video controls="controls" ng-repeat="v in unit_videos[1]" ng-src="{{v}}" class="show_pic" control="controls" />
                                </div>
                            </div>

                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Case Check Text</label>
                            <textarea style="resize: none;" class="form-control" rows="3" ng-model="unit_text[2]"></textarea>
                        </div>

                        <div>
                            <input onchange="angular.element(this).scope().readFile(2)" type="file" ng-model="serve_pic2"
                                   id="uploadpic2" multiple class="pic">
                            <div class="pure">Case Check Images.</div>
                            <div id="result2" class="pic2" ng-model="attachments[2]">
                                <img ng-repeat="pic in unit_images[2]" ng-src="{{pic }}" class="show_pic" alt="" />
                            </div>
                        </div>


                        <div>
                            <input onchange="angular.element(this).scope().readVideo(2)" type="file"
                                   id="uploadvideo2" multiple class="pic">
                            <div class="pure">Case Check Videos.</div>
                            <div id="resultv2" class="pic2" ng-model="videos[2]">
                                <video controls="controls" ng-repeat="v in unit_videos[2]" ng-src="{{v}}" class="show_pic" control="controls" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Check Result Text</label>
                            <textarea style="resize: none;" class="form-control" rows="3" ng-model="unit_text[3]"></textarea>
                        </div>

                        <div>
                            <input onchange="angular.element(this).scope().readFile(3)" type="file" ng-model="serve_pic3"
                                   id="uploadpic3" multiple class="pic">
                            <div class="pure">Check Result Images.</div>
                            <div id="result3" class="pic2" ng-model="attachments[3]">
                                <img ng-repeat="pic in unit_images[3]" ng-src="{{pic}}" class="show_pic" alt="" />
                            </div>
                        </div>

                        <div>
                            <input onchange="angular.element(this).scope().readVideo(3)" type="file"
                                   id="uploadvideo3" multiple class="pic">
                            <div class="pure">Check Result Videos.</div>
                            <div id="resultv3" class="pic2" ng-model="videos[3]">
                                <video controls="controls" ng-repeat="v in unit_videos[3]" ng-src="{{v}}" class="show_pic" control="controls" />
                            </div>
                        </div>


                        <div class="form-group">
                            <label>Treatment Text</label>
                            <textarea style="resize: none;" class="form-control" rows="3" ng-model="unit_text[4]"></textarea>
                        </div>

                        <div>
                            <input onchange="angular.element(this).scope().readFile(4)" type="file" ng-model="serve_pic4"
                                   id="uploadpic4" multiple class="pic">
                            <div class="pure">Treat Images Here.</div>
                            <div id="result4" class="pic2" ng-model="attachments[4]">
                                <img ng-repeat="pic in unit_images[4]" ng-src="{{pic}}" class="show_pic" alt="" />
                            </div>
                        </div>

                        <div>
                            <input onchange="angular.element(this).scope().readVideo(4)" type="file"
                                   id="uploadvideo4" multiple class="pic">
                            <div class="pure">Treat Videos Here.</div>
                            <div id="resultv4" class="pic2" ng-model="videos[4]">
                                <video controls="controls" ng-repeat="v in unit_videos[4]" ng-src="{{v}}" class="show_pic" control="controls" />
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary" ng-click="update_case(case_name,disease,unit_text)">Submit Button</button>
                        <button type="reset" style="margin-left: 1em;" class="btn btn-default" ng-click="reset()">Reset Button</button>
                    </div>
                    </form>
                </div>
            </div>
        </div><!-- /.col-->
    </div><!-- /.row -->


</div><!--/.main-->
</body>
</html>
