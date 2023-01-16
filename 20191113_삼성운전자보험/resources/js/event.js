$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    var toggleHtmlClass = function(e) {
        var $this = $(e.target);
        $this = ($this.is('a')) ? $this : $this.closest('a');
        var _class = $this.attr('data-class');
        $html.toggleClass(_class);
    };

    // modal
    var scrollTop = 0;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var $modal = $(this.hash);

        scrollTop = $window.scrollTop();

        $html.addClass('is-overlay is-indicator is-modal');
        $modal.addClass('in');

        setTimeout(function(){
            $html.removeClass('is-indicator');
            $modal.addClass('anim');
            $body.css({"position":"fixed", "top": -scrollTop});
            $modal.find('.md-modal-body').height($window.height() - 5);
            // $modal.find('.md-modal-body').attr('tabIndex', 0).focus();
            $('html, body').stop().animate({
                'scrollTop': scrollTop
            }, 0);
        }, 200);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);
        setTimeout(function(){
            $modal.removeClass('in');
            $html.removeClass('is-overlay is-modal');
            // $modal.find('.md-modal-body').removeAttr('tabIndex');
        }, 400);
    });

    // checkbox
    $document.on('change', '.checks input[type=checkbox]', function(e){
        e.preventDefault();
        var $this = $(this),
            $target = $this.closest('.checks'),
            $item  = $this.closest('.item'),
            $inside = $item.find('.inside-wrap'),
            $submit = $('#footer .button');

        if( $target.hasClass('all') ) {
            if($this.is(':checked')) {
                $item.find('input[type=checkbox]').prop('checked', true);
                $submit.removeClass('disabled').addClass('primary');
            } else {
                $item.find('input[type=checkbox]').prop('checked', false);
                $submit.removeClass('primary').addClass('disabled');
            }
        }

        if( $inside.find('input[type=checkbox]').length === $inside.find('input[type=checkbox]:checked').length ) {
            $item.find('.all input[type=checkbox]').prop('checked', true);
            $submit.removeClass('disabled').addClass('primary');
        } else {
            $item.find('.all input[type=checkbox]').prop('checked', false);
            $submit.removeClass('primary').addClass('disabled');
        }
    });

    // 약관 배경 높이
    var $fullHeightTarget = $('.is-full-height');

    if ( $fullHeightTarget.length ) {
        $fullHeightTarget.css({ minHeight : $window.height() - $fullHeightTarget.offset().top - $('#footer').outerHeight() - 24 });
    }

    // collapse
    $document.on('click', '.js-toggle-collapse', function(e) {
        var $this = $(e.target);
        var $parent = $this.closest('.collapse-item');
        var $sr = $this.find('em');
        if ($parent.hasClass('in')) {
            $sr.text('접기');
            $parent.removeClass('in');
        } else {
            $sr.text('펼치기');
            $parent.addClass('in').siblings().removeClass('in');
        }
    });






});
