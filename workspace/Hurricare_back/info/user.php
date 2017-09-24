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
                    <a class="" href="modify">
                        <span class="glyphicon glyphicon-pencil"></span> Modify&Delete Case
                    </a>
                </li>
            </ul>
        </li>
        <li class="active"><a href="user"><span class="glyphicon glyphicon-th-list"></span> Users Management</a></li>
        <li><a href="pwd"><span class="glyphicon glyphicon-info-sign"></span> Users Maintenance</a></li>
        <li role="presentation" class="divider"></li>
        <li><a href="profile"><span class="glyphicon glyphicon-user"></span> Personal Profile</a></li>
    </ul>
</div><!--/.sidebar-->
<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main" ng-controller="UserCtrl">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="index"><span class="glyphicon glyphicon-home"></span></a></li>
            <li class="active">Users</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Users</h1>
        </div>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-8">
            <div class="panel panel-default">
                <div class="panel panel-default">
                    <div class="panel-heading"><span class="glyphicon glyphicon-list-alt"></span>   User Information</div>
                    <div class="panel-body">
                        <table data-toggle="table" data-url="../users"  data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-search="true" data-select-item-name="toolbar1" data-pagination="true" data-sort-name="name" data-sort-order="desc">
                            <thead>
                            <tr>
                                <th data-field="state" data-checkbox="true" >User ID</th>
                                <th data-field="id" data-sortable="true">User ID</th>
                                <th data-field="username"  data-sortable="true">User Name</th>
                                <th data-field="user_type" data-sortable="true">User Type</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-pencil"></span> Create User</div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <fieldset>
                            <!-- Name input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="name">Username</label>
                                <div class="col-md-9">
                                    <input id="name" name="name" ng-model="name" type="text" placeholder="Your username"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- pwd input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="pwd">Password</label>
                                <div class="col-md-9">
                                    <input id="pwd" name="pwd" ng-model="pwd" type="password"
                                           placeholder="Your password"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- pwd_ input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="pwd2">Password</label>
                                <div class="col-md-9">
                                    <input id="pwd2" name="pwd2" ng-model="pwd2" type="password"
                                           placeholder="Type your password again"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- Authority body -->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="authority">Authority</label>
                                <div class="col-md-9">
                                    <input name="authority" ng-model="authority" ng-value="0" type="radio" value="user"/> User <br>
                                    <input name="authority" ng-model="authority" ng-value="1"type="radio" value="admin"/>
                                    Administrator
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 widget-right">
                                    <button type="submit" ng-click="createUser(name,pwd,pwd2,authority)"
                                            class="btn btn-default btn-md pull-right">Submit
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div><!--/.row-->


        <div class="col-lg-4 pull-right">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-trash"></span> Delete User</div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <fieldset>
                            <!-- id input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="id">User Id</label>
                                <div class="col-md-9">
                                    <input id="id" name="id" ng-model="id" type="text" placeholder="User Id"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 widget-right">
                                    <button type="submit" ng-click="deleteUser(id)"
                                            class="btn btn-default btn-md pull-right">Submit
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div><!--/.row-->
    </div>
</div>
</body>
</html>
