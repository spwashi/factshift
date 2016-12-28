<?php
/**
 * User: sam
 * Date: 6/13/15
 * Time: 6:28 PM
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
		<section class="subsection">
			<header>
				<h3>This is the title of the section</h3>
			</header>
			<p>This is the description of the section</p>
		</section>
		<section class="subsection">
			<header>
				<h3>This is another section</h3>
				<h5>A subtitle</h5>
			</header>

			<p>The content of the second section</p>
			<section class="subsection">
				<header>
					<h3>A section in a section</h3>
					<h5>Section Subtitle</h5>

				</header>

				<p>Content</p>
			</section>
		</section>
	</section>
</article>