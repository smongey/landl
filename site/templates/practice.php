<?php 
// Practice
include("./head.inc"); 
?>

		<div class="practice">
			<div id="container">
				<nav>
					<ul class="menu">
						<li><a href="#studio">Studio</a></li>
						<li><a href="#people">People</a></li>
						<li><a href="#awards">Awards</a></li>
						<li><a href="#publications">Publications</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</nav>

				
				<div id="studio">
					<div class="left">
						<?php echo $page->studio_info; ?>
					</div>	
					<div class="right">
						<?php foreach($page->studio_image as $image) { echo "<img src='$image->url' alt='$image->description'>"; } ?>
					</div>
				</div>

				<div id="people">
					<?php foreach($page->people as $person) { 
						echo "<div class='person'>";
						echo "<h4>{$person->person_name}</h4>";
						echo "{$person->person_info}";
						echo "</div>";
					} ?>
				</div>

				<div id="awards">
					<ul>
					<?php foreach($page->awards as $award) { 
						echo "<li><span>{$award->award_year}</span>{$award->award_title}</li>";
					} ?>
					</ul>
				</div>

				<div id="publications">
					<?php foreach($page->publications as $press) { 
						echo "<div class='press'>";
						echo "<h4>{$press->press_date}<br>{$press->press_publication}</h4>";
						echo "{$press->press_info}";
						echo "</div>";
					} ?>
				</div>

				<div id="contact">
					<?php
					foreach($page->map as $map) {  
						foreach($map->map_image as $image) { echo "<img src='$image->url' alt='$image->description'>"; } ?>
						<br/>
						<a href="<?php echo $map->map_link; ?>">On Google Maps</a>
					<?php } ?>
				</div>

			</div> 
		</div>

<?php include("./foot.inc"); ?>