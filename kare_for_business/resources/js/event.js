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

    // header
    // $document.on('mouseover', '#header .nav', function(e) {
    //     var $this = $(this);
    //     $this.addClass('has-over');
    //     $this.children('.bg').css({ height :95 + $this.find('li:eq(1) ul.d2').outerHeight() });
    // });
    // $document.on('mouseleave', '#header .nav', function(e) {
    //     var $this = $(this);
    //     $this.removeClass('has-over');
    //     $this.children('.bg').removeAttr('style');
    // });
    $document.on('mouseover', '#header a.d1', function(e) {
        e.preventDefault();
        e.stopPropagation();
        let $this = $(e.target);
        const subLeft = $this.position().left + ($this.outerWidth() / 2);

        $this.parents('li.d1').find('.sub ul.d2').css('left', subLeft);

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

        if ( !$('#modalJoinGuide').hasClass('in') && !$('#modalPaymnetMethod').hasClass('in') ) {
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

    // tooltip
    $document.on('click', '.js-tooltip', function(e) {
        var $this = $(this),
            _message = ($this.data('message')) ? $this.data('message') : $this.closest('.item').find('.message').html(),
            _left = $this.position().left + ( $this.width()/2 ),
            _top = $this.position().top + $this.outerHeight() + 10,
            _width = $this.data('width');

        if ($this.hasClass('in')) {
            $this.removeClass('in');
            $this.next('.tooltip').removeClass('in');
            setTimeout(function(){
                $this.next('.tooltip').remove();
            }, 500);
        } else {
            $this.addClass('in');
            $this.after('<div class="tooltip" style="width:' + _width + 'px; top: ' + _top + 'px; left: ' + _left + 'px;"><div class="module">' + _message + '</div></div>');
            setTimeout(function(){
                $this.next('.tooltip').addClass('in');
            }, 10);
        }
    });

    // datepicker 날짜설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    $( "#datepicker, .datepicker" ).datepicker({
        changeYear: true,
        changeMonth: true
    });

    // datepicker 기간설정
    // 개발시 필요에따라 하위 부분 주석처리해주시고 별도로 빼서 사용하셔도 됩니다.
    var dateFormat = "yy.mm.dd",

    from = $( "#from, .datepicker .from" ).datepicker().on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
    }),
    to = $( "#to, .datepicker .to" ).datepicker().on( "change", function() {
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
    //
    // var modalOpen = function(id){ // pageUp sticky 기능 적용
    //
    //     console.log(typeof(id));
    //
    //
    //
    //     $html.addClass('is-overlay is-indicator');
    //     id.addClass('in');
    //
    //     setTimeout(function(){
    //         $html.removeClass('is-indicator');
    //         id.addClass('anim');
    //     }, 200);
    //
    // };
});
