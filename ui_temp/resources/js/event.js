// 팁 애니메이션 관련 변수
let isStopChat = false,
    delayChat,
    chatAnimate = new Array();

$(function() {

    'use strict';

    const $window = window.$window || $(window);
    const $html = window.$html || $('html');
    const $body = $('body');
    const ua = window.navigator.userAgent.toLowerCase();

    let winHeight = window.innerHeight;

    setHeight(winHeight);

    $(window).on('resize', function(e) {
        winHeight = window.innerHeight;
        setHeight(winHeight);
    });

    $body.on('click', '.all-check', function () {
        if (this.checked) {
            $(':checkbox').prop('checked', true);
            $('.btn-primary').removeClass('disabled');
        }else {
            $(':checkbox').prop('checked', false);
            $('.btn-primary').addClass('disabled');
        }
    });

    $body.on('click', ':checkbox:not(:first)', $('.e-check_range'), function(){
        let all = $('.e-check_range');
        let allCnt = $(":checkbox:not(:first)", all).length;
        let checkedCnt = $(":checkbox:not(:first)", all).filter(":checked").length;
        let requiredCheck = $(":checkbox:not(:first)", all).filter(":visible[required]");
        let  count = 0;

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
        }
        else{
            $(':checkbox:first', all).prop('checked', false);
        }

    });

    // form-group
    $body.on('focus blur', '.form-group input' ,function(e) {
        let $this = $(e.currentTarget);
        let $targetParents = $this.closest('.form-group');

        if(!$this.prop('readonly')) {
            $targetParents.toggleClass('on');
        }

    });

    // layer
    let scrollTop;
    
    $body.on('click', '.e-layer', function (e) {
        e.preventDefault();
        let targetLayer = $($(e.currentTarget).attr('href'));

        openLayer(targetLayer);

        // 회사 선택 레이어 열릴 시
        let hasCompanyList = (targetLayer.attr('id') == 'layerCompanyList');
        if(hasCompanyList) {
            shortcutCompany();
        }
    });

    $body.on('click', '.layer .e-close, .layer .dimmed', function (e) {
        e.preventDefault();
        let findParent = $(this).parents('.layer');

        // for apple device
        if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
            $window.scrollTop(scrollTop);
         }

        closeLayer(findParent);
    });

    // input text clear
    $body.on('click', '.e-clear-input', function(e) {
        e.preventDefault();
        let $findInput = $(this).closest('.form-group').find('input');

        clearLetters($findInput);
    });

    // tooltip
    $body.on('click', '.e-tooltip', function(e) {
        e.preventDefault();
        let $tooltipWrap = $(this).closest('.module-tooltip');

        $tooltipWrap.toggleClass('show');
    });

    // tooltip-layer
    $body.on('click', '.e-tooltip-layer', function(e) {
        e.preventDefault();
        let targetLayer = $($(e.currentTarget).attr('href')),
            $this = $(this);
            // scrollTop = window.pageYOffset;

        // localStorage.setItem('scrollTop', scrollTop);
        
        $body.toggleClass("overlay");

        // if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
        //     setTimeout(function(){
        //         $window.scrollTop(0);
        //     }, 200);
        // }
        let offsetY= $(this).offset().top,
            winH= window.innerHeight,
            scrollY = $window.scrollTop(),
            layerHeight;

        if( scrollY >= 124 ) {
            layerHeight = winH - 140;
        } else {
            layerHeight = winH - 260 + scrollY;
        }

        $($this).toggleClass('on');
        if( $($this).hasClass('on') ) {
            $(targetLayer).fadeIn('fast').css('top', offsetY + 60).addClass('show');
            $(targetLayer).find('.inner').css('height', layerHeight);
        } else {
            $(targetLayer).fadeOut('fast').removeClass('show');
        }
    });

    // tab
    $body.on('click', '.tab a', function(e) {
        e.preventDefault();
        const $this = $(e.target);
        const $tabItem = $this.closest('li'),
            //   $targetContent = $($(e.currentTarget).attr('href'));
              $wrap = $this.closest('.tab');
            //   $wrap = $this.closest('.module-tab');

        let tabItemWidth = $this.width();
        let tabItemPositionLeft = $tabItem.position().left + $this.closest('ul').scrollLeft();

        tabDeco($wrap, tabItemWidth, tabItemPositionLeft);
        
        $tabItem.addClass('on').siblings().removeClass('on');
        // $targetContent.addClass('on').siblings().removeClass('on');
    });

    $body.on('click', '.e-show-aside', function(e) {
        const $this = $(e.target);
        const $targetContent = $($this.attr('href'));
        $targetContent.toggleClass('show');
        $body.toggleClass('overlay');
    });
    $body.on('click', '.aside .dimmed, .aside .e-close', function(e) {
        $(e.target).closest('.aside').removeClass('show');
        $body.removeClass('overlay');
    });

    // 주민등록번호
    $body.on('click', '.e-jumin-masking', function(e) {
        const target = $(e.target);
        target.toggleClass('show').closest('.form-group.jumin').find('.masking').toggleClass('text-security');
    });

    // 아코디언
    $body.on('click', '.accordion .e-accordion', function(e) {
        const target = $(this);
        target.closest('.accordion').toggleClass('expand');
    });

    $body.on('click', '.e-accordion-all', function(e) {
        const target = $(this);
        const $accordions = target.closest('.module-accordion').find('.accordion');
        
        target.closest('.module-accordion').toggleClass('expand-all');

        let isExpandAll = target.closest('.module-accordion').hasClass('expand-all');

        if(isExpandAll) {
            $.each($accordions, function(index, acc) {
                $(acc).addClass('expand');
            });
        } else {
            $.each($accordions, function(index, acc) {
                $(acc).removeClass('expand');
            });
        }
    });

    // 적정금액 선택
    $body.on('click', '.module-gauge input', function(e) {
        const $this = $(e.target);
        const $parent = $this.parent();
        const $grandParent = $this.parents('.module-gauge');

        $this.prop('checked') ? $parent.addClass('on').siblings('li').removeClass('on') : $parent.removeClass('on');
        $grandParent.removeClass('index0 index1 index2 index3 index4').addClass('index' + $parent.index());
        $grandParent.find('.drop').addClass('move');

        setTimeout(function move() {
            $grandParent.find('.drop').removeClass('move');
        }, 800);
    });

    // 보장분석상세 뷰 변경
    $body.on('click', '.e-change_view', function(e) {
        const $this = $(e.target);
        const $parent = $this.parents('.section-guarantee');

        $parent.toggleClass('view-graph');
    });

    // ripple
    $body.on('click touchStart', '.btn-icon, .e-accordion, .e-accordion-all', function() {
        const target = $(this);

        target.removeClass('ripple').addClass('ripple');

        setTimeout(function() {
            target.removeClass('ripple');
        }, 600);
    });

    // area-more
    $body.on('click', '.e-more', function(e) {
        e.preventDefault();
        let $tooltipWrap = $(this).parent().siblings('.expandable');

        $tooltipWrap.toggleClass('show');
    });

    // 즐겨찾기
    $body.on('click', '.e-favorite', function(e) {
        e.preventDefault();
        let $btnFavorite = $(this);

        $btnFavorite.toggleClass('on');
    });


});

