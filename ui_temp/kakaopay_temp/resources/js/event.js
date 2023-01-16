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

        var $modal = (_url === undefined ) ? $(this.hash) : $('#modalAgreement'),
            _margin = ($modal.find('.md-modal-foot').length) ? $modal.find('.md-modal-foot').offset().top : 0;
            scrollTop = window.pageYOffset;

        $html.addClass('is-overlay is-indicator');
        $modal.addClass('in');

        console.log($window.height());

        setTimeout(function(){
            $html.removeClass('is-indicator').css({"overflow": "hidden"});
      			// $body.css({"position":"fixed", "top": -scrollTop});
            $modal.addClass('anim');
            $modal.find('.md-modal-body').scrollTop(0);
            $modal.find('.md-modal-body').height($window.height() - _margin);

            if ( _url !== undefined ) { // 약관 불러오기
                $modal.find('.md-modal-body').load(_url);
            }
        }, 200);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $html.removeAttr('style');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);

        setTimeout(function(){
            $modal.removeClass('in');
        }, 400);
    });

});
