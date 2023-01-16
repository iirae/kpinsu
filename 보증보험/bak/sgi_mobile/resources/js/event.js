// modal open
var scrollTop;
function modalOpen(_el) {
    var $modal = _el;

    $('html').addClass('is-overlay is-indicator');
    $('#'+ _el).addClass('in');

    setTimeout(function(){
        $('html').removeClass('is-indicator');
        $('#'+ _el).addClass('anim');
        $('#'+ _el).find('.md-modal-body').height($(window).height() - 120);
        $('#'+ _el).find('.md-modal-foot').css({
            bottom: 'auto',
            top: $('#footer').position().top + 2
        });
    }, 200);
}

$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    $document.on('click', '.md-overlay', function(e){
        e.preventDefault();

        $html.removeClass('is-overlay is-indicator is-modal-plan is-modal-up');
        $('.modal-container-up').removeClass('anim');
        $('.modal-container').removeClass('anim');
        setTimeout(function(){
            $('.modal-container-up').removeClass('in');
            $('.modal-container').removeClass('in');
        }, 400);
    });

    // modal
    var scrollTop;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        scrollTop = window.pageYOffset;
        var $id = $(this).attr('href').replace('#', '');

        modalOpen($id);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $html.removeAttr('style').removeClass('is-overlay');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);

        setTimeout(function(){
            $modal.removeClass('in');
        }, 400);

        if ($modal.is('#modalChildren') && !$modal.find('input:checked').length) { // 추가할인 자녀할인 미 선택시
            $('#add3').prop('checked', false);
        }
    });

    // datepicker 기간설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    var dateFormat = "yy.mm.dd",

    from = $( ".js-datepicker .from" ).datepicker().on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
    }),
    to = $( ".js-datepicker .to" ).datepicker().on( "change", function() {
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

    $document.on('click', '.js-price ', function(e){
        e.preventDefault();
        $('.price-ex').addClass('in');
    });

    $document.on('click', '.price-ex .close', function(e){
        e.preventDefault();
        $('.price-ex').removeClass('in');
    });

});
