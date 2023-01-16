// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".section-main").length;
var $stickyEl = $('#pageUp, #sticky');

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
        $stickyEl.removeAttr('style');
      } else {
          $(".section-main").eq(currentSlideNumber).removeClass("up-scroll down-scroll").addClass("last-scroll");
          $stickyEl.css('top', $(document).height() - $('#footer').outerHeight() );
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      $stickyEl.removeAttr('style');
      if (currentSlideNumber !== 0) {
        if ($(".section-main").eq(totalSlideNumber - 1).hasClass('last-scroll')) {
            $(".section-main").eq(totalSlideNumber - 1).removeClass('last-scroll');
        } else {
          currentSlideNumber--;
        }
      }

      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".section-main").eq(currentSlideNumber - 1),
      $currentSlide = $(".section-main").eq(currentSlideNumber);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
  $currentSlide.addClass('in').siblings().removeClass('in');
}

function previousItem() {
  var $currentSlide = $(".section-main").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  $currentSlide.addClass('in').siblings().removeClass('in');
}


var _scrollTop = 0;
var stickyPageUp = function(){ // pageUp sticky 기능 적용

    // var $stickyEl = $('#pageUp, #sticky'),
    //     $footerEl = $('#footer');
    // var _windowHeight = 0,
    //     _footerOffsetTop = 0;
    // var _flag = null;
    // var _core = function(e){
    //     var _windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || document.body.offsetHeight || $window.height(),
    //         _documentHeight = $(document).height(),
    //         _footerHeight = $('#footer').height();
    //         _scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //
    //     var _bool = (_scrollTop + _windowHeight >= _documentHeight - _footerHeight) ? true : false,
    //         _top = _documentHeight - _scrollTop - _footerHeight + 1;
    //
    //     $('html').toggleClass('is-sticky-pageup', _bool);
    //     if (_bool === true) {
    //         $stickyEl.css('top', _top);
    //     } else {
    //         $stickyEl.removeAttr('style');
    //     }
    // };
    // _core();
    // $window.off('.sticky').on('resize.sticky scroll.sticky', _core);
};
