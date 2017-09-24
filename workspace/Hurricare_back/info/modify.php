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

<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main" ng-controller="ModifyCtrl">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="index"><span class="glyphicon glyphicon-home"></span></a></li>
            <li class="active">Manage Cases</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-6">
            <h1 class="page-header">Manage Cases</h1>
        </div>
        <div class="col-lg-6">
            <button id="btn-back" ng-click="goBack()" class="page-header btn btn-primary btn-back pull-right">Back
            </button>
        </div>
    </div>

    <div id="petClass" class="col-md-12">
        <div class="panel panel-default">
            <div class="panel-body tabs">
                <ul class="nav nav-pills">
                    <li ng-repeat="c in classifications | filter: myFilter" ng-if="$index==0" class="active"><a
                            href=#{{c.id}} data-toggle="tab"
                            ng-click="changeClass($index+1)">{{c.classification_name}}</a>
                    </li>
                    <li ng-repeat="c in classifications | filter: myFilter" ng-if="$index!=0"><a href=#{{c.id}}
                                                                                                 data-toggle="tab"
                                                                                                 ng-click="changeClass($index+1)">{{c.classification_name}}</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div ng-if="$index==0" class="tab-pane fade in active" id={{c.id}}
                         ng-repeat="c in classifications | filter: myFilter">
                        <div class="col-lg-3 module_" ng-click="goToCase(a.id)" ng-repeat="a in diseases">
                            <div class="row">
                                <span class="glyphicon glyphicon-book pull-left bookicon_"></span>
                                <span class="pull-left name_"> {{a.classification_name}}</span>
                            </div>
                        </div>
                    </div>
                    <div ng-if="$index!=0" class="tab-pane fade" id={{c.id}}
                         ng-repeat="c in classifications | filter: myFilter">
                        <div class="col-lg-3 module_" ng-click="goToCase(a.id)" ng-repeat="a in diseases">
                            <div class="row">
                                <span class="glyphicon glyphicon-book pull-left bookicon_"></span>
                                <span class="pull-left name_"> {{a.classification_name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div><!--/.panel-->
    </div><!-- /.col-->


    <div id="petCase" class="col-md-12 panel panel-default" style="padding-top: 2em;">
        <div class="col-lg-3 module" ng-repeat="a in cases">
            <div class="row">
                <span class="glyphicon glyphicon-book pull-left bookicon"></span>
                <span class="pull-left name"> Case {{a.id}}: {{a.case_name}}</span>

            </div>
            <div class="row">
                <span class="classify"> {{a.disease}}</span>
            </div>
            <div class="row">
                <div class="col-lg-2" style="padding-left: 0 !important;">
                    <span class="classify"> {{a.class}}</span></div>
                <div>
                    <button class="pull-right buttonr btn btn-default" ng-click="goToDetail(a.id)"> Modify</button>
                </div>
            </div>
            <div class="row">
                <button class="pull-right buttonr btn btn-default" ng-click="delete(a.id)"> Delete</button>
            </div>
        </div>
    </div><!-- /.col-->
</div><!--/.main-->
</body>
</html>
