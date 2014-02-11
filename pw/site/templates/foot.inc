		<footer>
			<div id="footer">
				<p><a id="facebook" href="<?php $home = $pages->get('/'); echo $home->facebook_link; ?>">Facebook</a><a id="twitter" href="<?php echo $home->twitter_link; ?>">Twitter</a><a id="vimeo" href="<?php echo $home->vimeo_link; ?>">Vimeo</a><?php echo $home->address; ?></p>

				<p><a href="tel:<?php echo $home->phone; ?>">T. +<?php echo $home->phone; ?></a>&nbsp;&nbsp;&nbsp;<a href="mailto:<?php echo $home->email_address; ?>">E. <?php echo $home->email_address; ?></a></p>

			</div>
		</footer>


	</section><!-- .page -->
	<script data-main="<?php echo $config->urls->templates?>dist/scripts/8640302b.main" src="<?php echo $config->urls->templates?>dist/bower_components/requirejs/require.js"></script>
</body>
</html>