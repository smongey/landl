require.config({

	//baseUrl: '../bower_components/',

	paths: {
		jquery: '../bower_components/jquery/jquery',
		raphael: '../bower_components/raphael/raphael',
		scrollTo: "../bower_components/jquery.scrollTo/jquery.scrollTo",
		swipe: '../bower_components/swipe/swipe',
		isotope: '../bower_components/isotope/jquery.isotope.min',
		waypoints: '../bower_components/jquery-waypoints/waypoints.min'
	},
	shim: {
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

require(['jquery', 'raphael', 'scrollTo', 'swipe', 'isotope', 'waypoints', '../scripts/modules/slider'],
	function($, raphael, scrollTo, swipe, isotope, waypoints, slider) {
	'use strict';

	$('body').addClass('hidden');
	console.log(window.location.href +'  '+location.pathname);
	$(document).ready(function() {
		
		// HOMEPAGE
		if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://landl/' || window.location.href === 'http://smongey.github.io/landl/') {

			$('body').delay(2000).removeClass('hidden');
			isotopeLoad('.item', 60, 100);

		// PROJECTS
		} else if (location.pathname.indexOf('projects') > -1) {

			$(window).scrollTo('#page', 0, function(){

				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.logoToggle').removeClass('locked hidden');
				});
				
				$('#intro').animate({ 'margin-top': 0 }, 0);
				$('#page').animate({ 'margin-top': $(window).height() }, 0);
				$('#second').fadeOut(0);
				$('div.bg').css({'background-position-y' : '0' });
				$('#first li:not(:last-child) a').removeClass('active');
				isotopeLoad('.item', 60, 100);
				$('body').removeClass('hidden');
				if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
					$('#second').removeClass('home').fadeIn(0);
				}
				$('#first li:first-child a, #second li:first-child a').addClass('active');
				
			});


		// SINGLE PROJECT
		} else if (location.pathname.indexOf('project') > -1) {

			$(window).scrollTo('#page', 0, function(){

				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.logoToggle').removeClass('locked hidden');
				});
				
				$('#intro').animate({ 'margin-top': 0 }, 0);
				$('#page').animate({ 'margin-top': $(window).height() }, 0);
				$('#second').fadeOut(0);
				$('div.bg').css({'background-position-y' : '0' });
				$('#first li:not(:last-child) a').removeClass('active');
				
				$('body').removeClass('hidden');
				$('.project .text').fadeIn(0);
				$('#first li:first-child a').addClass('active');

			});
			textToggle();

		// PRACTICE
		} else if (location.pathname.indexOf('practice') > -1) {

			$(window).scrollTo('#page', 0, function(){
				
				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.logoToggle').removeClass('locked hidden');
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


			$(window).scrollTo('#page', 0, function(){
				
				$('#nav').fadeOut(0, function(){
					$(this).removeClass().fadeIn(0);
					$('a.logoToggle').removeClass('locked hidden');
				});
				
				$('#intro').animate({ 'margin-top': 0 }, 0);
				$('#page').animate({ 'margin-top': $(window).height() }, 0);
				$('div.bg').css({'background-position-y' : '0' });
				$('#first li:not(:last-child) a').removeClass('active');
				$('body').removeClass('hidden');
				$('#first li:nth-child(3) a').addClass('active');

				
			});
			newsTitle();

			mobileNewsTitle();

		}

		sliderLoad('slider', 500);
		scrollIntro();
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
			$('#next, #prev').hide();
		}

	}); //end doc ready



	$('a.logoToggle').on('click', function(e){
		e.preventDefault();
		$(this).addClass('hidden');

		// AT PAGE
		if ($(this).hasClass('locked')) {
			
			if (window.pageYOffset > 0) {
				console.log('yay');
				$(window).scrollTo('#page', 400, function(){

					$('#nav').fadeOut(300, function(){
						$(this).removeClass().fadeIn(500);
						$('a.logoToggle').removeClass('locked');
					});
					
					scrollIntro();
					$('#intro').animate({ 'margin-top': 0 }, 400);
					$('#page').animate({ 'margin-top': $(window).height() }, 400);
					$('#second').fadeOut(100);
					$('.practice ul.menu').fadeOut(100);
					$('.project .text').fadeOut(100);
					$('div.bg').css({'background-position-y' : '0' });
					
				});

			} else {

				console.log('nay');
				$('#intro').animate({ 'margin-top': 0 }, 400);
				$('#page').animate({ 'margin-top': $(window).height() }, 400);
				$('#second').fadeOut(100);
				$('.practice ul.menu').fadeOut(100);
				$('.project .text').fadeOut(100);
				$('div.bg').css({'background-position-y' : '0' });
				
				$('#nav').fadeOut(300, function(){
					$(this).removeClass().fadeIn(500);
					$('a.logoToggle').removeClass('locked');
				});

				scrollIntro();
				slideTitlePosition('#slider', '.bg h2');

			}


		// AT INTRO
		} else {
			$(window).scrollTo('#page', 400, function(){

				if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://landl/' || window.location.href === 'http://smongey.github.io/landl/') {

					$('#second').addClass('home').fadeIn(300);

				} else if (location.pathname.indexOf('projects') > -1) {

					$('#second').removeClass('home').fadeIn(300);

				} else if (location.pathname.indexOf('project') > -1) {

					$('.project .text').fadeIn(300);
				
				} else if (location.pathname.indexOf('practice') > -1) {

					$('.practice ul.menu').fadeIn(300);

				}
			});
			
		}
	});
	
	ajaxLink('#first li a');

	$(window).on('resize', function() {
		//slideTitlePosition();
		if($('#nav').hasClass('top')){
			$('#page').css({ 'margin-top' : 0 });
		}
	});


}); // end require


