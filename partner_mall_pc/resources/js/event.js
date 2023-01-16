// modal open
function modalOpen(_el) {
    var $modal = _el;

    $('html').addClass('is-overlay is-indicator');
    $('#'+ _el).addClass('in');

    setTimeout(function(){
        $('html').removeClass('is-indicator');
        $('#'+ _el).addClass('anim');
    }, 200);
}

$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    // toggler
    $document.on('click', '.toggler .tab a', function(e) {
        var $this = $(e.target);
        var $tabItem = $this.closest('li'),
            _idx = $tabItem.index(),
            $wrap = $this.closest('.toggler');

        $wrap.find('.tab-content').children().eq(_idx).addClass('in').siblings().removeClass('in');
        if ($tabItem.hasClass('in')) {
            $tabItem.removeClass('in');
        } else {
            $tabItem.addClass('in').siblings().removeClass('in');
        }
    });


    var scrollTop;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var $id = $(this).attr('href').replace('#', '');

        modalOpen($id);
    });

    // modal 내 닫기
    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $html.removeClass('is-overlay');
        $modal.removeClass('anim');
        setTimeout(function(){
            $modal.removeClass('in');
        }, 400);
    });

    // overlay click시 modal 닫기
    $document.on('click', '.md-overlay', function(e){
        e.preventDefault();

        if ( !$('#modalJoinGuide').hasClass('in') ) {
            $html.removeClass('is-overlay is-indicator');
            $('.modal-container').removeClass('anim');
            setTimeout(function(){
                $('.modal-container').removeClass('in');
            }, 400);
        }
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

    // toggler
    $document.on('click', '.tab-toggler .tab a', function(e) {
        var $this = $(e.target),
            $item = $this.closest('li'),
            _idx = $item.index(),
            $target = $this.closest('.tab-toggler').find('.item');

        $item.addClass('in').siblings().removeClass('in');
        $target.eq(_idx).addClass('in').siblings().removeClass('in');
    });

    // datepicker 기간설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    var dateFormat = "yy.mm.dd",

    from = $( ".js-datepicker-from .text" ).datepicker().on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
    }),
    to = $( ".js-datepicker-to .text" ).datepicker().on( "change", function() {
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
});
