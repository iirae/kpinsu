$(function() {

    'use strict';

    const $body = $('body');

    let all = $('.section-terms_agree');
    $('.all-check').on('click' , function () {
        if (this.checked) {
            $(':checkbox').prop('checked', true);
            $('.btn-primary').removeClass('disabled');
        }else {
            $(':checkbox').prop('checked', false);
            $('.btn-primary').addClass('disabled');
        }
    });

    $(':checkbox:not(:first)', all).on('click', function(){
        let allCnt = $(":checkbox:not(:first)", all).length;
        let checkedCnt = $(":checkbox:not(:first)", all).filter(":checked").length;
        let requiredCheck = $(":checkbox:not(:first)", all).filter(":visible[required]");
        let  count = 0;

        $.each(requiredCheck, function(index, checkbox) {
            let checked = $(checkbox).prop('checked');
            count = checked ? count+= 1 : count;

            if (requiredCheck.length === count) {
            $('.btn-primary').removeClass('disabled');
            } else {
            $('.btn-primary').addClass('disabled');
            }
        });

        if(allCnt === checkedCnt) {
            $(':checkbox:first', all).prop('checked', true);
        }
        else{
            $(':checkbox:first', all).prop('checked', false);
        }

    });

    // layer
    let scrollTop;
    
    $body.on('click', '.e-layer', function (e) {
        e.preventDefault();
        let targetLayer = $($(e.currentTarget).attr("href"));
            scrollTop = window.pageYOffset;

        $body.addClass("overlay");
        $window.scrollTop(0);
        $(targetLayer).fadeIn();

    });

    $body.on('click', '.layer .e-close, .layer .dimmed', function (e) {
        e.preventDefault();
        let findParent = $(this).parents('.layer');

        $body.removeClass("overlay");
        $window.scrollTop(scrollTop);
        findParent.fadeOut();
    });

});