// Ajax call
var ajaxCall = function(address){

	if (address.indexOf('/') > -1 || window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://landl/' || window.location.href === 'http://smongey.github.io/landl/') {
		
		$(window).scrollTo(0, 300, function(){
			$('#page > *').fadeOut(500, function(){});
			$('#page').hide().load(address + ' #page > *', function(){
				
				$(this).fadeIn('slow');
				isotopeLoad('.item', 60, 100);
				$('#second').fadeOut(300);
				
				console.log('home ajax load');
				
			});
			
		});
		$('#second').addClass('home').fadeIn(300);

		$(window).on('popstate', function(){
           address = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
           ajaxCall(address);
        });

	} else {
		

		// condition which changes the order of the scroll->fade in->ajax so as not to double load on iphone the scroll then fade in
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			
			$(window).scrollTo('#page', 300, function(){
				$('#page > *').fadeOut(500, function(){});
				$('#page').hide().load(address + ' #page > *', function(){
					$(this).fadeIn('150');
					if (address.indexOf('projects') > -1) {
						$('.practice ul.menu').fadeOut(300);
						isotopeLoad('.item', 60, 100);
						ajaxLink('a.single');
						console.log('projects ajax load');
					
					} else if (address.indexOf('project') > -1) {
					
						$('#second').fadeOut(300);
						$('.practice ul.menu').fadeOut(300);
						ajaxLink('a.back');
						textToggle();
						console.log('project ajax load');

					} else if (address.indexOf('practice') > -1) {
						
						$('#second').fadeOut(300);
						$('.practice ul.menu').fadeIn(300);
						practiceMenu();
						console.log('practice ajax load');
						
						
					} else if (address.indexOf('news') > -1) {
						
						$('#second').fadeOut(300);
						newsTitle();
						mobileNewsTitle();
						console.log('news ajax load');

					} else {
					
						$('#second').fadeOut(300);
						console.log('default ajax load');
					}
				});
			});
				
		} else {

			$(window).scrollTo('#page', 300, function(){
				$('#page > *').fadeOut(500, function(){
					$('#page').hide().load(address + ' #page > *', function(){
						$(this).fadeIn('150');

						if (address.indexOf('projects') > -1) {
							$('#second').hide().removeClass('home').fadeIn(300);
							$('.practice ul.menu').fadeOut(300);
							isotopeLoad('.item', 60, 100);
							ajaxLink('a.single');
							console.log('projects ajax load');
						
						} else if (address.indexOf('project') > -1) {
						
							$('#second').fadeOut(300);
							$('.practice ul.menu').fadeOut(300);
							ajaxLink('a.back');
							textToggle();
							console.log('project ajax load');

						} else if (address.indexOf('practice') > -1) {
							
							$('#second').fadeOut(300);
							$('.practice ul.menu').fadeIn(300);
							practiceMenu();
							console.log('practice ajax load');
							
							
						} else if (address.indexOf('news') > -1) {
							
							$('#second').fadeOut(300);
							newsTitle();
							mobileNewsTitle();
							console.log('news ajax load');

						} else {
						
							$('#second').fadeOut(300);
							console.log('default ajax load');
						
						}

					});
				});
				
			});
		}



		$(window).on('popstate', function(){
           address = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
           ajaxCall(address);
        });
	}
};

// Load isotope
var isotopeLoad = function(item, gutter, column){

	$('#container').imagesLoaded( function(){
		$('#container').isotope({
			itemSelector: item,
			animatioEngine: 'best-available',
			transformsEnabled: false,
			masonry: {
				gutterWidth: gutter,
				columnWidth: column,
				isFitWidth: true
				//cornerStampSelector: '.stamp'
			}
		});
		centreThumbs(item);
	});

	$('#second li:first-child a').addClass('active');
		
	$('#second a').click(function(){
		var selector = $(this).attr('data-filter');
		$('#second a').removeClass('active');
		$(this).addClass('active');
		$('#container').isotope({ filter: selector });
		return false;
		$(this).fadeOut('slow');
	});

	console.log('isotope loaded');

};

