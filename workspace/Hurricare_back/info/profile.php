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
        <li><a href="user"><span class="glyphicon glyphicon-th-list"></span> Users Management</a></li>
        <li><a href="pwd"><span class="glyphicon glyphicon-info-sign"></span> Users Maintenance</a></li>
        <li role="presentation" class="divider"></li>
        <li class="active"><a href="profile"><span class="glyphicon glyphicon-user"></span> Personal Profile</a></li>
    </ul>
</div><!--/.sidebar-->
<div class="col-sm-9 col-sm-offset-3 col-lg-10 col-lg-offset-2 main">
    <div class="row">
        <ol class="breadcrumb">
            <li><a href="index"><span class="glyphicon glyphicon-home"></span></a></li>
            <li class="active">MyProfile</li>
        </ol>
    </div><!--/.row-->

    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">MyProfile</h1>
        </div>
    </div><!--/.row-->

    <div class="row">
        <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-envelope"></span> Contact Form</div>
                <div class="panel-body">
                    <form class="form-horizontal" action="" method="post">
                        <fieldset>
                            <!-- Name input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="name">Name</label>
                                <div class="col-md-9">
                                    <input id="name" name="name" type="text" placeholder="Your name"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- Email input-->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="email">Your E-mail</label>
                                <div class="col-md-9">
                                    <input id="email" name="email" type="text" placeholder="Your email"
                                           class="form-control">
                                </div>
                            </div>

                            <!-- Message body -->
                            <div class="form-group">
                                <label class="col-md-3 control-label" for="message">Your message</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" id="message" name="message"
                                              placeholder="Please enter your message here..." rows="5"></textarea>
                                </div>
                            </div>

                            <!-- Form actions -->
                            <div class="form-group">
                                <div class="col-md-12 widget-right">
                                    <button type="submit" class="btn btn-default btn-md pull-right">Submit</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>

            <div class="panel panel-default chat">
                <div class="panel-heading" id="accordion"><span class="glyphicon glyphicon-comment"></span> Chat</div>

                <div class="panel-body">
                    <ul>
                        <li class="left clearfix">
								<span class="chat-img pull-left">
									<img src="http://placehold.it/80/30a5ff/fff" alt="User Avatar" class="img-circle"/>
								</span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="text-muted">32 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante turpis, rutrum
                                    ut ullamcorper sed, dapibus ac nunc. Vivamus luctus convallis mauris, eu gravida
                                    tortor aliquam ultricies.
                                </p>
                            </div>
                        </li>
                        <li class="right clearfix">
								<span class="chat-img pull-right">
									<img src="http://placehold.it/80/dde0e6/5f6468" alt="User Avatar"
                                         class="img-circle"/>
								</span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="pull-left primary-font">Jane Doe</strong>
                                    <small class="text-muted">6 mins ago</small>
                                </div>
                                <p>
                                    Mauris dignissim porta enim, sed commodo sem blandit non. Ut scelerisque sapien eu
                                    mauris faucibus ultrices. Nulla ac odio nisl. Proin est metus, interdum scelerisque
                                    quam eu, eleifend pretium nunc. Suspendisse finibus auctor lectus, eu interdum
                                    sapien.
                                </p>
                            </div>
                        </li>
                        <li class="left clearfix">
								<span class="chat-img pull-left">
									<img src="http://placehold.it/80/30a5ff/fff" alt="User Avatar" class="img-circle"/>
								</span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">John Doe</strong>
                                    <small class="text-muted">32 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ante turpis, rutrum
                                    ut ullamcorper sed, dapibus ac nunc. Vivamus luctus convallis mauris, eu gravida
                                    tortor aliquam ultricies.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-md"
                               placeholder="Type your message here..."/>
                        <span class="input-group-btn">
								<button class="btn btn-success btn-md" id="btn-chat">Send</button>
							</span>
                    </div>
                </div>
            </div>

        </div><!--/.col-->

        <div class="col-md-4">

            <div class="panel panel-red">
                <div class="panel-heading dark-overlay"><span class="glyphicon glyphicon-calendar"></span>Calendar</div>
                <div class="panel-body">
                    <div id="calendar"></div>
                </div>
            </div>

            <div class="panel panel-blue">
                <div class="panel-heading dark-overlay"><span class="glyphicon glyphicon-check"></span>To-do List</div>
                <div class="panel-body">
                    <ul class="todo-list">
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Make a plan for today</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Update Basecamp</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Send email to Jane</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Drink coffee</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Do some work</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                        <li class="todo-list-item">
                            <div class="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <label for="checkbox">Tidy up workspace</label>
                            </div>
                            <div class="pull-right action-buttons">
                                <a href="#"><span class="glyphicon glyphicon-pencil"></span></a>
                                <a href="#" class="flag"><span class="glyphicon glyphicon-flag"></span></a>
                                <a href="#" class="trash"><span class="glyphicon glyphicon-trash"></span></a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input" type="text" class="form-control input-md" placeholder="Add new task"/>
                        <span class="input-group-btn">
								<button class="btn btn-primary btn-md" id="btn-todo">Add</button>
							</span>
                    </div>
                </div>
            </div>

        </div><!--/.col-->
    </div><!--/.row-->
</div>    <!--/.main-->
</body>
</html>
