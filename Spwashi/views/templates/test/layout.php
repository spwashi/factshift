<?php
/**
 * User: sam
 * Date: 6/12/15
 * Time: 8:48 PM
 */
use Sm\Core\App;
use Sm\Router\Toute;
use Sm\Router\Touter;
use Spwashi\Model\User;

$user_id    = false;
$route_name = Touter::$matched_route_name;
?>
<!DOCTYPE HTML>
<html>
<head>
    <title>{{site_title_short}} - {{title}}</title>
    <meta name="robots" content="noindex,nofollow"/>
    <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>
    <meta charset="utf-8">
    <META http-equiv="cache-control" content="public">
    <link href="<?= Toute::generate_url('css', ['raw/main.css']); ?>" rel="stylesheet" type="text/css"/>
    <!--    REQUIREMENT -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <script src="<?= Toute::generate_url('js', ['vendor/require.min.js']) ?>"></script>
</head>
<body id="com-spwashi">
<!--    HEADER      -->
<header role="banner" class="main clearfix" id="header">
    <div id="header-wrapper" class="clearfix main-wrapper">
        <div id="logo">
            <a rel="home" href="<?= App::_()->base_url ?>">
                <div class="logo">
                    <h1 class="no-view">{{site_title}}</h1>

                    <h2>{{site_description}}</h2>
                </div>
            </a>
        </div>
        <nav class="main" id="main-nav">
            <ul id="menu-links">
                <?php /** @var  Spwashi\Model\User $user */
                if (!($user = \Spwashi\Libs\Session\Session::get('user')) || (!$user instanceof User)): ?>
                    <li class="<?= $route_name == 'spwashi_signup' ? 'active' : '' ?>"><a href="<?= Toute::generate_url('spwashi_signup') ?>">Sign up</a></li>
                    <li class="<?= $route_name == 'spwashi_login' ? 'active' : '' ?>"><a href="<?= Toute::generate_url('spwashi_login') ?>">Login</a></li>
                <?php else: ?>
                    <li class="<?= $route_name == 'spwashi_user_home' ? 'active' : '' ?>"><a href="<?= Toute::generate_url('spwashi_user_home') ?>">Home ~ <?= $user->alias ?></a></li>
                    <li class="<?= $route_name == 'spwashi_logout' ? 'active' : '' ?>"><a href="<?= Toute::generate_url('spwashi_logout') ?>">Log out</a></li>
                <?php endif; ?>
                <li class="<?= $route_name == 'spwashi_page_home' ? 'active' : '' ?>"><a href="<?= Toute::generate_url('spwashi_page_home') ?>">Topics</a></li>
            </ul>
            <!--		    CHANGE THE FORM ACTION-->
            <form action="" role="search" id="main-search-form">
                <div>
                    <input type="text" name="q" id="main-search"/>
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