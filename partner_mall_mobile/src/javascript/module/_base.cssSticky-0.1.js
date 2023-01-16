///// 보강중
    /*
    .sticky-a {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -600px;
        .module {
            padding-bottom: 100px;
        }
        .is-sticky & {
            position: fixed;
        }
        .is-sticky-downer & {
            position: fixed;
            top: auto;
            bottom: 0;
        }
    }
    **/
    var $sticky = $('#sticky');
    var _sticky = function($el, _options){

        if (!$el.length) return false;

        var opts = $.extend({
            upperEl: '#stickyTargetTop',
            downerEl: '#footer'
        }, _options);

        var $upper = (typeof opts.upperEl == 'string') ? $(opts.upperEl) : opts.upperEl,
            $downer = (typeof opts.downerEl == 'string') ? $(opts.downerEl) : opts.downerEl;

        var _scrollTop,
            _windowHeight,
            _elHeight,
            _upperTop,
            _downerTop;

        var _core = function(){
            _scrollTop = $window.scrollTop();
            _windowHeight = $window.height();
            _elHeight = $el.height();
            _upperTop = $upper.offset().top,
            _downerTop = $downer.offset().top;
        };

        var _scroll = function(){
            _scrollTop = $window.scrollTop();
            var _boolTop = (_upperTop <= _scrollTop);

            var _documentHeight = $(document).height();
            var zz = 0;

            var _y = _windowHeight - _elHeight - zz;
            console.log(_y);

            var _boolBigger = _y < 0;
            _y = (_y > 0) ? 0 : _y;
            console.log(_y);
            var _boolDowner = (_downerTop <= _scrollTop + _windowHeight - _y);

            $downer.css('border', 'solid 10px #000');



            if (_boolDowner === true && _boolBigger === true) {
                var _return = _scrollTop + _windowHeight - _downerTop;
                $sticky.css({
                    'top': 'auto',
                    'bottom': _return
                });
                $html.toggleClass('is-sticky-downer', _boolDowner);
            } else {
                if (_boolTop === true) {
                    $sticky.css({
                        'top': 0,
                        'bottom': 'auto'
                    });
                } else {
                    $sticky.css({
                        'top': _upperTop,
                        'bottom': 'auto'
                    });
                }
                $html.removeClass('is-sticky-downer');
                $html.toggleClass('is-sticky', _boolTop);
            }
        };
        _core();
        $window.on('load resize', function(){
            _core();
            _scroll();
        });
        $window.on('load scroll', function(){
            _scroll();
        });
    };

    var $downer = $('.js-stick-target-end');
    $downer = ($downer.length) ? $downer : $('#footer');

    // init sticky
    _sticky($sticky, {
        downerEl: $downer
    });
