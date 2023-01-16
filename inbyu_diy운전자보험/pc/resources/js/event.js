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
        var _url  = $(this).data('url'),
            _title = $(this).data('title');

        var $modal = $(this.hash);
            scrollTop = window.pageYOffset;

        $html.addClass('is-overlay is-indicator is-modal');
        $modal.addClass('in').siblings('.modal-container').removeClass('anim');

        setTimeout(function(){
            $html.removeClass('is-indicator').css({"overflow": "hidden"});
  			// $body.css({"position":"fixed", 'overflow' : 'hidden', "top": -scrollTop});
            $modal.addClass('anim').siblings('.modal-container').removeClass('in');
            $modal.find('.srcoll-y').scrollTop(0);

            if ( _url !== undefined ) { // 약관 불러오기
                console.log(_title);
                $modal.find('h3.title').text(_title);
                $modal.find('.md-modal-body').load(_url);
            }
        }, 200);
    });

    $document.on('click', '.js-modal-close', function(e){
        e.preventDefault();
        var $modal = $(this).closest('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $html.removeAttr('style').removeClass('is-overlay is-modal');
        $body.removeAttr('style');
        window.scrollTo(0, scrollTop);
        setTimeout(function(){
            $modal.removeClass('in');
        }, 400);
    });

    $document.on('click', '.md-overlay', function(e){
        e.preventDefault();
        var $modal = $('.modal-container');

        $modal.removeClass('anim').find('.md-modal-body').removeAttr('style');
        $html.removeAttr('style').removeClass('is-overlay is-indicator is-modal');
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

    // dropdown
    $document.on('click', '.dropdown .more', function(e){
        e.preventDefault();
        var $this = $(this),
            $target = $this.closest('.dropdown');


        if ($target.hasClass('in')) {
            $target.removeClass('in');
            $html.removeClass('is-dropdown');
        } else {
            $('.dropdown').removeClass('in');
            $target.addClass('in');
            $html.addClass('is-dropdown');
        }
    });
    $document.on('blur', '.dropdown', function(e){
        e.preventDefault();

        var $this = $(this);

        if ($this.closest('.dropdown')) return false;

        $this.removeClass('in');
        $html.removeClass('is-dropdown');
    });

    $document.on('click', '.dropdown .list a', function(e){
        e.preventDefault();
        var $this = $(this),
            $target = $this.closest('.dropdown');

        $this.closest('li').addClass('in').siblings().removeClass('in');
        $target.children('.more').html($this.html());
        $target.removeClass('in').addClass('current');
    });
});
