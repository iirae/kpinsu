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
        var $modal = $(this.hash),
            _margin = ($modal.find('.md-modal-foot').length) ? 60 : 0;
            scrollTop = window.pageYOffset;

        $html.addClass('is-overlay is-indicator');
        $modal.addClass('in');

        var $this = $(this);

        setTimeout(function(){
            $html.removeClass('is-indicator').css({"overflow": "hidden"});
      			// $body.css({"position":"fixed", "top": -scrollTop});
            $modal.addClass('anim');
            $modal.find('.md-modal-body').scrollTop(0);
            $modal.find('.md-modal-body').height($window.height() - _margin);
            $modal.find('.md-modal-foot').css({
                bottom: 'auto',
                top: $('#footer').position().top + 2
            });
        }, 200);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container, .modal-container-up');

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


});
