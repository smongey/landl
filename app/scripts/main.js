require.config({

	//baseUrl: '../bower_components/',

	paths: {
		jquery: '../bower_components/jquery/jquery',
		raphael: '../bower_components/raphael/raphael',
		localScroll: "../bower_components/jquery.localScroll/jquery.localScroll",
		scrollTo: "../bower_components/jquery.scrollTo/jquery.scrollTo",
		swipe: '../bower_components/swipe/swipe',
		isotope: '../bower_components/isotope/jquery.isotope.min'
	},
	shim: {
		'localScroll': {
			deps: ['jquery', 'scrollTo'],
			exports: 'localScroll'
		},
		'scrollTo': {
			deps: ['jquery'],
			exports: 'scrollTo'
		},
		'isotope': {
			deps: ['jquery'],
			exports: 'isotope'
		}
	}
});

require(['jquery', 'raphael', 'localScroll', 'scrollTo', 'swipe', 'isotope', '../scripts/modules/slider'],
	function($, raphael, localScroll, scrollTo, swipe, isotope, slider) {
	'use strict';

	$('body').addClass('hidden');

	$(document).ready(function() {
		
		$('body').delay(2000).removeClass('hidden');

		//isotope for images 
		$('#container').isotope({
			itemSelector: '.item',
			masonry: {
				gutterWidth: 60,
				columnWidth: 100
				//cornerStampSelector: '.stamp'
			}
		});


		// var $container = $('#container')
		// // initialize Isotope
		// $container.isotope({
		//   // options...
		//   resizable: false, // disable normal resizing
		//   // set columnWidth to a percentage of container width
		//   masonry: { columnWidth: $container.width() / 5 }
		// });

		// update columnWidth on window resize
		// $(window).smartresize(function(){
		//   $container.isotope({
		//     // update columnWidth to a percentage of container width
		//     masonry: { columnWidth: $container.width() / 5 }
		//   });
		// });


		window.mySwipe = new Swipe(document.getElementById('slider'), {
			startSlide: 0,
			speed: 1000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(index, elem) {},
			transitionEnd: function(index, elem) {}
		});


		$('.item').each(function() {
			var thumbHeight = $(this).height();
			var projectTitle = $('.project-title');
			$(this).find('h3').css({
				'margin-top': ((thumbHeight / 2) - $(this).find('h3').height() - 10)
			});
		});

		var slideTitlePos = $('#slider').height() / 2 - 30;

		slideTitlePosition(slideTitlePos);

	});

	scrollIntro();

	$('a.introToggle').click(function(duh){

		//if the button doesn’t have a class of locked scroll down the window height

		if(!$(this).hasClass('locked')) {

			duh.preventDefault();
			$(window).scrollTo('#page', 400);

		} else {

			if (window.pageYOffset > 0) {

				duh.preventDefault();
				$(window).scrollTo('#page', 400, function(){

					
					$('#nav').fadeOut(300, function(){
						$(this).removeClass().fadeIn(500);
						$('a.introToggle').removeClass('locked');
					});
					//$(window).scrollTo(0, 300);
					

					var slideTitlePos = $('#slider').height() / 2 - 30;
					scrollIntro();
					$('#intro').animate({ 'margin-top': 0 }, 400);
					$('#page').animate({ 'margin-top': $(window).height() }, 400);
					$('ul#second').fadeOut(100);
					$('div.bg').css({'background-position-y' : '0' });
					slideTitlePosition(slideTitlePos);

				});

			} else {

				duh.preventDefault();
				$('#intro').animate({ 'margin-top': 0 }, 400);
				$('#page').animate({ 'margin-top': $(window).height() }, 400);
				$('div.bg').css({'background-position-y' : '0' });
				$('ul#second').fadeOut(100);
				$('#nav').fadeOut(300, function(){
					$(this).removeClass().fadeIn(500);
					$('a.introToggle').removeClass('locked');
					
				});

				var slideTitlePos = $('#slider').height() / 2 - 30;
				scrollIntro();
				slideTitlePosition(slideTitlePos);

			}

		}

	});

	$('#first li a:not(:last-child)').click(function(){

		$(window).scrollTo('#page', 400);

	});

	$(window).on('resize', function() {
		var slideTitlePos = $('#slider').height() / 2 - 30;
		slideTitlePosition(slideTitlePos);
	});


}); // end require


// Place the Slide Title in the middle
function slideTitlePosition(elem) {
	$('.bg h2').css({
		'margin-top': elem
	});
}


// on scroll
var scrollIntro = function(){
	$(window).on('scroll', function() {
		
		var pageOffset = window.pageYOffset;
		var slideTitlePos = $('#slider').height() / 2 - 30;


		$('.bg').css({'background-position-y' : -(pageOffset / 5) });	
		slideTitlePosition(slideTitlePos + (pageOffset / 10));

		//if nav has class of top and window offset is more than 0 the make 

		if (window.pageYOffset >= $('#page').offset().top) {

			if(!$('#nav').hasClass('top')) {

				$(window).off('scroll');
				$('#intro').animate({ 'margin-top': -($(window).height()) }, 0);
				$('#page').animate({ 'margin-top': 0 }, 0, function() {
					$(window).scrollTo(0, 0);
				});
				$('#nav').removeClass().addClass('top');
				$('a.introToggle').addClass('locked');
				$('#second').fadeIn(300);
				
			}

		} else if ($(window).scrollTop() > 50) { // if my body scrolls more than 10 give my main nav a relative position
			
			$('#nav').addClass('on');

		} else {

			$('#nav').removeClass('on');
		}
	});
}

