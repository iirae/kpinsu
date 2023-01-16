// modal open
var scrollTop;
function modalOpen(_el) {
    var $modal = _el,
        $footer = $('#footer'),
        $button = $('#'+ _el).find('.md-modal-foot'),
        _bottom = ($button.length) ? 120 : 60;

    $('html').addClass('is-overlay is-indicator');
    $('#'+ _el).addClass('in');

    setTimeout(function(){
        $('html').removeClass('is-indicator');
        $('#'+ _el).addClass('anim');

        $('#'+ _el).find('.md-modal-body').scrollTop(0, 0);

        if (_el === 'nav') {
            $('#'+ _el).find('.md-modal-body').height(window.innerHeight - 137);
        } else {
            $('#'+ _el).find('.md-modal-body').height(window.innerHeight - _bottom);
        }

        if ($footer.length) {
            $button.css({
                bottom: 'auto',
                top: $footer.position().top + 4
            });
        } else {
            $button.css({
                bottom: 'auto',
                top: window.innerHeight - _bottom + 60
            });
        }
    }, 200);
}

function modalScrollHeight() {
    var $modal = $('.modal-container.in');
    var $modalBody = $modal.find('.md-modal-body');
    var $button = $modal.find('.md-modal-foot');
    var $footer = $('#footer');
    var _bottom = ($button.length) ? 120 : 60;

    $modalBody.height(window.innerHeight - _bottom);
    
    if ($footer.length) {
        $button.css({
            bottom: 'auto',
            top: $footer.position().top + 4
        });
    } else {
        $button.css({
            bottom: 'auto',
            top: window.innerHeight - _bottom + 60
        });
    }
}

$(window).on('resize', function(e) {
    modalScrollHeight();
});

$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    // checkbox
    $document.on('change', '.checks input[type=checkbox]', function(e){
        e.preventDefault();

        var $this = $(this),
            $target = $this.closest('.checks'),
            $wrap = $this.closest('.checks-wrap'),
            $submit = $this.closest('.modal-container-up').find('.button');

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
    $document.on('click', '.js-modal-up', function(e){
        e.preventDefault();
        var $modal = $(this.hash);

        $html.addClass('is-overlay is-indicator is-modal-up');
        $modal.addClass('in');

        setTimeout(function(){
            $html.removeClass('is-indicator');
            $modal.addClass('anim');
        }, 200);
    });

    $document.on('click', '.md-overlay', function(e){
        e.preventDefault();

        $html.removeClass('is-overlay is-indicator is-modal-plan is-modal-up');
        $('.modal-container-up').removeClass('anim');
        $('.modal-container').removeClass('anim');
        $('#sticky').removeClass('in');
        setTimeout(function(){
            $('.modal-container-up').removeClass('in');
            $('.modal-container').removeClass('in');
        }, 400);
    });

    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var $id = $(this).attr('href').replace('#', '');

        modalOpen($id);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $modal.removeClass('anim').find('.md-modal-foot').removeAttr('style');
        $html.removeAttr('style');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);
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

        if (!$target.find('.name-list').length) {
            $('.name-list').hide();
        }
    });

    // collapse
    $document.on('click', '.js-toggle-collapse', function(e) {
        var $this = $(e.target);
        var $parent = $this.closest('.collapse-item');
        var $sr = $this.find('em');
        if ($parent.hasClass('in')) {
            $sr.text('펼치기');
            $parent.removeClass('in');
        } else {
            $sr.text('접기');
            $parent.addClass('in').siblings().removeClass('in');
        }
    });


    // datepicker 기간설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    var dateFormat = "yy.mm.dd",

    from = $( "#from" ).datepicker().on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
    }),
    to = $( "#to" ).datepicker().on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
    });

    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }
        return date;
    }

    // datepicker 날짜설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    $( ".datepicker" ).datepicker();

});
