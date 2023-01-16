
;(function(root) { // 글로벌 함수 선언

    'use strict';

    root.throttle = root.throttle || function(fn, threshhold, scope) { // throttle
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

    root.debounce = root.debounce || function(func, wait, immediate) { // debonce

        /*
        var returnedFunction = debounce(function() {
            noop();
        }, 250);
        */

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

})(this);

// wrapper height 속성을 이용한 sticky
;(function($, window, document, undefined) {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html');

    /*

    <div id="stickyWrap" class="container"><!-- 감싸는 요소 -->
        <div class="wrap">
            <div class="grid">
                <div class="col holder">
                    <img src="../resources/img/custom/@sub_03.png" alt="">
                </div>
                <div class="col searchs">
                    <div id="sticky" class="sticky"><!-- sticky 요소 -->
                        <div class="sticky-inner">
                            <div class="module">
                                <img src="../resources/img/custom/@sticky_01.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    .js-sticky {
        .sticky-inner {
            left: 0;
        }
        &.is-out {
            position: relative;
            .sticky-inner {
                position: absolute;
                top: 0;
            }
        }
        &.is-in {
            .sticky-inner {
                position: fixed;
                top: 0;
            }
        }
        &.is-bottom {
            position: relative;
            .sticky-inner {
                position: absolute;
                bottom: 0;
            }
        }
    }
    */

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

    $.fn.relativeSticky = function(_options){
        this.each(function(){

            var $this = $(this),
                $inner = $this.children();

            var _defaults = {
                wrapEl: null,
                bottom: false, // true 일 경우 wrapEl 의 높이를 탐지하여 기동
                marginTop: 0,
                inlineCSS: false // inline css 조작 적용
            };

            var opts = $.extend({}, _defaults, _options);

            var $wrap = opts.wrapEl;

            var base = {
                scrollTop: 0,
                wrapHeight: 0,
                wrapTop: 0,
                wrapBottom: 0,
                elHeight: 0
            };

            var _reset = function(){
                $this.removeAttr('style'); // css reset
                $this.addClass('js-sticky is-loaded');
                base.scrollTop = $window.scrollTop();
                base.wrapHeight = $wrap.height();
                base.wrapTop = $wrap.offset().top;
                base.wrapBottom = base.wrapTop + base.wrapHeight;
                base.elHeight = $this.children().outerHeight();
                base.marginTop = opts.marginTop;
                base.boolTop = false;
                base.boolBottom = false;

                $this.height(base.wrapHeight);

                _core();
            };

            var _core = function(){

                base.scrollTop = window.pageYOffset || $window.scrollTop();
                base.boolTop = (base.scrollTop + base.marginTop >= base.wrapTop); // 상단에 들어오는지
                base.boolBottom = opts.bottom ? (base.scrollTop + base.elHeight >= base.wrapTop + base.wrapHeight) : false; // 하단에 들어오는지

                if (base.boolBottom === false) { // 하단에 넘치치 않으면
                    $this.removeClass('is-bottom');
                    $this.toggleClass('is-in', base.boolTop);
                    $this.toggleClass('is-out', !base.boolTop);
                } else if (opts.bottom === true) {
                    $this.removeClass('is-in');
                    $this.removeClass('is-out');
                    $this.addClass('is-bottom');
                }
                // console.info(base);

                if (opts.inlineCSS === true) { // inlineCSS 사용할때
                    if (base.boolTop !== true && base.boolBottom !== true) { // out (upper)
                        $this.css('position', 'relative');
                        $inner.css({
                            'position': 'absolute',
                            'top': 0,
                            'bottom': 'auto'
                        });
                    } else if (base.boolBottom !== true) { // in
                        $this.css('position', '');
                        $inner.css({
                            'position': 'fixed',
                            'top': 0,
                            'bottom': 'auto'
                        });
                    } else { // bottom (downer)
                        $this.css('position', 'relative');
                        $inner.css({
                            'position': 'absolute',
                            'top': 'auto',
                            'bottom': 0
                        });
                    }
                }

            };

            _reset();

            $window.on('resize', debounce(function(){
                _reset();
            }, 100));

            $document.on('click', function(){
                _reset();
            });

            $window.on('scroll', throttle(function(){
                _core();
            }, 50));

            return this;
        });
    };

})(jQuery, window, document);

$(function(){

    // sticky
    $('.page-sub #sticky').relativeSticky({
        wrapEl: $('#stickyWrap'),
        bottom: true
    });
})
