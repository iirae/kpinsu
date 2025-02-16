function hasClass(_el, _class) {
    return _el.getAttribute('class').indexOf(_class) > -1;
}

function addClass(_el, _class) {
    if (_el.classList) {
        _el.classList.add(_class);
    } else if (!hasClass(_el, _class)) {
        _el.setAttribute('class', _el.getAttribute('class') + ' ' + _class);
    }
}

function removeClass(_el, _class) {
    if (_el.classList) {
        _el.classList.remove(_class);
    } else if (hasClass(_el, _class)) {
        _el.setAttribute('class', _el.getAttribute('class').replace(_class, ' '));
    }
}

function toggleClass(_el, _class, _bool) {
    _bool = (_bool !== undefined) ? _bool : hasClass(_el, _class);
    if (_bool === true) {
        addClass(_el, _class);
    } else {
        removeClass(_el, _class);
    }
}

(function() {
    var method,
        noop = function() {},
        methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'],
        length = methods.length,
        console = (window.console = window.console || {});
    while (length--) {
        method = methods[length];
        if (!console[method]) { // Only stub undefined methods.
            console[method] = noop;
        }
    }
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    })();
}());

(function($) {

    var browserUtil = (function() {
        var $html = $('html'),
            _html = $html[0] || document.documentElement,
            _ua = (navigator.userAgent || navigator.vendor || window.opera),
            _location = window.location,
            _isLocalHost = (_location.origin == 'file://' || _location.hostname.match('192') || _location.port !== '') ? true : false,
            _browser = '',
            _vendorNames = {
                "android": "mobile android modern no-ie",
                "windows phone": "mobile windows modern no-ie",
                "iphone": "mobile iphone modern no-ie",
                "ipad": "mobile iphone ipad modern no-ie",
                "ipod": "mobile iphone ipod modern no-ie",
                "msie 6": "ie ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10 oldie",
                "msie 7": "ie ie7 lt-ie8 lt-ie9 lt-ie10 oldie",
                "msie 8": "ie ie8 lt-ie9 lt-ie10 oldie",
                "msie 9": "ie ie9 lt-ie10",
                "msie 10": "ie ie10 gte-ie10",
                "msie 11": "ie ie11 gte-ie10",
                "edge": "edge gte-ie10 modern",
                "chrome": "chrome modern no-ie",
                "webkit": "webkit modern no-ie",
                "safari": "safari modern no-ie",
                "firefox": "firefox modern no-ie"
            },
            _device = ((/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(_ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(_ua.substr(0, 4)))) ? 'mobile' : 'classic',
            _browser;

        var hasClass = hasClass || function(_el, _class) {
                return _el.getAttribute('class').indexOf(_class) > -1;
            },
            addClass = addClass || function(_el, _class) {
                if (_el.classList) {
                    _el.classList.add(_class);
                } else if (!hasClass(_el, _class)) {
                    _el.setAttribute('class', _el.getAttribute('class') + ' ' + _class);
                }
            },
            removeCl = removeClass || function(_el, _class) {
                if (_el.classList) {
                    _el.classList.remove(_class);
                } else if (hasClass(_el, _class)) {
                    _el.setAttribute('class', _el.getAttribute('class').replace(_class, ' '));
                }
            },
            toggleClass = toggleClass || function(_el, _class, _bool) {
                _bool = (_bool !== undefined) ? _bool : hasClass(_el, _class);
                if (_bool === true) {
                    addClass(_el, _class);
                } else {
                    removeClass(_el, _class);
                }
            }

        _html.className += ' ' + _device;

        if (_ua.indexOf("Win") != -1) { // navigator.platform.toLowerCase()
            _html.className += ' windows';
        }

        if (navigator.appVersion.toLowerCase().indexOf('edge') > -1) {
            _ua = 'edge';
        } else if ('behavior' in document.documentElement.style && '-ms-user-select' in document.documentElement.style) {
            _ua = 'msie 10';
        } else if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
            _ua = 'msie 11';
        } else if (!!window.chrome) {
            _ua = 'chrome';
        }

        for (var key in _vendorNames) {
            if (_ua.toLowerCase().match(key)) {
                _browser = _vendorNames[key];
                _html.className += ' ' + _browser;
            }
        }
        if (_isLocalHost === true) {
            _html.className += ' is-localhost';
        }

        window.isMobile = (_device == 'mobile') ? true : false; // set global vars.
        window.browser = _browser;

    })();

    var replaceMeta = (function() {

        var _isMobile = isMobile; // 모바일 기기인지 판단

        var $equiv = $('meta[http-equiv="X-UA-Compatible"]'),
            $viewport = $('meta[name="viewport"]'),
            $head = $('head'),
            _head = document.getElementsByTagName('head')[0],
            _viewport = null,
            _equiv = null;

        if (!$viewport.length && _isMobile === true) { // 모바일 기기 이며 메타 뷰포트가 없을때
            _viewport = document.createElement('meta');
            _viewport.setAttribute('name', 'viewport');
            _viewport.setAttribute('content', 'width=device-width, initial-scale=1, user-scalable=no');
            _head.insertBefore(_viewport, _head.firstChild);
        }

        if (!$equiv.length) { // 메타 equiv 가 없을때
            _equiv = document.createElement('meta');
            _equiv.setAttribute('http-equiv', 'X-UA-Compatible');
            _equiv.setAttribute('content', 'IE=edge');
            _head.insertBefore(_equiv, _head.firstChild);
        }

    })();

})(window.jQuery);

window.base = (typeof window.base !== 'undefined') ? window.base : {};
window.plugins = (typeof window.plugins !== 'undefined') ? window.plugins : [];

// 뒤로 가기 재발생 이벤트 강제, https://programmingsummaries.tistory.com/380
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

/**
@prepros-prepend './app/_polyfills.js'
@prepros-prepend './app/_function.js'
@prepros-prepend './app/_jquery.extend.js'
*/
