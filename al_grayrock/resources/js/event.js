$(function() {

    'use strict';

    const $window = window.$window || $(window);
    const $html = window.$html || $('html');
    const $body = $('body');
    const ua = window.navigator.userAgent.toLowerCase();

    const browser = isBrowserCheck();

    $html.addClass(browser);


    $body.on('click', '#btnTop', function() {
        $('html, body').animate({scrollTop: '0'}, 500);
    });


    let scrollTop = window.pageYOffset;
    let headerHeight = $('#header').outerHeight();
    const $menu = $('#header .menu li'), 
          $contents = $('.section'), 
          $doc = $('html, body'); 


    $menu.on('click','a', function(e){ 
        var $target = $(this).parent(), 
            idx = $target.index(), 
            section = $contents.eq(idx), 
            offsetTop = section.offset().top - headerHeight; 

        $doc.stop().animate({ 
            scrollTop :offsetTop 
        }, 800);
        return false; 
    }); 

    bottomCheck();

    $(window).on('scroll', function(e){
        scrollTop = window.pageYOffset;
        scrollTop > headerHeight ? $('#header').addClass('fixed') : $('#header').removeClass('fixed');
        scrollTop === 0 ? $('#btnTop .btn-top').addClass('hide') : $('#btnTop .btn-top').removeClass('hide');

        bottomCheck();
        
        $.each($contents, function(idx, item){ 
            var $target = $contents.eq(idx), 
                targetTop = $target.offset().top - headerHeight - 1; 
            
            if ( targetTop <= scrollTop ) { 
                $menu.removeClass('on'); 
                $menu.eq(idx).addClass('on'); 
            }
        }) 
    });

});

$(window).on('load', function() {
  let scrollTop = window.pageYOffset;
  let headerHeight = $('#header').outerHeight();

  scrollTop > headerHeight ? $('#header').addClass('fixed') : $('#header').removeClass('fixed');
  scrollTop === 0 ? $('#btnTop .btn-top').addClass('hide') : $('#btnTop .btn-top').removeClass('hide');

  const returns = $('.retern-num');
  const values = $('.value-num');

  let resetReturn = setInterval(function() {
    randomNumber(returns, 300, 50);
  }, 1500);
  
  let resetValue = setInterval(function() {
    randomNumber(values, 9, 1);
  }, 1500);

  setTimeout(randomNumber(returns, 300, 50));
  setTimeout(randomNumber(values, 9, 1));

});

function bottomCheck() {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('#btnTop').css('bottom', '370px');
    } else {
        $('#btnTop').removeAttr('style');
    }
}

function isBrowserCheck(){ 
    let sBrowser;
    const sUsrAg = navigator.userAgent.toLowerCase(); 
	
    if (sUsrAg.indexOf("firefox") > -1) {
        sBrowser = "firefox";
      } else if (sUsrAg.indexOf("samsungbrowser") > -1) {
        sBrowser = "samsung-internet";
      } else if (sUsrAg.indexOf("opera") > -1 || sUsrAg.indexOf("opr") > -1) {
        sBrowser = "opera";
      } else if ( /msie|trident/.test(sUsrAg) ) {
        sBrowser = "ie";
      } else if (sUsrAg.indexOf("edge") > -1 || sUsrAg.indexOf("edg") > -1) {
        sBrowser = "edge";
      } else if (sUsrAg.indexOf("chrome") > -1) {
        sBrowser = "chrome";
      } else if (sUsrAg.indexOf("safari") > -1) {
        sBrowser = "safari";
      } else {
        sBrowser = "unknown";
      }
    return sBrowser;
}

function randomNumber(counters, upper, lower) {
  let num;
  if(counters.length) {
    for(let i = 0; i < counters.length; i++) {
      num = ( Math.random() * (upper - lower + 1) ) + lower;
      $( counters[i] ).text( num.toFixed(2) );
    }
  }
}
