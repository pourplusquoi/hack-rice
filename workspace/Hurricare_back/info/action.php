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

<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#sidebar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#"><span>Pethospital </span>Admin</a>
            <ul class="user-menu">
                <li class="dropdown pull-right">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span
                            class="glyphicon glyphicon-user"></span> {{top_username}} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="profile"><span class="glyphicon glyphicon-user"></span> Profile</a></li>
                        <li><a style="cursor: pointer;" ng-click="logOut()"><span
                                    class="glyphicon glyphicon-log-out"></span> Logout</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div><!-- /.container-fluid -->
</nav>
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
                    <a class="active" style="color: white !important;" href="action">
                        <span class="glyphicon glyphicon-pencil"></span> Action Management
                    </a>
                </li>
            </ul>
        </li>
        <li><a href="classification"><span class="glyphicon glyphicon-list"></span> Classes Management</a></li>
        <li class="parent ">
            <a href="#">
                <span class="glyphicon glyphicon-list-alt"></span> Cases Management <span data-toggle="collapse"
                                                                                          href="#sub-item-1"
                                                                                          class="icon pull-right"><em
                        class="glyphicon glyphicon-s glyphicon-plus"></em></span>
            </a>
            <ul class="children collapse" id="sub-item-1">
                <li>
                    <a class="" href="create1">
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
        <li><a href="user"><span class="glyphicon glyphicon-th-list"></span> Users Management</a></li>
        <li><a href="pwd"><span class="glyphicon glyphicon-info-sign"></span> Users Maintenance</a></li>
        <li role="presentation" class="divider"></li>
        <li><a href="profile"><span class="glyphicon glyphicon-user"></span> Personal Profile</a></li>
    </ul>
</div><!--/.sidebar-->
<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main" ng-controller="ActionCtrl">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="index"><span class="glyphicon glyphicon-home"></span></a></li>
            <li class="active">Actions</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">Actions</h1>
        </div>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-8 pull-left">
            <div class="panel panel-default">
                <div class="panel panel-default">
                    <div class="panel-heading"><span class="glyphicon glyphicon-list-alt"></span> Action Information
                    </div>
                    <div class="panel-body">
                        <table data-toggle="table" data-url="../departments/actions" data-show-refresh="true"
                               data-show-toggle="true"
                               data-show-columns="true" data-search="true" data-select-item-name="toolbar1"
                               data-pagination="true" data-sort-name="name" data-sort-order="desc">
                            <thead>
                            <tr>
                                <th data-field="state" data-checkbox="true">Action ID</th>
                                <th data-field="id" data-sortable="true">Action ID</th>
                                <th data-field="action_name" data-sortable="true">Action Name</th>
                                <th data-field="action_desc" data-sortable="true">Action Desc</th>
                                <th data-field="action_user_type" data-sortable="true">Action User</th>
                                <th data-field="drugs_string" data-sortable="true">Action Drug</th>
                                <th data-field="instruments_string" data-sortable="true">Action Instrument</th>
                                <th data-field="department_string" data-sortable="true">Action Department</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

            <div class="pull-left" style="width: 100%">
                <div class="panel panel-default">
                    <div class="panel-heading"><span class="glyphicon glyphicon-trash"></span> Create Action
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" id="form1">
                            <fieldset>
                                <!-- id input-->
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="name">Action Name</label>
                                    <div class="col-md-9">
                                        <input id="name" name="name" ng-model="name" type="text"
                                               placeholder="Action Name"
                                               class="form-control">
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="desc">Action Desc</label>
                                    <div class="col-md-9">
                                        <textarea id="desc" name="desc" style="resize: none;" class="form-control"
                                                  rows="3" ng-model="desc"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="user">Action User</label>
                                    <div class="col-md-9">
                                        <select id="user" name="user" ng-options="a.name for a in users" ng-model="user"
                                                class="form-control">
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="user">Action Drug</label>
                                    <div class="col-md-9">
                                        <label ng-repeat="drug in drugs" style="margin-right: 1em;">
                                            <input
                                                name="drugc"
                                                type="checkbox"
                                                value="{{drug.id}}"
                                                ng-click="addDrug(drug.id)"
                                                ng-model="drug.selected"
                                                style="margin-right: 0.2em;"
                                            > {{drug.drug_name}}
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="user">Action Instrument</label>
                                    <div class="col-md-9">
                                        <label ng-repeat="instrument in instruments" style="margin-right: 1em;">
                                            <input
                                                name="insc"
                                                type="checkbox"
                                                value="{{instrument.id}}"
                                                ng-click="addIns(instrument.id)"
                                                ng-model="instrument.selected"
                                                style="margin-right: 0.2em;"
                                            > {{instrument.instrument_name}}
                                        </label>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="department">Action Department</label>
                                    <div class="col-md-9">
                                        <select id="department" name="department"
                                                ng-options="a.department_name for a in departments"
                                                ng-model="department"
                                                class="form-control">
                                            <option value="">请选择</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Form actions -->
                                <div style="margin-top: 2em;">
                                    <button type="reset" class="btn btn-default pull-right" ng-click="reset()"> Reset
                                    </button>
                                    <button type="submit" class="btn btn-primary pull-right"
                                            style="margin-right: 1em;"
                                            ng-click="createAction(name,desc,user,drugSelection,instrumentSelection,department)">
                                        Create
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div class="col-lg-4 pull-right">
            <div class="panel panel-default" style="width: 100%">
                <div class="panel-heading"><span class="glyphicon glyphicon-trash"></span> Delete Action
                </div>
                <div class="panel-body">
                    <form class="form-horizontal">
                        <fieldset>
                            <!-- id input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="did">Action Id</label>
                                <div class="col-md-9">
                                    <input id="did" name="did" ng-model="did" type="text"
                                           placeholder="Classification Id"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 widget-right">
                                    <button type="submit" ng-click="deleteAction(did)"
                                            class="btn btn-default btn-md pull-right">Submit
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div><!--/.row-->
    </div><!--/.row-->
</div>
</body>
</html>