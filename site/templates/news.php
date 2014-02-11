<?php 
// News
include("./head.inc"); 
?>

		<div class="news">
			
			<div id="container">

				<?php 
				$num = 0;
				$posts = $pages->find('template=entry'); 
					

					foreach($posts as $post) {
						$name = $post->news_author->name;
						$u = $users->get('$name');
						$profile = $u->person_photo;

						echo $u;

						$mainprofile = $u->person_photo;
						// $mainprofile = $mainprofile->size(100,100);

						$img = $post->news_image->first();
						// $img = $img->size(540,400);
						
						$main = $post->news_image->first();
						// $main = $main->size(1000,500);

						$num = $num + 1;
						if($num == 1) { ?>
									
							<div class="full">
								<div class="image">
									<h2><?php echo "{$post->title}"; ?></h2>
									<img src="<?php echo "{$main->url}"; ?>" alt=''>
								</div>
								<div class="text">
									<div class="profile">
										<img src="<?php echo "{$mainprofile->url}" ?>" alt="">
										<p>Published on <span><?php echo date("j M Y", $post->created); ?></span> by <span><?php echo "{$post->news_author->name}"; ?></span></p>
									</div>
									<div class="intro">
										<p><?php echo "{$post->news_excerpt}"; ?></p>
										<a href="<?php echo "{$post->url}"; ?>" class="more"></a>
									</div>
								</div>
							</div>

						<?php } elseif ($num % 2 == 0) { ?>

							<div class="left">
								<div class="text">
									<span class="date"><?php echo date("j M Y", $post->created); ?></span>
									<img src="<?php echo "{$profile->url}" ?>" alt="">
									<h3><?php echo $post->title; ?></h3>
									<p><?php echo $post->news_excerpt ?></p>
									<a href="<?php echo $post->url ?>" class="more"></a>
								</div>
								<div class="image">
									<img src="<?php echo "{$img->url}" ?>" alt="">
								</div>
							</div>
							
						<?php } else { ?>

							<div class="right">
								<div class="image">
									<img src="<?php echo "{$img->url}" ?>" alt="">
								</div>
								<div class="text">
									<span class="date"><?php echo date("j M Y", $post->created); ?></span>
									<img src="<?php echo "{$profile->url}" ?>" alt="">
									<h3><?php echo $post->title; ?></h3>
									<p><?php echo $post->news_excerpt ?></p>
									<a href="#" class="more"></a>
								</div>
							</div>

						<?php } 
					} ?>

			</div> 
					
		</div>

<?php include("./foot.inc"); ?>