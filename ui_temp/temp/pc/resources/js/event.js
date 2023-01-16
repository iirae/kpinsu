$(function() {

    'use strict';

    const $window = window.$window || $(window);
    const $html = window.$html || $('html');
    const $body = $('body');
    const ua = window.navigator.userAgent.toLowerCase();

    const browser = isBrowserCheck();

    $html.addClass(browser);

    let isMain = $('.page-main');
// console.log(browser);

    let all = $('.section-terms_agree');
    $body.on('click', '.all-check', function () {
        let allCheck = $(":checkbox:not(:first)", all);

        if (this.checked) {
            $(':checkbox').prop('checked', true);
            $('.btn-primary').removeClass('disabled');

            $.each(allCheck, function(index, checkbox) {
                let $parent = $(checkbox).closest('.form-chk');
                $parent.addClass('checked');
            });

        }else {
            $(':checkbox').prop('checked', false);
            $('.btn-primary').addClass('disabled');
            $.each(allCheck, function(index, checkbox) {
                let $parent = $(checkbox).closest('.form-chk');
                $parent.removeClass('checked');
            });

        }
    });

    $(':checkbox:not(:first)', all).on('click', function(){
        let allCnt = $(":checkbox:not(:first)", all).length;
        let checkedCnt = $(":checkbox:not(:first)", all).filter(":checked").length;
        let requiredCheck = $(":checkbox:not(:first)", all).filter(":visible[required]");
        let count = 0;

        $.each(requiredCheck, function(index, checkbox) {
            let checked = $(checkbox).prop('checked');

            count = checked ? count+= 1 : count;

            if (requiredCheck.length === count) {
            $('.btn-primary').removeClass('disabled');
            } else {
            $('.btn-primary').addClass('disabled');
            }
        });

        if(allCnt === checkedCnt) {
            $(':checkbox:first', all).prop('checked', true);
        } else{
            $(':checkbox:first', all).prop('checked', false);
        }
    });

    $body.on('click', ':checkbox', function(){
        let $this = $(this);
        let $parent = $this.closest('.form-chk');
        let checked = $this.prop('checked');

        checked ? $parent.addClass('checked') : $parent.removeClass('checked');
    });

    $body.on('click', ':radio', function(){
        let $this = $(this);
        let $parent = $this.closest('.form-radio');
        let checked = $this.prop('checked');
        let allRadio = $(".form-radio");

        let isReadonly = $this.is(':visible[readonly]');

        $.each(allRadio, function(index, radio) {
            $(radio).removeClass('checked');
        });

        if(isReadonly) {
            $this.prop('checked', false);
            checked = false;
        }
        checked ? $parent.addClass('checked') : $parent.removeClass('checked');
    });

    // layer
    let scrollTop;
    
    $body.on('click', '.e-layer', function (e) {
        e.preventDefault();
        let $this = $(e.currentTarget),
            targetLayer = $($($this).attr('href')),
            scrollTop = window.pageYOffset;

        localStorage.setItem('scrollTop', scrollTop);
        
        $body.addClass("overlay indicator");

        if($($this).data('tab')) {
            let tabName = $($this).data('tab'),
                $wrap = $(targetLayer).find('.area-tab'),
                $tabContent = $wrap.find('.tab-content'),
                $tabList = $wrap.find('.tab a');

            $.each($tabContent, function(index, content) {
                let checkTarget = $(content).attr('id') == tabName;
                checkTarget ? $(content).addClass('on') : $(content).removeClass('on');
            });

            $.each($tabList, function(index, tab) {
                let checkTarget = $(tab).attr('href').slice(1) == tabName;
                checkTarget ? $(tab).closest('li').addClass('on') : $(tab).closest('li').removeClass('on');
            });
        }

        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            setTimeout(function(){
                $window.scrollTop(0);
            }, 200);
        }
        $(targetLayer).fadeIn('fast');

        // for main
        if(isMain.length > 0) {
            removeScollEvent();
        }
    });

    $body.on('click', '.layer .e-close, .layer .dimmed', function (e) {
        e.preventDefault();
        let findParent = $(this).parents('.layer');

        $body.removeClass("overlay");

        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            $window.scrollTop(scrollTop);
         }
        findParent.fadeOut();

        localStorage.removeItem('scrollTop');

        // for main
        if(isMain.length > 0) {
            addScollEvent();
        }
    });

    // tooltip
    $body.on('click', '.area-tooltip .e-trigger', function(e) {
        let $areaToggle = $(this).closest('.area-tooltip'),
            $wrapToggle = $areaToggle.find('.tooltip-wrap');

            $areaToggle.toggleClass('on');

    });

    // accordion
    $body.on('click', '.area-accordion .e-toggle', function(e) {
        let $this = $(this);
        let $parent = $this.closest('.area-accordion');

        $parent.toggleClass('on');
        $parent.find('.content').slideToggle();

        setTimeout(function() {
            checkShortContainer();
        }, 500);
    });

    // tab
    $body.on('click', '.area-tab .tab a', function(e) {
        var $this = $(e.target);
        var $tabItem = $this.closest('li'),
            _idx = $tabItem.index(),
            $wrap = $this.closest('.area-tab');
        var $tabContent = $wrap.find('.tab-content');

        $.each($tabContent, function(index, content) {
            let checkTarget = $(content).attr('id') == $this.attr('href').slice(1);
            checkTarget ? $(content).addClass('on') : $(content).removeClass('on');
        });

        $tabItem.addClass('on').siblings().removeClass('on');
    });

    // full page
    let isFull = $('.full-gray');
    if(isFull.length > 0) {
        calcWinHeight();
        $window.resize( function() {
            setTimeout(function() {
                calcWinHeight();
            });
        });
    }

    // wrap height 작을 경우
    checkShortContainer();

    $window.on('resize', function() {
        setTimeout(function() {
            checkShortContainer();
        });
    });

    if(browser === 'ie') {
        $body.on('click', '#btnTop', function() {
            $('html, body').animate({scrollTop: '0'}, 500);
        });

        // main scroll event
        if(isMain.length > 0) {
            let didScroll, presentScrollTop;
            let lastScrollTop = window.pageYOffset;
        
            $(window).scroll(function(e){
        
                presentScrollTop = window.pageYOffset;
        
                if (lastScrollTop == presentScrollTop) {
                    didScroll = false;
                } else if (lastScrollTop > presentScrollTop) {
                    didScroll = true;
                } else {
                    didScroll = true;
                }
        
                lastScrollTop =  window.pageYOffset;
            });
        
            setInterval(function() {
                if (didScroll) {
                    scrollEffect();
        
                    didScroll = false;
                }
            }, 50);
        }
    }

});

