'use strict';

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".page-main .section").length;
var $stickyEl = $('#aside');

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  var delta = getDelta(evt);

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
        $stickyEl.removeAttr('style');
      } else {
          $(".page-main .section").eq(currentSlideNumber).removeClass("up-scroll down-scroll").addClass("last-scroll");
          $stickyEl.css('bottom', 60 + $('#footer').outerHeight() );
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      $stickyEl.removeAttr('style');
      if (currentSlideNumber !== 0) {
        if ($(".page-main .section").eq(totalSlideNumber - 1).hasClass('last-scroll')) {
            $(".page-main .section").eq(totalSlideNumber - 1).removeClass('last-scroll');
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

// ------------- CUSTOM CODE ------------- //
var scrollThrotlle = _.throttle(function(evt) {
  var delta = getDelta(evt);

  var currentSection = $(".page-main .section").eq(currentSlideNumber),
      innerHeight = Math.floor(currentSection.find(".inner").outerHeight()),
      curSectionHeight = Math.floor(currentSection.outerHeight()),
      sectionScrollTop = Math.floor(currentSection.scrollTop()),
      scrollBottom = (innerHeight - curSectionHeight === sectionScrollTop) || (innerHeight - curSectionHeight === sectionScrollTop + 1) || (innerHeight - curSectionHeight === sectionScrollTop - 1);
  if (delta <= -scrollSensitivitySetting) {
    //Down scroll
    //섹션내부 스크롤이 있고 최하단이 아닌 경우 : 스크롤체크 이벤트 시작, 스크롤 이벤트 종료
    if (innerHeight > curSectionHeight 
        && !scrollBottom) {
      removeScollEvent();
      addScollCheckEvent();

    //패럴럭스 스크롤 이동 실행
    } else {
      parallaxScroll(evt);
    }
  }
  if (delta >= scrollSensitivitySetting) {
    //Up scroll
    //섹션내부 스크롤이 최상단이 아닌 경우 : 스크롤체크 이벤트 시작, 스크롤 이벤트 종료
    if (currentSection.scrollTop() != 0) {
      removeScollEvent();
      addScollCheckEvent();

    //패럴럭스 스크롤 이동 실행
    } else {
      parallaxScroll(evt);
    }
  }
}, 60);

var scrollCheckThrottle = _.throttle(function(evt){
  var delta = getDelta(evt);

  var currentSection = $(".page-main .section").eq(currentSlideNumber),
      innerHeight = Math.floor(currentSection.find(".inner").outerHeight()),
      curSectionHeight = Math.floor(currentSection.outerHeight()),
      sectionScrollTop = Math.floor(currentSection.scrollTop()),
      scrollBottom = (innerHeight - curSectionHeight === sectionScrollTop) || (innerHeight - curSectionHeight === sectionScrollTop + 1) || (innerHeight - curSectionHeight === sectionScrollTop - 1);

  if (delta <= -scrollSensitivitySetting) {
    //Down scroll
    //섹션내부 스크롤이 최하단에 도달했을 때 : 스크롤체크 이벤트 종료, 스크롤 이벤트 시작
    if (scrollBottom) {
      removeScrollCheckEvent();
      addScollEvent();
      parallaxScroll(evt);
    }
  }
  if (delta >= scrollSensitivitySetting) {
    //Up scroll
    //세션내부 스크롤이 최상단에 도달했을 때 : 스크롤체크 이벤트 종료, 스크롤 이벤트 시작
    if (currentSection.scrollTop() == 0) {
      removeScrollCheckEvent();
      addScollEvent();
      parallaxScroll(evt);
    }
  }
}, 60);

function addScollCheckEvent() {
  window.addEventListener(mousewheelEvent, scrollCheckThrottle, false);
}

function removeScrollCheckEvent() {
  window.removeEventListener(mousewheelEvent, scrollCheckThrottle, false);
}

function addScollEvent() {
  window.addEventListener(mousewheelEvent, scrollThrotlle, false);
}

function removeScollEvent() {
  window.removeEventListener(mousewheelEvent, scrollThrotlle, false);
}

function getDelta(evt) {
  var delta;
  if (isFirefox) {
    //Set delta for Firefox
      delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    // delta = -evt.deltaY;
    delta = 0;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }
  return delta;
}
// ------------- CUSTOM CODE ------------- //

if (totalSlideNumber !== 0) {
  addScollEvent();
  if(!isIe) {
    $('#btnTop').on('click', function() {
        goTop();
    });
  }
}

$('body').on('click', '#nav li', function(e) {
  e.preventDefault();
  const thisIndex = $(this).index();
  goItem(thisIndex);
});

// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".page-main .section").eq(currentSlideNumber - 1),
      $currentSlide = $(".page-main .section").eq(currentSlideNumber);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
  $currentSlide.addClass('on').siblings().removeClass('on');
  $("#nav li").eq(currentSlideNumber).addClass('on').siblings().removeClass('on');
}

function previousItem() {
  var $currentSlide = $(".page-main .section").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
  $currentSlide.addClass('on').siblings().removeClass('on');
  $("#nav li").eq(currentSlideNumber).addClass('on').siblings().removeClass('on');
}

function goItem(thisIndex) {
  var $sections = $(".page-main .section");

    $.each($sections, function(index, section) {
      // down
      if(currentSlideNumber <= thisIndex) {
        if(index < thisIndex) {
            currentSlideNumber = thisIndex;
            nextItem();
            $(section).removeClass("up-scroll").addClass("down-scroll");
        }
      // up
      } else if(currentSlideNumber > thisIndex) {
        if(thisIndex <=index) {
            currentSlideNumber = thisIndex;
            previousItem();
            $(section).removeClass("down-scroll").addClass("up-scroll");
        }

        if ($($sections).eq(totalSlideNumber - 1).hasClass('last-scroll')) {
            $($sections).eq(totalSlideNumber - 1).removeClass('last-scroll');
        } 

        $('.page-main .section').scrollTop(0);
      }
    });

  removeScrollCheckEvent();
  addScollEvent();
}

function goTop() {
  $('.page-main .section').removeClass('down-scroll').removeClass('on').addClass('up-scroll');
  $('.page-main .section:first-of-type').addClass('on');
  $('.page-main .section').scrollTop(0);
  currentSlideNumber = 0;
  $("#nav li").eq(currentSlideNumber).addClass('on').siblings().removeClass('on');
  removeScrollCheckEvent();
  addScollEvent();
}
