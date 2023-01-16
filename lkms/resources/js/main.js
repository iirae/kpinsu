$(function() {

    'use strict';

    var opts = { // 토글 설정
        method: 0, // 1:smoothstate, 2:pjax
        imagesLoaded: true, // 이미지 로드 후 동작
        smoothScroll: false, // false 면 동작하지 않음
        parallax: true, // false 면 동작하지 않음
    };

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'), // window.$body || $('body'),
        $container = $('#container'),
        $header = $('#header'),
        $footer =  $('#footer');

    var bodyClass = $body.attr('class'); // bodyClass

    $body.append('<div class="md-overlay"></div><div class="md-indicator"><span></span><span></span><span></span><span></span></div>');

    // if (bodyClass.indexOf('page-brand') > -1 && bodyClass.indexOf('page-brand-submain') < 0) { // 브랜드일때, 서버언어로 처리 필요
    //     // $header.addClass('is-transparent'); // 서버언어로 처리 필요
    // }

    // var initAjaxDom = (function(){
    //     if (typeof window.setting === 'undefined') return false;
    //     var path = window.setting.path;
    //     $('<div />').load(path.header, function(_response){
    //         var _html = _response;
    //         var $sandbox = $(_html);
    //         _html = $sandbox.html();
    //         $header.html(_html);
    //     });
    //     $('<div />').load(path.allmenu, function(_response){
    //         var _html = _response;
    //         var $allmenu = $(_html);
    //         $header.after($allmenu);
    //     });
    // })();

    var detectMobile = detectMobile || function() { // 모바일 체크
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    var isSm = false;

    var responsiveDetector = (function() {
        var $sm = $('<div class="detector-sm detector-md"></div>'),
            $lg = $('<div class="detector-lg"></div>');
        var _prev = null;
        $body.append($sm);
        $body.append($lg);
        var _core = function(){
            isSm = $sm.is(':visible');
            if (_prev !== isSm) {
                $html.toggleClass('is-sm', isSm);
            }
            _prev = isSm;
        };
        _core();
        $window.on('resize', function() {
            _core();
        });
    })();

    var userCSSvarDetector = (function(){ // 사용자 정의 속성 탐지, main.js 에 위치하는 것이 맞음
        var $el = $('<div class="detector-var"></div>');
        $body.append($el);
        var _bool = $el.is(':visible');
        $html.toggleClass('cssvar', _bool);
    })();

    var throttle = function(fn, threshhold, scope) { // throttle
        threshhold || (threshhold = 250);
        var last,
            deferTimer;
        return function() {
            var context = scope || this;
            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) { // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function() {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    };

    var debounce = debounce || function(func, wait, immediate) { // debonce
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var scrollTopPrev = -1;

    $window.on('load scroll', throttle(function(){

        var scrollTop = window.pageYOffset || $window.scrollTop();

        $html.toggleClass('is-scroll-downed', (scrollTop >= 10));

        if (scrollTopPrev !== scrollTop) {
            if (scrollTopPrev < scrollTop && scrollTop > 50) { // down, 50 이상 내려갔을 경우
                $html.removeClass('is-scroll-up');
                $html.addClass('is-scroll-down');
            } else if (scrollTopPrev > scrollTop) { // up
                $html.addClass('is-scroll-up');
                $html.removeClass('is-scroll-down');
            }
            scrollTopPrev = scrollTop; // cache
        }

    }, 100));

    setTimeout(function(){
        $html.addClass('is-loaded');
    }, 10);
});

$(function(){

    var $window = $(window),
        $document = $(document),
        $html = $('html');

    if (typeof window.base.headerClass !== 'undefined') {
        $('#header').addClass(window.base.headerClass);
    }

    $html.toggleClass('has-page-nav', ($('.section-page-nav').length > 0));

    var initNav = function(){ // 네비게이션
        if (typeof window.base.nav == 'undefined') return false;
        var nav = window.base.nav;
        $navigation = $('#navigation');
        var $d1 = $navigation.find('.links');
        if (nav[0] >= 0) {
            $d1 = $d1.eq(nav[0] - 1);
            $d1.addClass('in');
            var $d2 = $d1.find('li.d2');
            if (nav[1] >= 1) {
                $d2 = $d2.eq(nav[1] - 1);
                $d2.addClass('in');
            }
        }
    };
    initNav();

    $('.js-lettering').lettering('letters').addClass('text--slide-up');
    $('.js-jumbo').lettering('letters').addClass('text--fading');

    var myApp = new BaseInView('#content .js-inview-container', {
        countUpRestart: true, // 카운트업 재시작
        onResize: function(base) {
            // console.log(base.scope);
        },
        onScroll: function(base) {
            // console.log(base);
        }
    });

    var myInviewEl = new BaseInView('#content .js-inview', {
        thresholdTop: 0,
        thresholdBottom: 0,
        countUpRestart: false, // 카운트업 재시작
        namespace: '.inview',
        countUpEl: null
    });

    // toggle item
    function toggleItem(_container, _items, _idx){
        var $container = $(_container),
            $item = $container.find(_items);
        $container.attr('data-idx', _idx);
        $item.removeClass('in').eq(_idx).addClass('in');
    };

});
