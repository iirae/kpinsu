// 커튼형 스티키
$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $body = $('body'),
        $header = window.$header || $('#header');

    var BODYCLASS = $body.attr('class');

    var curtainSticky = function(_el){

        var $group = $(_el);
        if (!$group.length) return false;
        var $items = $group.find('.sticky-item'),
            length = $items.length;

        var scrollTop = 0,
            prevTop = -1,
            scope = [],
            activeIdx = -1,
            scrollDir = 'down';

        var reset = function(){
            scope = [];
            activeIdx = -1;
            scrollDir = 'down';
            for (var i = 0; i < length; i++) {
                var $this = $items.eq(i),
                    $el = $this.find('.sticky-el'),
                    $clone =  $this.find('.sticky-clone');
                $clone.html($el.html()); // reset
                var _top = parseInt($this.offset().top, 10),
                    _height = parseInt($this.height(), 10),
                    _cloneHeight = parseInt($clone.height(), 10),
                    _bottom = _top + _height,
                    _end = _bottom - _cloneHeight,
                    _arr = [_top, _bottom, _end];
                $el.height($el.height());
                scope.push(_arr);
            };
        };

        var onScroll = function(){
            scrollTop = $window.scrollTop() + 130;
            prevTop = scrollTop;
            activeIdx = -1;
            $items.removeClass('in active bottom');
            var core = function(){
                $.each(scope, function(i){
                    var _top = scope[i][0];
                    var _bottom = scope[i][1];
                    var _end = scope[i][2];
                    if (scrollTop >= _top && scrollTop <= _bottom) {
                        activeIdx = i;
                        var $active = $items.eq(activeIdx);
                        $active.addClass('in');
                        if (scrollTop >= _end) {
                            $active.addClass('bottom');
                        }
                    }
                });
            };
            core();
        };

        $window.on('load resize', function(){
            reset();
            onScroll();
        });

        $window.on('scroll', function(){
            onScroll();
        });

    };

    // page brand submain 일 경우
    if (BODYCLASS.indexOf('page-brand-submain') > -1) {
        curtainSticky('#brandSticky');
    }

});