// Mobile News Title
var mobileNewsTitle = function(){
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
		$('.profile p').css({'opacity' : '1'});
		$('.news .full .image h2').css({
			'background' : 'transparent',
			'padding' : '0'
		});
		$('.news .full .image img').css({
			'margin-top' : '50px'
		});
	}
}

// Centre thumbnail titles and images on projects page
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

	});
	console.log('centred thumbs');
};

// Centre intro slider titles
var slideTitlePosition = function(elem, title) {
	var halfHeight = $(elem).height() / 2 - 30;
	$(title).css({
		'margin-top': halfHeight
	});
};

// Intro slider init
var sliderLoad = function(id, speed){
	window.mySwipe = new Swipe(document.getElementById(id), {
		startSlide: 0,
		speed: speed,
		continuous: false,
		disableScroll: false,
		stopPropagation: false,
		callback: function(index, elem) {},
		transitionEnd: function(index, elem) {}
	});

	slideTitlePosition('#slider', '.bg h2');
};


// Scroll watching intro toggler
var scrollIntro = function(){

	$(window).on('scroll', function() {
		
		var pageOffset = window.pageYOffset;
		var slideTitlePos = $('#slider').height() / 2 - 30;

		$('.bg').css({'background-position-y' : -(pageOffset / 5) });	
		slideTitlePosition('#slider', '.bg h2'/*slideTitlePos + (pageOffset / 10)*/);

		//if nav has class of top and window offset is more than 0 then make 
		if (window.pageYOffset >= $('#page').offset().top) {
			if(!$('#nav').hasClass('top')) {

				$(window).off('scroll touchmove');
				// Very ODD thing here happening with the animation speed set at 1 rather than 0. If 0 you get a lil glitch on scroll.
				$('#intro').animate({ 'margin-top': -($(window).height()) }, 1);
				$('#page').animate({ 'margin-top': 0 }, 1, function() { });
				$(window).scrollTo(0, 1);
				$('#nav').removeClass().addClass('top');
				$('a.logoToggle').addClass('locked');
				if (window.location.href === 'http://127.0.0.1:9000/' || window.location.href === 'http://landl/' || window.location.href === 'http://smongey.github.io/landl/' || location.pathname.indexOf('projects') > -1) {
					if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
						// nada
					} else {
						$('#second').fadeIn(300);
					}
				}

			}

		} else if ($(window).scrollTop() > 50) { // if my body scrolls more than 10 give my main nav a relative position
			$('a.logoToggle').removeClass('hidden');
			$('#nav').addClass('on');

		} else {
			$('a.logoToggle').addClass('hidden');
			$('#nav').removeClass('on');
		}

	});
};

// localscroll and practice nav highlighting
var practiceMenu = function(){
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
	
		$('ul.menu li a').each(function() {
			$(this).click(function(e){
				e.preventDefault();
				$('ul.menu li a').removeClass('active');
				$(this).addClass('active');
				var url = $(this).attr('href').split('#');
				var anchor = '#'+url[1];
				console.log(anchor);
				$(window).scrollTo(anchor, 600, {
					offset: -125
				});

			});
		});

		$('ul.menu li:first-child a').addClass('active');
		console.log('practiceMenu init');
	
	}
	
};

// ajax for the link
var ajaxLink = function(elem){
	console.log('ajaxLink init');

	$(elem).on('click', function(e){
		e.preventDefault();
		var address = $(this).attr('href');
		history.pushState(address, '', address);
		$('#first li a').removeClass('active');
		if (elem == 'a.single') {
			$('#first li:first-child a').addClass('active');
		} else {
			$(this).addClass('active');
		}
		
		ajaxCall(address);

	});

};

var textToggle = function(){

	$('a.info').on('click', function(e){
		e.preventDefault();
		if (!$(this).hasClass('on')) {
			$(this).addClass('on').siblings('div, a.back').addClass('hide');
			$(this).empty().append('Show info');
			$('.images').addClass('large');
		} else {
			$(this).removeClass('on').siblings('div, a.back').removeClass('hide');
			$(this).empty().append('Hide info');
			$('.images').removeClass('large');
		}
	});

};

var newsTitle = function(){
	if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
		var imageWidth = $('.full div.image').width() / 2;
		var titleWidth = $('.image h2').outerWidth() / 2;
		var titleHeight = $('.image h2').outerHeight() / 2;
		var imageHeight = $('.full div.image').height() / 2;
		$('.image h2').css({'margin-left': (imageWidth - titleWidth), 'margin-top' : (imageHeight - titleHeight) });
		//slideTitlePosition('.full div.image', '.image h2');
		console.log('newsTitle init');
		$('.image h2').animate({'opacity': 1}, 300);
	}
};