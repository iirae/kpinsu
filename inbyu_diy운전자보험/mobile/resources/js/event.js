$(function() {

    'use strict';

    var $window = window.$window || $(window),
        $document = window.$document || $(document),
        $html = window.$html || $('html'),
        $body = $('body'),
        $header = window.$header || $('#header');

    // modal
    var scrollTop;
    $document.on('click', '.js-modal', function(e){
        e.preventDefault();
        var _url  = $(this).data('url');

        // var $modal = (_url === undefined ) ? $(this.hash) : $('#modalAgreement');
        var $modal = $(this.hash);
            scrollTop = window.pageYOffset;
        var _margin = ($modal.find('.md-modal-foot').length) ? 90 : 30;

        $html.addClass('is-overlay is-indicator is-modal');
        $modal.addClass('in').siblings('.modal-container').removeClass('anim');

        setTimeout(function(){
            $html.removeClass('is-indicator').css({"overflow": "hidden"});
  			// $body.css({"position":"fixed", 'overflow' : 'hidden', "top": -scrollTop});
            $modal.addClass('anim').siblings('.modal-container').removeClass('in');
            $modal.find('.md-modal-body').height($window.height() - _margin).scrollTop(0);

            if ( _url !== undefined ) { // 약관 불러오기
                $modal.find('.md-modal-body').load(_url);
            }
        }, 200);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $html.removeAttr('style').removeClass('is-overlay is-modal-up is-modal');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);
        setTimeout(function(){
            $modal.removeClass('in');
        }, 400);
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

    // toggler
    $document.on('click', '.toggle-nav a', function(e) {
        var $this = $(e.target),
            $item = $this.closest('li'),
            $target = $this.closest('.toggler').find('.toggle');

        $item.addClass('in').siblings().removeClass('in');
        $target.eq($item.index()).addClass('in').siblings().removeClass('in');
    });
});
