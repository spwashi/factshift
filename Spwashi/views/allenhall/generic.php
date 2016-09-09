<?php
/**
 * User: Sam Washington
 * Date: 6/1/16
 * Time: 11:34 AM
 */

?>
<article id="main" class="module">
	<header>
		<h1 class="title">
			{{title}}
		</h1>

		<h2 class="subtitle"> {{subtitle}} </h2>
	</header>
	<section class="content">
		<section class="">
			<button id="select-allenotes">Select All</button>
			<br>
			<br>
			<hr>
			<br>
			<header>
				<h3>{{message_header}}</h3>
			</header>
			<div id="allenotes" class="content">
				{{content}}
			</div>
		</section>
	</section>
</article>
<style>
	#main .content #allenotes.content * {
		background: white;
	}


	#main button {
		background: #eeeeee;
	}
</style>
<script>
	function SelectText(element) {
		var doc    = document
			, text = doc.getElementById(element)
			, range, selection
			;
		if (doc.body.createTextRange) {
			range = document.body.createTextRange();
			range.moveToElementText(text);
			range.select();
		} else if (window.getSelection) {
			selection = window.getSelection();
			range     = document.createRange();
			range.selectNodeContents(text);
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
	document.getElementById('select-allenotes').onclick = function () {
		SelectText('allenotes');
	}
</script>