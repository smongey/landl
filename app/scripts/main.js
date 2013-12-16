require.config({

	baseUrl: '../bower_components/',

	paths: {
		jquery: 'jquery/jquery-pjax',
		raphael: 'raphael/raphael',
		localScroll: "jquery.localScroll/jquery.localScroll",
		scrollTo: "jquery.scrollTo/jquery.scrollTo",
		swipe: 'swipe/swipe',
		pjax: 'jquery-pjax/jquery.pjax'
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
		'pjax': {
			deps: ['jquery'],
			exports: 'pjax'
		}
	}
});

require(['jquery', 'raphael', 'localScroll', 'scrollTo', 'swipe', 'pjax', 'jquery-bridget/jquery.bridget', 'packery/js/packery', '../scripts/modules/slider'],
	function($, raphael, localScroll, scrollTo, swipe, pjax, bridget, packery, slider) {
	'use strict';

	$('body').addClass('hidden');

	$(document).ready(function() {
		
		$('body').delay(2000).removeClass('hidden');

		// packery for images 
		$('#container').packery({
			itemSelector: '.item',
			stamp: ".stamp",
			gutter: 60
		});


		window.mySwipe = new Swipe(document.getElementById('slider'), {
			startSlide: 0,
			speed: 1000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(index, elem) {},
			transitionEnd: function(index, elem) {}
		});

		//$('.bg').css({'transition': '1000ms'});

		$('.item').each(function() {
			var thumbHeight = $(this).height();
			var projectTitle = $('.project-title');
			$(this).find('h3').css({
				'margin-top': ((thumbHeight / 2) - $(this).find('h3').height() - 10)
			});
		});

		var slideTitlePos = $('#slider').height() / 2 - 30;

		slideTitlePosition(slideTitlePos);

		
		// // position for large images titles
		// $('.item').each(function() {
		// 	var thumbHeight = $(this).height();
		// 	var projectTitle = $('.project-title');
		// 	$(this).find('h3').css({ 'margin-top': ((thumbHeight / 2) - $(this).find('h3').height() - 10) });
		// });

		//  pjax init
		// var duration = 400;
		// $('a[data-pjax]').pjax('#pjaxContainer', {
		// 	fragment: '#pjaxContainer',
		// 	duration: duration
		// }).bind('click', function(e) {
		// 	e.preventDefault();
		// });

		// Scroll to top and down again
		// $('a[href*=#]:not([href=#])').click(function() {
		// 	var target = $(this.hash);
		// 	if ($('#first').hasClass('fixed-top')) {
		// 		$('#intro').css({
		// 			'margin-top': 0
		// 		});
		// 		$('#page').animate({
		// 			'margin-top': $(window).height()
		// 		}, 1000);
		// 	} else {
		// 		$('html,body').animate({
		// 			scrollTop: target.offset().top + 1
		// 		}, 500);
		// 	}
		// 	return false;
		// });

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
					$('div.bg').css({'background-position-y' : '0' });
					

					slideTitlePosition(slideTitlePos);

				});

			} else {

				duh.preventDefault();
				$('#intro').animate({ 'margin-top': 0 }, 400);
				$('#page').animate({ 'margin-top': $(window).height() }, 400);
				$('div.bg').css({'background-position-y' : '50%' });
				
				$('#nav').fadeOut(300, function(){
					$(this).removeClass().fadeIn(500);
					$('a.introToggle').removeClass('locked');
				});

				var slideTitlePos = $('#slider').height() / 2 - 30;
				scrollIntro();
				slideTitlePosition(slideTitlePos);



				
				// // $('#intro').animate({ 'margin-top': 0 }, 400);
				// // $('#page').animate({ 'margin-top': $(window).height() }, 400);
				// $('div.bg').css({'background-position-y' : '50%' });
				
				// $('#nav').fadeOut(300, function(){
				// 	$(this).removeClass().fadeIn(500);
				// 	$('a.introToggle').removeClass('locked');
				// });
				// //$(window).scrollTo(0, 300);
				
				// var slideTitlePos = $('#slider').height() / 2 - 30;
				// scrollIntro();
				// slideTitlePosition(slideTitlePos);

			}



		}



	});


	// pjax bind
/*	var duration = 400;
	$('#pjaxContainer').on('pjax:start', function() {

		$(this).fadeOut(duration);
		$('#second').fadeOut();

	}).on('pjax:end', function() {

		$(this).fadeIn(duration);

	}).on('pjax:success', function() {

		// packery doesn't work on reload
		$('.item').hide();
		$('#second').addClass('inline').fadeIn();
		
		// initialize Packery after all images have loaded
		setTimeout(function() {
			// $('#container').packery({
			//     itemSelector: '.item',
			//     stamp: ".stamp",
			//     gutter: 60,
			// });
			$(window).trigger('resize');
			$('.item').show();
		}, 1000);

	});*/

	$(window).on('resize', function() {
		var slideTitlePos = $('#slider').height() / 2 - 30;
		slideTitlePosition(slideTitlePos);
	});


}); // end require



// function slideTitlePosition() {
// 	var sliderHeight = $('#slider').height() / 2 - 30;
// 	var slideTitle = $('.slide-title');
// 	$(slideTitle).css({
// 		'margin-top': sliderHeight
// 	});
// }

	

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
				
			}

		} else if ($(window).scrollTop() > 50) { // if my body scrolls more than 10 give my main nav a relative position
			
			$('#nav').addClass('on');

		} else {

			$('#nav').removeClass('on');
		}
	});
}

