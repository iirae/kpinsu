$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $header = window.$header || $('#header');

    // sticky
    var $stickyNav = $('#sticky');

    var _stickyNav = function(){

        if (!$stickyNav.length) return false;

        var $items = $stickyNav.find('li'),
            $sections = $('.section'),
            _length = $sections.length,
            _scope = [],
            _result = 0,
            i = 0,
            j = 0,
            _timerThrottle = null;

        var _getScope = function(){ // section 위치 정보 구하기
            i = 0;
            _scope = [];
            while (i < _length) {
                var $this = $sections.eq(i),
                    _offset = $this.offset().top - ($window.height() / 2);
                _scope.push(_offset);
                i++;
            }
            _do();
        };

        var _do = function(){ // 실행
            var _scrollTop = $window.scrollTop();
            j = 0;
            _result = 0;
            while (j < _length) {
                if (_scrollTop >= _scope[j]) {
                    _result = j;
                    $items.eq(j).toggleClass('in', true).siblings().removeClass('in');
                }
                j++;
            };
        };

        $window.on('load resize', function(){
            clearTimeout(_timerThrottle);
            _timerThrottle = setTimeout(function(){
                _getScope();
            }, 500);
        });

        $window.on('scroll', function(){
            _do();
        });

        $document.on('click', '.nav a', function(e) {
            e.preventDefault();
            var $this = $(this);

            var $target = $($this.attr('href'));

            var _top = $target.offset().top;

            $('html, body').animate({
                'scrollTop': _top
            }, 600);
            $this.closest('li').addClass('in').siblings().removeClass('in');
        });
    };

    _stickyNav();

    // service slider
    var toggleService = function(_idx){
        var $container = $('.section-service'),
            $item = $container.find('.content-holder .item');
        $container.attr('data-idx', _idx);
        $item.removeClass('in').eq(_idx).addClass('in');
    };

    var swiperService = new Swiper('.section-service .swiper-container', {
        autoplay: {
            delay: 4000
        },
        speed: 500,
        loop: true,
        navigation: {
            nextEl: '.section-service .swiper-button-prev',
            prevEl: '.section-service .swiper-button-next',
        },
        pagination: {
            el: '.section-service .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                index = index + 1;
                return '<a href="javascript:;" class="' + className + ' nth-child-' + index + '"><span></span></a>';
            },
        },
        on: {
            init: function(){
                toggleService(this.realIndex);
            },
            slideChange: function(){
                toggleService(this.realIndex);
            }
        }
    });

    // value
    $document.on('click', '.section-value .links a', function(e) {
        e.preventDefault();

        var $this = $(this),
            $wrap = $this.closest('.section-value'),
            $target = $this.closest('.col'),
            _idx = $target.index();

        $wrap.find('.detail').addClass('in').find('.item').eq(_idx).addClass('in').siblings().removeClass('in');
        $wrap.find('.nav').removeClass('disabled');

        if (_idx === 0 ) {
            $wrap.find('.prev').addClass('disabled').siblings().removeClass('disabled');
        } else if (_idx + 1 === $wrap.find('.item').length ) {
            $wrap.find('.next').addClass('disabled').siblings().removeClass('disabled');
        }

    });

    $document.on('click', '.section-value .nav', function(e) {
        e.preventDefault();

        var $this = $(this),
            $wrap = $this.closest('.detail'),
            $target = $wrap.find('.in'),
            _length = $wrap.find('.item').length,
            _idx = $target.index();

        if ( $this.hasClass('next') ) {
            $wrap.find('.item').eq(_idx + 1).addClass('in').siblings().removeClass('in');
            $wrap.find('.nav').removeClass('disabled');
            if ( _idx >= _length - 2) {
                $this.addClass('disabled');
            }
        } else {
            $wrap.find('.item').eq(_idx - 1).addClass('in').siblings().removeClass('in');
            $this.removeClass('disabled');
            if ( _idx - 1 === 0 ) {
                $this.addClass('disabled').siblings().removeClass('disabled');
            }
        }
    });

    $document.on('click', '.section-value .close', function(e) {
        e.preventDefault();

        var $this = $(this),
            $wrap = $this.closest('.detail');

        $wrap.removeClass('in').find('.in').removeClass('in');
    });

});
