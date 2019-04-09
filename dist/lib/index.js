"use strict";

(function () {
  var $noticeCarouselUl = $('main .notice_carousel ul');
  var liW = $noticeCarouselUl.children('li')[0].offsetWidth;
  var len = $noticeCarouselUl[0].childElementCount;
  $noticeCarouselUl[0].style.width = liW * len + 'px';
  $noticeCarouselUl[0].style.left = (1280 - liW) / 2 - liW + 'px';

  function slideTo(index) {}
})();