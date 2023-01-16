$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $header = window.$header || $('#header');

    // checkbox
    $document.on('change', '.checks input[type=checkbox]', function(e){
        e.preventDefault();
        var $this = $(this),
            $target = $this.closest('.checks'),
            $wrap = $this.closest('.checks-wrap'),
            $submit = $('#modalTerms .button');

        if( $target.parent().hasClass('all') ) {
            if($this.is(':checked')) {
                $wrap.find('input[type=checkbox]').prop('checked', true);
                $submit.removeClass('disabled').addClass('primary');
            } else {
                $wrap.find('input[type=checkbox]').prop('checked', false);
                $submit.removeClass('primary').addClass('disabled');
            }
        } else {
            if( $this.is(':checked') && $wrap.find('input[type=checkbox]').length - 1 === $wrap.find('input[type=checkbox]:checked').length ) {
                $wrap.find('.all input[type=checkbox]').prop('checked', true);
                $submit.removeClass('disabled').addClass('primary');
            } else {
                $wrap.find('.all input[type=checkbox]').prop('checked', false);
                $submit.removeClass('primary').addClass('disabled');
            }
        }
    });

    // modal 약관동의
    $document.on('click', '.js-terms', function(e){
        e.preventDefault();
        var $modal = $('#modalTerms');

        $html.addClass('is-overlay is-indicator is-modal-terms');
        $modal.addClass('in');

        setTimeout(function(){
            $html.removeClass('is-indicator');
            $modal.addClass('anim');
        }, 200);
    });

    $document.on('click', '.is-overlay .md-overlay', function(e){
        e.preventDefault();
        var $modal = $('#modalTerms');

        $html.removeClass('is-overlay is-indicator is-modal-terms is-modal-calendar is-modal-datepicker');
    });

    // modal 약관 상세
    var scrollTop = 0;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var $modal = $(this.hash);

        scrollTop = $window.scrollTop();

        $html.addClass('is-overlay is-indicator');
        $modal.addClass('in');

        setTimeout(function(){
            $html.removeClass('is-indicator');
            $modal.addClass('anim');
            $modal.find('.md-modal-body').height($window.height() - 116);
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
        setTimeout(function(){
            $modal.removeClass('in');
            // $modal.find('.md-modal-body').removeAttr('tabIndex');
        }, 400);

        if ( !$modal.is('#modalAgreement')) {
            $html.removeClass('is-overlay');
        }
    });

    // focus highlight
    $document.on('focusin', '.section-form input, .section-form select', function(e){
        e.preventDefault();
        var $this = $(this),
            $target = $this.closest('.item');

        $('.section-form').find('.item').removeClass('in');
        $target.addClass('in');
    });

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
