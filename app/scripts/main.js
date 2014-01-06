require.config({

	//baseUrl: '../bower_components/',

	paths: {
		jquery: '../bower_components/jquery/jquery',
		raphael: '../bower_components/raphael/raphael',
		localScroll: "../bower_components/jquery.localScroll/jquery.localScroll",
		scrollTo: "../bower_components/jquery.scrollTo/jquery.scrollTo",
		swipe: '../bower_components/swipe/swipe',
		isotope: '../bower_components/isotope/jquery.isotope.min',
		waypoints: '../bower_components/jquery-waypoints/waypoints.min'
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
		},
		'waypoints': {
			deps: ['jquery'],
			exports: 'waypoints'
		}
	}
});

require(['jquery', 'raphael', 'localScroll', 'scrollTo', 'swipe', 'isotope', 'waypoints', '../scripts/modules/slider'],
	function($, raphael, localScroll, scrollTo, swipe, isotope, waypoints, slider) {
	'use strict';

	$('body').addClass('hidden');

	$(document).ready(function() {
		
		// HOMEPAGE
		if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://smongey.github.io/landl/') {

			$('body').delay(2000).removeClass('hidden');
			isotopeLoad('.item', 60, 100);
		
		// PROJECTS
		} else if (location.pathname.indexOf('projects') > -1) {

			$(window).scrollTo('#page', 0, function(){

				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.introToggle').removeClass('locked');
				});
				
				$('#intro').animate({ 'margin-top': 0 }, 0);
				$('#page').animate({ 'margin-top': $(window).height() }, 0);
				$('#second').fadeOut(0);
				$('div.bg').css({'background-position-y' : '0' });
				$('#first li:not(:last-child) a').removeClass('active');
				isotopeLoad('.item', 60, 100);
				$('body').removeClass('hidden');
				$('#second').removeClass('home').fadeIn(0);
				$('#first li:first-child a').addClass('active');

			});

		// PRACTICE
		} else if (location.pathname.indexOf('practice') > -1) {

			$(window).scrollTo('#page', 0, function(){

				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.introToggle').removeClass('locked');
				});
				
				$('#intro').animate({ 'margin-top': 0 }, 0);
				$('#page').animate({ 'margin-top': $(window).height() }, 0);
				$('div.bg').css({'background-position-y' : '0' });
				$('#first li:not(:last-child) a').removeClass('active');
				$('body').removeClass('hidden');
				$('.practice ul.menu').fadeIn(0);
				$('#first li:nth-child(2) a').addClass('active');
				practiceMenu();

			});

		// NEWS
		} else if (location.pathname.indexOf('news') > -1) {

			console.log('news');

		}

		sliderLoad('slider', 500);
		scrollIntro();


	}); //end doc ready



	$('a.introToggle').click(function(e){
		e.preventDefault();


		// AT PAGE
		if ($(this).hasClass('locked')) {
			
			if (window.pageYOffset > 0) {
				console.log('yay');
				$(window).scrollTo('#page', 400, function(){

					$('#nav').fadeOut(300, function(){
						$(this).removeClass().fadeIn(500);
						$('a.introToggle').removeClass('locked');
					});
					
					scrollIntro();
					$('#intro').animate({ 'margin-top': 0 }, 400);
					$('#page').animate({ 'margin-top': $(window).height() }, 400);
					$('#second').fadeOut(100);
					$('.practice ul.menu').fadeOut(100);
					$('div.bg').css({'background-position-y' : '0' });
					
				});

			} else {

				console.log('nay');
				$('#intro').animate({ 'margin-top': 0 }, 400);
				$('#page').animate({ 'margin-top': $(window).height() }, 400);
				$('#second').fadeOut(100);
				$('.practice ul.menu').fadeOut(100);
				$('div.bg').css({'background-position-y' : '0' });
				
				$('#nav').fadeOut(300, function(){
					$(this).removeClass().fadeIn(500);
					$('a.introToggle').removeClass('locked');
				});

				scrollIntro();
				slideTitlePosition();

			}


		// AT INTRO
		} else {
			
			$(window).scrollTo('#page', 400, function(){

				if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://smongey.github.io/landl/') {

					$('#second').addClass('home').fadeIn(300);

				} else if (location.pathname.indexOf('projects') > -1) {

					$('#second').removeClass('home').fadeIn(300);

				} else if (location.pathname.indexOf('practice') > -1) {

					$('.practice ul.menu').fadeIn(300);

				}


			});

		}

	});


	$('#first li:not(:last-child) a, a.logo').click(function(e){
		e.preventDefault();

		var address = $(this).attr('href');
		history.pushState(address, '', address);

		$('#first li:not(:last-child) a').removeClass('active');
		$(this).addClass('active');

		ajaxCall(address);

	});


	$(window).on('resize', function() {
		//slideTitlePosition();
		if($('#nav').hasClass('top')){
			$('#page').css({ 'margin-top' : 0 });
		}
	});


}); // end require

