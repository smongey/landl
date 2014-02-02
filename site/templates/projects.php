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
						$image = $child->project_images->first();
						if($image->width >= $image->height) { 
							$image = $child->project_images->first()->width(280);
						} else {
							$image = $child->project_images->first()->height(280);
						}

						$categories = $child->category;
					?>
					<li class="item <?php foreach($categories as $category) {  
					
						$c = $category->title;
						$c = strtolower($c);
						echo $c . ' ';
					
					} ?>">
						<a class="single" href="<?php echo "{$child->url}"?>">
							<div class="project-thumbnail">
								<h3 class="project-title"><?php echo "{$child->title}"; ?></h3>
								<img alt="" src="<?php echo "{$image->url}" ?>">
							</div>
						</a>
					</li>
					<?php } ?>

				</ul>

			</div> 
					
		</div>

<?php include("./foot.inc"); ?>