<?php 
// Entry
include("./head.inc"); 
?>

		<div class="news">
			
			<div id="container">

				<div class="full">

					<?php 

					$img = $page->news_image->size(1000,500);
					$name = $page->news_author->name;
					$u = $users->get($name); 
					$photo = $u->person_photo->size(100,100);

					?>

					<div class="image">
						<h2><?php echo "{$page->title}"; ?></h2>
						<img src="<?php echo "{$img->url}"; ?>" alt=''>
					</div>
					<div class="text">
						<div class="profile">
							<img src="<?php echo "{$photo->url}" ?>" alt="">
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