// full page
function calcWinHeight() {
    let winHeight = $(window).height();
    $body.height(winHeight);
}

// wrap height 작을 경우
function checkShortContainer() {
    let winHeight = $(window).height(),
        contHeight = $('#container').outerHeight() + 230,
        headerHeight = $('#header').outerHeight(),
        footHeight = $('#footer').outerHeight(),
        documentHeight;

        documentHeight = headerHeight + contHeight + footHeight;

        documentHeight < winHeight ? $('#footer').addClass('fixed') : $('#footer').removeClass('fixed');
}

function isBrowserCheck(){ 
    let sBrowser;
    const sUsrAg = navigator.userAgent.toLowerCase(); 
	
    // console.log(sUsrAg);

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

function scrollEffect() {
    var sectionTop, sectionHeight, scrollTop, $section;
    var arrSectionTop = [];
    var arrSectionHeight = [];
    var sectionList = [];

    scrollTop = window.pageYOffset;

    $('.page-main .section').each(function(i) {
        $section = $(this);
        sectionTop = Math.round($section.offset().top);
        sectionHeight = Math.round($section.height());

        arrSectionTop[i] = sectionTop;
        arrSectionHeight[i] = sectionHeight;
        sectionList[i] = $section;
    });

    for(var i = 0; i < arrSectionHeight.length; i++) {
        if( arrSectionTop[i]-150 <= scrollTop && scrollTop <= arrSectionTop[i] + arrSectionHeight[i] ) {
            $(sectionList[i]).addClass('on');
        } else if( $(window).scrollTop() + $(window).height() == $(document).height() ) {
            $('.page-main .section:last-of-type').addClass('on');
        } else {
            $(sectionList[i]).removeClass('on');
        }
    }
}
