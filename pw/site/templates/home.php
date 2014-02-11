<?php
// Homepage
include("./head.inc");
?>

		<div class="home">
			<div id="container">

				<ul>
					<?php
					$num = 0;

				 	foreach($page->categories_home as $category) { 
						$num = $num + 1;
						$img = $category->category_image;

						echo "<li class='item w".$num."'>";
						echo "<div class='project-thumbnail'>";
						echo "	<h3 class='project-title'>" . $img->description . "</h3><img alt='' src='" . $img->url . "'>";
						echo "</div></li>";

					} ?>

				</ul>

			</div>

		</div>

<?php include("./foot.inc"); ?>
