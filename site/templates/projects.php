<?php 
// Projects
include("./head.inc"); 
?>

		<div class="projects">
			
			<div id="container">

				<ul>

				<?php 
				$projects = $pages->get(1009); 
				$children = $projects->children;
					foreach($children as $child) {


						$categories = $child->category;
						
					?>
					<li class="item <?php foreach($categories as $category) {  
					
						$c = $category->title;
						$c = strtolower($c);
						$c = str_replace(' ', '', $c);
						echo $c . ' ';
					
					} ?>">
						<a class="single" href="<?php echo "{$child->url}"?>">
							<div class="project-thumbnail">
								<h3 class="project-title"><?php echo "{$child->title}"; ?></h3>

								<?php

								$first = true;
								foreach ( $child->project_layout as $image ) {
									if ( $first ) {
										$img = $image->project_images->first();

										if ($img->width >= $img->height) { 
											$img = $img->width(280);
										} else {
											$img = $img->height(280);
										}

										echo '<img src="' . $img->url . '" alt="' . $thumb->description . '">';
										$first = false;
									} else {
									}
								}

								?>
							</div>
						</a>
					</li>
					<?php } ?>

				</ul>

			</div> 
					
		</div>

<?php include("./foot.inc"); ?>