(function($) {

    var $window = $window || $(window),
        $document = $document || $(document),
        $html = $html || $('html'),
        $body = $body || $('body');

    $.fn.extend({
        // $('#yourElement').animateCss('bounce');
        // or;
        // $('#yourElement').animateCss('bounce', function() {
        //   // Do something after animation
        // });
        animateCss: function(animationName, callback) {
            var animationEnd = (function(el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };
                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
                if (typeof callback === 'function') callback();
            });

            return this;
        },
    });

    $.fn.placeHolder = function(options) {
        var opts = $.extend({
            checkFormSubmit: false
        }, options);
        if (!("placeholder" in document.createElement("input")) || $('html').hasClass('ie')) {
            this.each(function() {
                var $this = $(this);
                $this.on({
                    'focus': function() {
                        if ($this.val() == $this.attr('placeholder')) {
                            $this.val('').removeClass('placeholder');
                        }
                    },
                    'blur': function() {
                        if ($this.val() === '' || $this.val() == $this.attr('placeholder')) {
                            $this.addClass('placeholder').val($this.attr('placeholder'));
                        }
                    }
                });
                if (opts.checkFormSubmit === true) {
                    $this.parents('form').submit(function() {
                        $(this).find('input[placeholder]').each(function() {
                            var $input = $(this);
                            if ($input.val() == $input.attr('placeholder')) {
                                $input.val('');
                            }
                        });
                    });
                }
            });
            this.blur();
        }
    };

    $.fn.equalHeight = function(options){

        this.each(function(){

            var $items = $(this).find($(options.items));
            if (!$items.length) return false;

            var _length = $items.length,
                _maxHeight = 0;
            var _core = function(){
                _maxHeight = 0;
                $items.css({
                    'minHeight': 'auto'
                });
                $items.each(function(i){
                    var $this = $items.eq(i);
                    var _height = $this.height();
                    if (_maxHeight < _height) {
                        _maxHeight = _height;
                    }
                });
                $items.css({
                    'minHeight': _maxHeight
                });
            };
            $window.on('load', function(){
                _core();
            });
        });

        return this;
    }

    var _timerDoAlt = null; // 대체텍스트 Polyfill
    $.doAlt = function(_wrap, _delay){
        var $target = (_wrap !== undefined) ? $(_wrap) : $('#content'),
            $imgs = null,
            $iframes = null;
        var delay = _delay || 1500;
        var _core = function(_t){
            $iframes = $target.find('iframe').not('[title]');
            $imgs = $target.find('img').not('[alt]');
            // console.log(_t + '/' + $imgs.length);
            for (var i = 0; i < $imgs.length; i++) {
                var $this = $imgs.eq(i);
                $this.attr('alt', '');
            }
            for (var i = 0; i < $iframes.length; i++) {
                var $this = $iframes.eq(i);
                $this.attr('title', '빈 프레임');
            }
        };
        setTimeout(function(){
            $target.imagesLoaded(function(){
                _core('map imagesloaded');
            });
        }, 500);
        _timerDoAlt = setTimeout(function(){
            _core('map timer');
        }, 1000);
    };

})(window.jQuery);

$(function() {

    // $('input[placeholder], textarea[placeholder]').placeHolder({ // placeholder
    //     checkFormSubmit: true
    // });

});
