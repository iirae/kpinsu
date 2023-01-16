/*global jQuery */
/*!
 * Lettering.JS 0.7.0
 *
 * Copyright 2010, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Thanks to Paul Irish - http://paulirish.com - for the feedback.
 *
 * Date: Mon Sep 20 17:14:00 2010 -0600
 */
(function($) {
    var _setProp = function(_el, _style){
        var _previous = _el.attr('style');
        _el.attr('style', _style);
    };
    function injector(t, splitter, klass, after) {
        var text = t.text(),
            a = text.split(splitter),
            inject = '';
        if (a.length) {
            $(a).each(function(i, item) {
                if (item.indexOf(' ') == 0) {
                    inject += '<span class="whitespace" aria-hidden="true">&nbsp;</span>';
                } else {
                    inject += '<span class="char ' + klass + ' ' + klass + '-index-' + i + '" data-char="' + item  + '" aria-hidden="true" style="' + '--char-index: ' + i + ';"><i>' + item + '</i></span>' + after;
                }
            });

            if (klass === 'word') {
                _setProp(t, '--word-total: ' + a.length + ';');
            } else {
                _setProp(t, '--char-total: ' + a.length + ';');
            }

            t.addClass('splitting');
            t.attr('aria-label', text).empty().append(inject);
        }
    }
    var methods = {
        init: function() {
            return this.each(function() {
                injector($(this), '', 'char', '');
            });

        },
        words: function() {
            return this.each(function() {
                injector($(this), ' ', 'word', ' ');
            });
        },
        lines: function() {
            return this.each(function() {
                var r = "eefec303079ad17405c889e092e105b0";
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
                // (of the word "split").  If you're trying to use this plugin on that
                // md5 hash string, it will fail because you're being ridiculous.
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });
        }
    };

    $.fn.lettering = function(method) {
		// method = ($(this).data('splitting') !== undefined) ? $(this).data('splitting') : method;
        // Method calling logic
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 1)); // always pass an array
        }

        $.error('Method ' + method + ' does not exist on jQuery.lettering');

        return this;
    };

})(jQuery);
