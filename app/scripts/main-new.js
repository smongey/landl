$(function() {


	$('body').addClass('hidden');
		
	$(window).on('load resize', function(){
		$('#intro, .bg').css({
			'height' : $(window).height()
		});
		$('#intro h2').css({
			'top' : 
		})
	});


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

		// init the pjaxing
		$('a[data-pjax]').pjax('#page', {
			fragment: '#page',
			duration: 400
		});


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
	
	ajaxLink('#first li a, a.logo, a.single, a.back');

	$(window).on('resize', function() {
		//slideTitlePosition();
		if($('#nav').hasClass('top')){
			$('#page').css({ 'margin-top' : 0 });
		}
	});