function tabDeco($wrap, tabItemWidth, tabItemOffsetLeft) {
    $($wrap).find('.tab-point').css({
        'width': tabItemWidth,
        'transform': ('translate3d(' + (tabItemOffsetLeft) + 'px, 0, 0)')
    });
}

function openLayer($layer) {
    const ua = window.navigator.userAgent.toLowerCase();
    let scrollTop = window.pageYOffset;

    $('body').addClass("overlay");

    if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
        setTimeout(function(){
            $window.scrollTop(0);
        }, 200);
    }

    $layer.fadeIn('fast').addClass('show');
    localStorage.setItem('scrollTop', scrollTop);
       
}

function closeLayer($layer) {
    const ua = window.navigator.userAgent.toLowerCase();
    let localStorageScrollTop = localStorage.getItem('scrollTop');

    $layer.removeClass('show');
    $('body').removeClass("overlay");

    if (ua.match(/iPad/i) || ua.match(/iPhone/i)) {
        $('window').scrollTop(localStorageScrollTop);
     }
     $layer.fadeOut().removeClass('show');

    localStorage.removeItem('scrollTop')
}

function deleteOneLetter($input) {
    let value = $($input).val(),
        setValue;

    setValue = value.slice(0, value.length === 0 ? 0 : value.length -1 );
    $($input).val(setValue);
}

function clearLetters($input) {
    $($input).val('');
}

function countValueLength($input) {
    let value = $($input).val(),
        valLength = value.length,
        dots = $('.module-password .dot');

    $.each(dots, function(index, dot) {
        valLength - 1 >= index ? $(dot).addClass('on') : $(dot).removeClass('on');
    });
}

// 회사 선택하기
function shortcutCompany() {
    let $shortcuts = $($('.module-company #shortcuts'));
    let $companyList = $($('.module-company .company'));
    let letters = $companyList.find('ul');
    let listPositionInfo = [],
        didScroll, presentScrollTop,
        lastScrollTop = $companyList.scrollTop();


    $.each(letters, function(index, letter) {
        let obj = {};

        let letterId = $(letter).attr('id');
        let letterPosition = $(letter).position().top;

        obj.id = letterId;
        obj.position = letterPosition;
        listPositionInfo.push(obj);
    }); 

    $('body').on('click', '#shortcuts a', function(e) {
        e.preventDefault();
        let $this = $(this),
            target = $this.attr('href').slice(1);
        let letterPositionTop = 0;
        
        for(let key in listPositionInfo) {
            target == listPositionInfo[key].id ? letterPositionTop = listPositionInfo[key].position : letterPositionTop = letterPositionTop;
        }

        $companyList.animate({scrollTop: letterPositionTop}, 500);
    });


    $companyList.on('scroll', function(e) {
        presentScrollTop = $companyList.scrollTop();

        if (lastScrollTop == presentScrollTop) {
            didScroll = false;
        } else if (lastScrollTop > presentScrollTop) {
            didScroll = true;
        } else {
            didScroll = true;
        }

        lastScrollTop =  $companyList.scrollTop();
    });

    setInterval(function() {
        if (didScroll) {
            addScroll(true);

            didScroll = false;
        } else {
            addScroll(false);
        }
    }, 100);

    function addScroll(didScroll){
        didScroll ? $shortcuts.addClass('scroll') : $shortcuts.removeClass('scroll');
    };
}

