$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $container = window.$container || $('#container'),
        $header = window.$header || $('#header'),
        $footer = window.$footer || $('#footer');

    var BODYCLASS = $body.attr('class');

    $.fn.timeline = function(_options) {

        this.each(function(){

            var _defaults = {

            };

            var opts = $.extend({}, _defaults, _options);

            var $this = $(this);

            var base = {
                el: $this,
                items: $this.find('.section-history'),
                active: -1,
                activeEl: null,
                activeGroup: 0,
                scope: [],
                scrollTop: 0,
                windowHeight: 0,
                inview: 0
            };

            var $historyTabItems = $('#historySticky li'); // 탭 아이템

            base.length = base.items.length;

            var _reset = function(){
                base.scope = [];
                base.windowHeight = $window.height();
                for (var i = 0; i < base.length; i++) {
                    var _el = base.items.eq(i),
                        _offset = _el.offset(),
                        _top = _offset.top,
                        _height = _el.height(),
                        _bottom = _top + _height,
                        _groupIdx = _el.data('group-idx') || 0,
                        _arr = [_top, _bottom, _groupIdx];
                    base.scope.push(_arr); // 배열 추가
                }
            };

            var _historyTab = function(){ // 히스토리 탭
                $historyTabItems.removeClass('in').eq(base.activeGroup).addClass('in');
            };

            var _core = function(){
                base.activeEl = null;
                base.scrollTop = $window.scrollTop();
                base.inview = base.scrollTop + parseInt(base.windowHeight / 2, 10) + (base.windowHeight * 0.05);
                base.active = -1;
                for (var i = 0; i < base.scope.length; i++) {
                    var _this = base.scope[i];
                    if (base.inview + 100 > _this[0]) { // 50 근사치 수정 필요
                        base.active = i;
                    }
                }
                if (base.active < 0) base.active = 0;
                if (typeof base.scope[base.active] == 'object') {
                    base.activeGroup = base.scope[base.active][2];
                }

                base.activeEl = base.items.eq(base.active);
                base.items.removeClass('active');
                base.activeEl.addClass('active');
                // console.info(base);
                _historyTab();

                if (base.scrollTop >= 1000) {
                    $html.addClass('is-history');
                } else {
                    $html.removeClass('is-history');
                }

                var _scrollTop = $window.scrollTop(),
                    _docHeight = $document.height(),
                    _windowHeight = $window.height();

                var _scrollPercent = (_scrollTop / (_docHeight - _windowHeight)) * 100;
                $('#historySticky .bar').children().width(_scrollPercent + '%');
            };

            $window.on('load resize', function(){
                _reset();
                _core();
            });

            $document.on('click', function(){
                _reset();
            });

            $window.on('scroll', function(){
                _core();
            });
            _core();

            $document.on('click', '#historySticky a', function(e){
                e.preventDefault();
                var $this = $(e.target);
                $this = ($this.is('a')) ? $this : $this.closest('a');
                var $target = $($this.attr('href'));
                // var _marginTop = 130+78; // 보강 필요
                var _marginTop = 260; // 보강 필요
                var _to = $target.offset().top - _marginTop;
                $('html, body').stop().animate({
                    'scrollTop': _to
                }, 80);
            });

        });

        return this;
    };

    $('#timeline').timeline();

});