// Load isotope
var isotopeLoad = function(item, gutter, column){

	console.log('isotope loaded');

	//isotope
	$('#container').isotope({
		itemSelector: item,
		masonry: {
			gutterWidth: gutter,
			columnWidth: column
			//cornerStampSelector: '.stamp'
		}
	});

	centreThumbs(item);};

// Ajax Call
var ajaxCall = function(address){

	if (address.indexOf('/') > -1) {
		
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

	} else {
		
		$(window).scrollTo('#page', 300, function(){
			$('#page > *').fadeOut(500, function(){
				$('#page').hide().load(address + ' #page > *', function(){
					$(this).fadeIn('slow');
					if (address.indexOf('projects') > -1) {
						$('#second').hide().removeClass('home').fadeIn(300);
						$('.practice ul.menu').fadeOut(300);
						isotopeLoad('.item', 60, 100);
					} else if (address.indexOf('practice') > -1) {
						$('#second').fadeOut(300);
						$('.practice ul.menu').fadeIn(300);
						practiceMenu();
					} else {
						$('#second').fadeOut(300);
					}
				});
			});
		});
	}};

// Centre thumbnail titles and images
var centreThumbs = function(item) {
	
	$(item).each(function() {
		var thumbHeight = $(this).height();
		var thumbWidth = $(this).width();
		var projectTitle = $('.project-title');
		
		if(location.pathname.indexOf('projects') > -1) {
		
			$(this).find('img').css({

				'margin-left' : ((thumbWidth - $(this).find('img').width()) / 2),
				'margin-top' : ((thumbHeight - $(this).find('img').height()) / 2)
			
			});
			$(this).find('h3').css({
				'padding-top': ((thumbHeight / 2) - 10)
			});
		
		} else {
		
			$(this).find('h3').css({
				'margin-top': ((thumbHeight / 2) - $(this).find('h3').height() - 10)
			});
		}

	});};

// Load slider
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

	slideTitlePosition();};

// Centre slider titles
var slideTitlePosition = function() {
	var halfHeight = $('#slider').height() / 2 - 30;
	$('.bg h2').css({
		'margin-top': halfHeight
	});};

// on scroll intro action
var scrollIntro = function(){

	$(window).on('scroll', function() {
		
		var pageOffset = window.pageYOffset;
		var slideTitlePos = $('#slider').height() / 2 - 30;

		$('.bg').css({'background-position-y' : -(pageOffset / 5) });	
		slideTitlePosition(/*slideTitlePos + (pageOffset / 10)*/);

		


		//if nav has class of top and window offset is more than 0 the make 
		if (window.pageYOffset >= $('#page').offset().top) {
			if(!$('#nav').hasClass('top')) {

				$(window).off('scroll');
				// Very ODD thing here happening with the animation speed set at 1 rather than 0. If 0 you get a lil glitch on scroll.
				$('#intro').animate({ 'margin-top': -($(window).height()) }, 1);
				$('#page').animate({ 'margin-top': 0 }, 1, function() { });
				$(window).scrollTo(0, 1);
				$('#nav').removeClass().addClass('top');
				$('a.introToggle').addClass('locked');
				if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://smongey.github.io/landl/' || location.pathname.indexOf('projects') > -1) {
					$('#second').fadeIn(300);
				}

			}

		} else if ($(window).scrollTop() > 50) { // if my body scrolls more than 10 give my main nav a relative position
			
			$('#nav').addClass('on');

		} else {

			$('#nav').removeClass('on');
		}

	});};

// scrolling on practice page
var practiceMenu = function(){

	$('ul.menu').localScroll({ duration: 600, offset: -80 });
	$('ul.menu li a').each(function() {
		$(this).click(function(){
			$('ul.menu li a').removeClass('active');
			$(this).addClass('active');
		});
	});
	$('ul.menu li:first-child a').addClass('active');};
