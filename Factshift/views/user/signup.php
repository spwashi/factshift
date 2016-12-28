<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:28 PM
 */
use Sm\Core\App;

$nonce     = App::_()->IoC->session->generate_nonce('frm-user_signup');
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
        <form class="aligned" method="post" action="" autocomplete="on" id="frm-user_signup">
            <input name="frm-su-n" type="hidden" value="<?= $nonce ?>" />
            
            <div class="control_group">
                <label for="first_name">First Name:</label>
                <input type="text" id="first_name" name="first_name" placeholder="First Name"
                       value="<?= isset($post_data['first_name']) ? $post_data['first_name'] : null ?>" />
                <span class="error" id="first_name-error">{{message_first_name}}</span>
            </div>
            
            <div class="control_group">
                <label for="last_name">Last Name:</label>
                <input type="text" id="last_name" name="last_name" placeholder="Last Name"
                       value="<?= isset($post_data['last_name']) ? $post_data['last_name'] : null ?>" />
                <span class="error" id="last_name-error">{{message_last_name}}</span>
            </div>
            
            <div class="control_group">
                <label for="alias">Username:</label>
                <input type="text" id="alias" name="alias" placeholder="Username"
                       value="<?= isset($post_data['alias']) ? $post_data['alias'] : null ?>" />
                <span class="error" id="alias-error">{{message_alias}}</span>
            </div>
            
            <div class="control_group">
                <label for="email">Email Address:</label>
                <input type="text" id="email" name="email" placeholder="Email Address"
                       value="<?= isset($post_data['email']) ? $post_data['email'] : null ?>" />
                <span class="error" id="email-error">{{message_email}}</span>
            </div>
            
            <div class="control_group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password"
                       value="<?= isset($post_data['password']) ? $post_data['password'] : null ?>" />
                <span class="error" id="password-error">{{message_password}}</span>
            </div>
            
            <div class="control_group">
                <label for="password_verify">Verify Password:</label>
                <input type="password" id="password_verify" name="password_verify" placeholder="Verify Password" />
                <span class="error" id="password_verify-error">{{message_password_verify}}</span>
            </div>
            <div class="control_group">
                <label for="f-signup-submit" class="invisible">Submit</label>
                <button id="f-signup-submit" type="submit">Submit</button>
            </div>
        </form>
    </section>
</article>