<?php 
// Entry
include("./head.inc"); 
?>

		<div class="news">
			
			<div id="container">

				<div class="full">

					<?php 

					$name = $page->news_author->name;
					$u = $users->get($name); 
					
					$profile = $u->person_photo;
					$profile = $mainprofile->size(100,100);


					$main = $page->news_image->first();
					$main = $main->size(1000,500);


					?>

					<div class="image">
						<h2><?php echo "{$page->title}"; ?></h2>
						<img src="<?php echo "{$img->url}"; ?>" alt=''>
					</div>
					<div class="text">
						<div class="profile">
							<img src="<?php echo "{$profile->url}" ?>" alt="">
							<p>Published on <span><?php echo date("j M Y", $page->created); ?></span> by <span><?php echo "{$page->news_author->name}"; ?></span></p>
						</div>
						<div class="intro">
							<?php echo "{$page->news_content}"; ?>
						</div>
					</div>
				</div>
			</div> 
					
		</div>

<?php include("./foot.inc"); ?>