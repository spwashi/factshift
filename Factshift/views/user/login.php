<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:28 PM
 */

use Factshift\Core\Factshift;

$Session   = Factshift::_()->IoC->session;
$nonce     = $Session->generate_nonce('frm-user_login');
$post_data = isset($post_data) ? $post_data : [ ];
$result    = isset($result) ? $result : [ ];
?>
<article id="main" class="module">
    <header>
        <h1 class="title">
            {{title}}
        </h1>
    </header>
    <section class="content">
        <form class="aligned" method="post" action="" autocomplete="on" id="frm-user_login">
            <input id="frm-li-n" name="frm-li-n" type="hidden" value="<?= $nonce ?>" />
            {{message}}
            <div class="control_group">
                <label for="alias">Username:</label>
                <input type="text" id="alias" name="alias" placeholder="Username or Email"
                       value="<?= isset($post_data['alias']) ? $post_data['alias'] : null ?>" />
                <span class="error" id="alias-error">{{message_alias}}</span>
            </div>
            
            <div class="control_group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" />
                <span class="error" id="password-error">{{message_password}}</span>
            </div>
            
            <div class="control_group">
                <label for="f-login-submit" class="invisible">Submit</label>
                <button id="f-login-submit" type="submit">Submit</button>
            </div>
        </form>
    </section>
</article>