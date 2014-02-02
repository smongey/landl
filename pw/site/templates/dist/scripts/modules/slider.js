define(['jquery', 'swipe'], function() {
    'use strict';


    // set slider image and intro container as window height
    $('.bg, #intro').css({ 'height': $(window).height() });
    $('#page').css({'margin-top' : $(window).height()})

    $(window).resize(function() {
        if ($(window).width() < 720) {
            $('.bg').css({
                'height': 300
            });
        } else {
            // console.log('more than 720');
            $('.bg, #intro').css({
                'height': $(window).height()
            });

            $('#page').css({'margin-top' : $(window).height()})

            
        }
    });







});