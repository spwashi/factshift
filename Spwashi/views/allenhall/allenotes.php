<?php
/**
 * User: sam
 * Date: 9/8/16
 * Time: 2:40 PM
 */
use Sm\Router\Toute;
use Spwashi\Libs\Session\Session;

$nonce     = Session::generate_nonce('frm-allenotes');
$post_data = isset($post_data) ? $post_data : [];
$result    = isset($result) ? $result : [];

$print = $print ?? false;

?>
<style>#main a { color: #028482; font-weight: bold; border-bottom: thin solid #028482; }</style>
<article id="main" class="module">
	<header>
		<h1 class="title">
			{{title}}
		</h1>
	</header>
	<section class="content">
		<div style="color: #005555;padding-bottom: 10px;margin: 0 0 16px 0;font-style: italic;border-bottom: thin solid #ccc;">*Note: Right now there is an error with programs with the same name being submitted more than once</div>
		<form class="aligned" method="post" action="" autocomplete="on" id="frm-allenotes">
			<input name="frm-a-n" type="hidden" value="<?= $nonce ?>"/>
			<div class="control-group">
				<label for="weekly_allenotes">Weekly Allenotes:</label>
				<textarea name="weekly_allenotes" id="weekly_allenotes" cols="30" rows="10" placeholder="Allenotes submitted through the form (leave blank if no changes)"><?= isset($post_data['weekly_allenotes']) ? $post_data['weekly_allenotes'] : null ?></textarea>
				<span class="error" id="weekly_allenotes-error">{{message_weekly_allenotes}}</span>
			</div>
			<div class="control-group">
				<label for="regular_allenotes">Regular Programs:</label>
				<textarea name="regular_allenotes" id="regular_allenotes" cols="30" rows="10" placeholder="Regularly Occurring Allenotes (leave blank if no changes)"><?= isset($post_data['regular_allenotes']) ? $post_data['regular_allenotes'] : null ?></textarea>
				<span class="error" id="regular_allenotes-error">{{message_regular_allenotes}}</span>
			</div>
			<div class="control-group">
				<label for="f-allenotes-submit" class="invisible">Submit</label>
				<button id="f-allenotes-submit" type="submit">Submit</button>
			</div>
		</form>
	</section>
	<?php if ($print): ?>
		<div class="clearfix" style="min-height: 150px; border-top: thin solid #ccc;">
			<?php if (count($output ?? [])): ?>
				<div style="padding: 0 0 0 50px;font-style: italic;font-size: .75em; width: 50%;float: right;">
					<?php foreach ($output as $v): ?>
						<div><?= $v ?></div>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>
			<div class="content clearfix" style="float: left;width: 50%;padding-top: 50px;text-align: center;">
				<a target="_blank" href="<?= Toute::generate_url('allenotes') ?>">Finished Allenotes</a>
			</div>
		</div>
	<?php endif; ?>
</article>