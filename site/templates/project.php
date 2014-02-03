<?php 
// Project
include("./head.inc"); 
?>

		<div class="project">
			
			<div id="container">
				<div class="textwrap">
					<div class="text">
						<span class="category"><?php foreach($page->category as $category) { echo "$category->title" . "&nbsp;&nbsp;&nbsp;"; } ?></span>
						<div>
							<h1><?php echo "$page->title"; ?></h1>
							<?php echo "$page->project_info"; ?>
						</div>
						<a href="#" class="info">Hide info</a><br>
						<a href="projects.html" class="back">Back to Projects</a>
					</div>
				</div>

				<div class="images">
					<?php foreach ($page->project_layout as $row) {
						
						$images = $row->project_images;
						$col = $row->project_columns;

						if($col == 1) {
						?>
						<div class="one">
							<img src="<?php foreach ($images as $image) { echo $image->url; }; ?>" alt="<?php echo $image->description; ?>">
							<p class="caption"><?php echo $image->description; ?></p>
						</div>

						<?php } else { ?>
						<div class="two">
							<?php foreach ($images as $image) { ?>
								<div>
									<img src="<?php echo $image->url; ?>" alt="<?php echo $image->description; ?>">
									<p class="caption"><?php echo $image->description; ?></p>
								</div>								 
							<?php }; ?>
						</div>

					<?php } } ?>
				</div>

			</div> 
					
		</div>		

<?php include("./foot.inc"); ?>