// 높이 지정
function setHeight(winHeight) {
    $('#wrap').css('min-height', winHeight);
    $('#wrap').find('.container').css('min-height', winHeight - 56);
}


// indicator
function showIndicator() {
    $('body').append('<div class="module-indicator" id="module-indicator"><div class="inner"><span class="bar b1"></span><span class="bar b2"></span><span class="bar b3"></span><span class="bar b4"></span></div></div>');
    $('body').addClass("overlay is-indicator");
}
function hideIndicator() {
    const $indicator = parent.document.getElementById('module-indicator');

    $indicator.parentNode.removeChild($indicator);
    $('body').removeClass("overlay is-indicator");
}

// 팁 애니메이션
function calcPosition(isStopChat) {
    const chatList = $(".section-chat li"),
        screenHeight = window.screen.height;

    let chatHeight;
    let toScrollTop = 0, thisLiPositionTop, scrollDuration;
    let $thisLi, itemIndex;

    $.each(chatList, function(index, chatLi) {
        $thisLi = $(chatList.eq(index)),
        chatHeight = $thisLi.outerHeight();
        itemIndex = index;

        thisLiPositionTop = $(chatList)[index].offsetTop;
        chatHeight <= 250 ? scrollDuration = 500 : scrollDuration = chatHeight * 2;

        if( !(index == (chatList.length - 2) || index == (chatList.length - 1)) ) {
            if( screenHeight >= (thisLiPositionTop + chatHeight) ) {
                toScrollTop = toScrollTop;
            } else {
                toScrollTop = thisLiPositionTop - screenHeight + chatHeight + 60;
            }
        } else {
            toScrollTop = $('html, body').height() + chatHeight;
            scrollDuration = 433 * 4;
        }

        delayChat = 1800 * index;
        scrollChat(itemIndex, chatList, toScrollTop, scrollDuration, $thisLi);
    });
}
function scrollChat(index, chatList, toScrollTop, scrollDuration, $thisLi) {
    chatAnimate[index] = setTimeout(function() {
        
        if(!isStopChat) {
            if( index == (chatList.length - 2) ) {
                $('.links').addClass('on');
            }

            $('html, body').animate({
                scrollTop: toScrollTop
            }, scrollDuration);

            $thisLi.addClass('on');
        } else {
            $.each(chatList, function(index, chatLi) {
                $(chatLi).addClass('on');
                $('.links').addClass('on');
            });
        }

    }, delayChat );

    if(isStopChat) {
        for(let i = 0; i <= chatList.length; i++) {
            clearTimeout(chatAnimate[i]);
        }
    }
}

(function ($){
    $.fn.bekeyProgressbar = function(options){

        options = $.extend({
          animate     : true,
          animateText : true
        }, options);

        const $this = $(this);

        $.each($this, function(index, progress) {
            const $progressBar = $(progress);
            const $progressCount = $progressBar.find('.progress-bar-percentage--count');
            const $circle = $progressBar.find('.progress-bar-circle');
            const percentageProgress = $progressBar.data('progress');
            const percentageRemaining = (100 - percentageProgress);
            const percentageText = percentageProgress;
          
            //Calcule la circonférence du cercle
            // const radius = $circle.attr('r');
            const radius = $progressBar.outerWidth() / 2;
            const diameter = radius * 2;
            const circumference = Math.round(Math.PI * diameter);
    
            //Calcule le pourcentage d'avancement
            const percentage =  circumference * percentageRemaining / 100;
    
            // console.log(progress, percentageProgress);
            // console.log($progressBar.outerWidth(), circumference, percentage);
    
            $circle.css({
              'stroke-dasharray' : circumference,
              'stroke-dashoffset' : percentage
            })
            
            let durationTime = percentageProgress * 15;

            //Animation de la barre de progression
            if(options.animate === true){
              $circle.css({
                'stroke-dashoffset' : circumference
              }).animate({
                'stroke-dashoffset' : percentage
              }, {duration: durationTime, easing: "linear"} );
            }
            
            //Animation du texte (pourcentage)
            if(options.animateText == true){
     
              $({ Counter: 0 }).animate(
                { Counter: percentageText },
                { duration: durationTime,
                 step: function () {
                   $progressCount.text( Math.ceil(this.Counter));
                 }
                });
    
            }else{
              $progressCount.text( percentageText);
            }
          
        });
      
    };

})(jQuery);
