<?php
/**
 * User: sam
 * Date: 6/12/15
 * Time: 8:48 PM
 */
use Factshift\Core\Factshift;
use Factshift\User\AppUser;

$User               = Factshift::_()->IoC->session->getUser();
$current_route_name = Factshift::_()->IoC->router->get_matched_route_name();
?>
<!DOCTYPE HTML>
<html>
<head>
    <title>{{site_title_short}} - {{title}}</title>
    <meta name="robots" content="noindex,nofollow" />
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta charset="utf-8">
    <META http-equiv="cache-control" content="public">
    <link href="<?= Factshift::_()->IoC->router->generate_url('css', [ 'raw/main.css' ]); ?>" rel="stylesheet" type="text/css" />
    <!--    REQUIREMENT -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <script src="<?= Factshift::_()->IoC->router->generate_url('js', [ 'vendor/require.min.js' ]) ?>"></script>
    <script type="application/javascript">var FACTSHIFT_BASE_URL = "<?= Factshift::_()->base_url ?>";</script>
    <script type="application/javascript">var FACTSHIFT_JS_URL = "<?= Factshift::_()->IoC->router->generate_url('js', null) ?>";</script>
</head>
<body id="com-factshift">
    <!--    HEADER      -->
    <header role="banner" class="main clearfix" id="header">
        <div id="header-wrapper" class="clearfix main-wrapper">
            <div id="logo">
                <a rel="home" href="<?= Factshift::_()->base_url ?>">
                    <div class="logo">
                        <h1 class="no-view">{{site_title}}</h1>
                        
                        <h2>{{site_description}}</h2>
                    </div>
                </a>
            </div>
            <nav class="main" id="main-nav">
                <ul id="menu-links">
                    <?php /** @var  AppUser $User */
                    if (!Factshift::_()->IoC->session->has_valid_user()): ?>
                        <li class="<?= $current_route_name == 'signup' ? 'active' : '' ?>"><a href="<?= Factshift::_()->IoC->router->generate_url('signup') ?>">Sign up</a></li>
                        <li class="<?= $current_route_name == 'login' ? 'active' : '' ?>"><a href="<?= Factshift::_()->IoC->router->generate_url('login') ?>">Login</a></li>
                    <?php else: ?>
                        <li class="<?= $current_route_name == 'user_home' ? 'active' : '' ?>">
                            <a href="<?= Factshift::_()->IoC->router->generate_url('user_home') ?>">Home ~ <?= $User->alias ?></a></li>
                        <li class="<?= $current_route_name == 'logout' ? 'active' : '' ?>"><a href="<?= Factshift::_()->IoC->router->generate_url('logout') ?>">Log out</a></li>
                    <?php endif; ?>
                    <li class="<?= $current_route_name == 'page_home' ? 'active' : '' ?>"><a href="<?= Factshift::_()->IoC->router->generate_url('page_home') ?>">Topics</a></li>
                </ul>
                <!--		    CHANGE THE FORM ACTION-->
                <form action="" role="search" id="main-search-form">
                    <div>
                        <input type="text" name="q" id="main-search" />
                        <label for="main-search">
                            <button>Search</button>
                        </label>
                    </div>
                </form>
            </nav>
        </div>
    </header>
    <!--    THE MAIN CONTENT OF THE PAGE-->
    <div id="content" class="row">
        <div class="main-wrapper clearfix">
            <!--		SIDEBAR         -->
            {{o_sidebar}}
            <main>
                {{content}}
            </main>
        </div>
    </div>
    <!--    A CONTENT WRAPPER   -->
    <div class="row">
        <div class="main-wrapper">
            <div class="row distributer">
                <div></div>
            </div>
            <div class="distributer">
                <section class="distributed">
                    <header>
                        <h3></h3>
                    </header>
                    <p></p>
                </section>
            </div>
        </div>
    </div>
    <!--    FOOTER      -->
    <footer class="row">
        <div class="main-wrapper">
            <div class="row">
                <header>
                    <!--                <h3>{{site_title}}</h3>-->
                </header>
                <p></p>
            </div>
            <div>
                <!--            &copy; {{site_title}}. All rights reserved.-->
            </div>
        </div>
    </footer>
</body>
</html>