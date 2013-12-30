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

		isotopeLoad('.item', 60, 100);
		sliderLoad('slider', 500);
		scrollIntro();

	}); //end doc ready


	$('a.introToggle').click(function(duh){
		duh.preventDefault();
		

		if(!$(this).hasClass('locked')) {
			
			$(window).scrollTo('#page', 400);

		} else {

			if (window.pageYOffset > 0) {

				
				$(window).scrollTo('#page', 400, function(){

					
					$('#nav').fadeOut(300, function(){
						$(this).removeClass().fadeIn(500);
						$('a.introToggle').removeClass('locked');
					});
					

					scrollIntro();
					$('#intro').animate({ 'margin-top': 0 }, 400);
					$('#page').animate({ 'margin-top': $(window).height() }, 400);
					$('ul#second').fadeOut(100);
					$('div.bg').css({'background-position-y' : '0' });
					
					$('#first li:not(:last-child) a').removeClass('active');
				});

			} else {

				
				$('#intro').animate({ 'margin-top': 0 }, 400);
				$('#page').animate({ 'margin-top': $(window).height() }, 400);
				$('ul#second').fadeOut(100);
				$('div.bg').css({'background-position-y' : '0' });
				
				$('#nav').fadeOut(300, function(){
					$(this).removeClass().fadeIn(500);
					$('a.introToggle').removeClass('locked');
					
				});


				scrollIntro();
				slideTitlePosition();
				$('#first li:not(:last-child) a').removeClass('active');

			}
		}
	});


	$('#first li:not(:last-child) a, a.logo').click(function(e){
		e.preventDefault();
		var address = $(this).attr('href');
		console.log(address);
		history.pushState(address, '', address);
		$('#first li:not(:last-child) a').removeClass('active');
		
		$(this).addClass('active');


		// This bit if the user clicks the home link
		if(address.indexOf('/') > -1) { 

			$(window).scrollTo(0, 300, function(){
				$('#page > *').fadeOut(500, function(){
					$('#page').hide().load(address + ' #page > *', function(){
						
						$(this).fadeIn('slow');
						isotopeLoad('.item', 60, 100);

						$('#second').fadeOut(300);
						
					});
				});
			});
			$('#second').addClass('home').fadeIn(300);


		// This bit if the user clicks any of the other page links
		} else {

			//If they click to go to projects change the secondary nav up
			if(address.indexOf('projects') > -1) {
				$('#second').hide().removeClass('home');
			}

			$(window).scrollTo('#page', 300, function(){
				$('#page > *').fadeOut(500, function(){
					$('#page').hide().load(address + ' #page > *', function(){
						$(this).fadeIn('slow');
						if(!(address.indexOf('projects') > -1)) {
							$('#second').fadeOut(300);
						} else {
							$('#second').fadeIn(300);
						}
					});
				});
			});

		}

	});


	$(window).on('resize', function() {
		slideTitlePosition();
	});


}); // end require


var isotopeLoad = function(item, gutter, column){
	//isotope
	$('#container').isotope({
		itemSelector: item,
		masonry: {
			gutterWidth: gutter,
			columnWidth: column
			//cornerStampSelector: '.stamp'
		}
	});
	//centre titles on hover
	$(item).each(function() {
		var thumbHeight = $(this).height();
		var projectTitle = $('.project-title');
		$(this).find('h3').css({
			'margin-top': ((thumbHeight / 2) - $(this).find('h3').height() - 10)
		});
	});
};


var sliderLoad = function(id, speed){
	window.mySwipe = new Swipe(document.getElementById(id), {
		startSlide: 0,
		speed: speed,
		continuous: true,
		disableScroll: false,
		stopPropagation: false,
		callback: function(index, elem) {},
		transitionEnd: function(index, elem) {}
	});

	slideTitlePosition();
};

// Place the Slide Title in the middle
var slideTitlePosition = function() {
	var halfHeight = $('#slider').height() / 2 - 30;
	$('.bg h2').css({
		'margin-top': halfHeight
	});
};

// Scroll Introduction
var scrollIntro = function(){

	// if () {

	// } else {

	// }

	$(window).on('scroll', function() {
		
		var pageOffset = window.pageYOffset;
		var slideTitlePos = $('#slider').height() / 2 - 30;


		$('.bg').css({'background-position-y' : -(pageOffset / 5) });	
		slideTitlePosition(/*slideTitlePos + (pageOffset / 10)*/);

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
				var address = location.pathname;
				if(address.indexOf('/') > -1) {
					$('#second').fadeIn(300);
				}
			}

		} else if ($(window).scrollTop() > 50) { // if my body scrolls more than 10 give my main nav a relative position
			
			$('#nav').addClass('on');

		} else {

			$('#nav').removeClass('on');
		}
	});
};

