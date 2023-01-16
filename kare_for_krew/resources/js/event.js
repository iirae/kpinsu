$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    // overlay click시 modal 닫기
    $document.on('click', '.md-overlay', function(e){
        e.preventDefault();

        $html.removeClass('is-overlay is-indicator');
        $('.modal-container-mini').removeClass('anim');
        $('.modal-container').removeClass('anim');
        setTimeout(function(){
            $('.modal-container-mini').removeClass('in');
            $('.modal-container').removeClass('in');
        }, 400);
    });

    // modal open
    var scrollTop;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var $modal = $(this.hash);
            scrollTop = window.pageYOffset;

        $html.addClass('is-overlay is-indicator');
        $modal.addClass('in');

        setTimeout(function(){
            $html.removeClass('is-indicator').css({"overflow": "hidden"});
            $modal.addClass('anim');
            $modal.find('.md-modal-body').height($window.height() - 116);
            $modal.find('.md-modal-body').scrollTop(0);
        }, 200);
    });

    // modal 내 닫기
    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim');
        $html.removeAttr('style');
        $body.removeAttr('style');
        $('.modal-container-mini').removeClass('anim');
        window.scrollTo(0, scrollTop);

        setTimeout(function(){
            $modal.removeClass('in');
            $('.modal-container-mini').removeClass('in');
        }, 400);

        if ( !$modal.siblings('.modal-container').hasClass('in')) {
            $html.removeClass('is-overlay');
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
    $( "#datepicker" ).datepicker();

});
