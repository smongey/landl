<?php 
// News
include("./head.inc"); 
?>

		<div class="news">
			
			<div id="container">

				<div class="full">

					<?php 
					$news = $pages->get(1011); 
					$first = $news->children->first();
					$img = $first->news_image->first();
					$name = $first->news_author->name;
					$u = $users->get($name); 
					$photo = $u->person_photo;
					?>

					<div class="image">
						<h2><?php echo "{$first->title}"; ?></h2>
						<img src="<?php echo "{$img->url}"; ?>" alt=''>
					</div>
					<div class="text">
						<div class="profile">
							<img src="<?php echo "{$photo->url}" ?>" alt="">
							<p>Published on <span><?php echo date("j M Y", $first->created); ?></span> by <span><?php echo "{$first->news_author->name}"; ?></span></p>
						</div>
						<div class="intro">
							<p><?php echo "{$first->news_excerpt}"; ?></p>
							<a href="<?php echo "{$first->url}"; ?>" class="more"></a>
						</div>
					</div>
				</div>


				<?php 
				$num = 0;
				$posts = $pages->find('template=entry, start=2'); 
					

					foreach($posts as $post) {
						$name = $post->news_author->name;
						$u = $users->get($name);
						$profile = $u->person_photo; 
						
						$num = $num + 1;
						
						if($num == 1) {
						
							// dont show the first post as it's already above

						} elseif ($num % 2 == 0) { ?>

							<div class="left">
								<div class="text">
									<span class="date"><?php echo date("j M Y", $post->created); ?></span>
									<img src="<?php echo "{$profile->url}" ?>" alt="">
									<h3><?php echo $post->title ?></h3>
									<p><?php echo $post->news_excerpt ?></p>
									<a href="<?php echo "{$post->url}" ?>" class="more"></a>
								</div>
								<div class="image">
									<img src="<?php echo $post->news_image->first()->size(540, 400)->url; ?>" alt="">
								</div>
							</div>
							
						<?php } else { ?>

							<div class="right">
								<div class="image">
									<img src="<?php echo $post->news_image->first()->size(540, 400)->url; ?>" alt="">
								</div>
								<div class="text">
									<span class="date"><?php echo date("j M Y", $post->created); ?></span>
									<img src="<?php echo "{$profile->url}" ?>" alt="">
									<h3><?php echo $post->title ?></h3>
									<p><?php echo $post->news_excerpt ?></p>
									<a href="<?php echo "{$post->url}" ?>" class="more"></a>
								</div>
							</div>

						<?php } } ?>

			</div> 
					
		</div>

<?php include("./foot.inc"); ?>