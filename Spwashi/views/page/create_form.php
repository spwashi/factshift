<?php
/**
 * User: sam
 * Date: 6/16/15
 * Time: 9:29 PM
 *
 * Form to create a page
 */
\Spwashi\Libs\Session\Session::require_user_or_redirect($user);
$context_array = $user->get_available_user_contexts();
$user_contexts = isset($context_array['users']) ? $context_array['users'] : [ ];
/** @var array $post_data */
$post_data = isset($post_data) ? $post_data : [ ];
$result = isset($result) ? $result : [ ];
/*#--#*/
$nonce = \Sm\Form\Form::generate_nonce('frm-page_create');
?>
<article id="main" class="module">
	<header>
		<h1 class="title">
			{{title}}
		</h1>
		<h2 class="subtitle"> {{subtitle}} </h2>
	</header>
	<section class="content">
		<form class="aligned" method="post" action="" autocomplete="on" id="frm-page_create">
			<input name="frm-cp-n" type="hidden" value="<?= $nonce ?>" />
			<div class="control-group">
				<label for="title">Page Title:</label>
				<input type="text" id="title" name="title" placeholder="Page Title"
				       value="<?= isset($post_data['title']) ? $post_data['title'] : '' ?>" />
				<span class="error" id="title-error">{{message_title}}</span>
			</div>
			
			<div class="control-group">
				<label for="subtitle">Subtitle:</label>
				<input type="text" id="subtitle" name="subtitle" placeholder="Page Subtitle"
				       value="<?= isset($post_data['subtitle']) ? $post_data['subtitle'] : '' ?>" />
				<span class="error" id="subtitle-error">{{message_subtitle}}</span>
			</div>

			<div class="control-group" hidden>
				<label for="f-generate_alias">Generate Slug For Me:</label>
				<input type="checkbox" id="f-generate_alias" name="f-generate_alias" checked value="1" />
				<span class="error" id="f-generate_alias-error">{{message_f-generate_alias}}</span>
			</div>

			<div class="control-group" hidden>
				<label for="alias">Slug:</label>
				<input type="text" id="alias" name="alias" placeholder="Page Slug" />
				<span class="error" id="alias-error">{{message_alias}}</span>
			</div>
			
			<div class="control-group">
				<label for="description">Description:</label>
				<textarea name="description" id="description" cols="30" rows="10" placeholder="Description"><?= isset($post_data['description']) ? $post_data['description'] : '' ?></textarea>
				<span class="error" id="description-error">{{message_description}}</span>
			</div>

			<div class="control-group" hidden>
				<label for="context">Namespace:</label>
				<select name="context" id="context">
					<?php foreach ($user_contexts as $index => $_context): ?>
						<option value="<?= $_context['alias'] ?>"><?= $_context['alias'] ?></option>
					<?php endforeach; ?>
				</select>
				<span class="error" id="context-error">{{message_context}}</span>
			</div>
			
			<div class="control-group">
				<label for="f-create_page-submit" class="invisible">Submit</label>
				<button id="f-create_page-submit" type="submit">Submit</button>
			</div>
		</form>
	</section>
</article>