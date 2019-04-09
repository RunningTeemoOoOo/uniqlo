"use strict";

(function () {
  var $noticeCarouselUl = $('main .notice_carousel ul');
  var liW = $noticeCarouselUl.children('li')[0].offsetWidth;
  var len = $noticeCarouselUl[0].childElementCount;
  var currentIndex = 1;
  $noticeCarouselUl[0].style.width = liW * len + 'px';
  $noticeCarouselUl[0].style.left = (1280 - liW) / 2 - liW + 'px';

  function slideTo(index) {
    console.log(index);
    var list = $noticeCarouselUl[0];

    if (index === len - 1) {
      list.style.transition = 'none';
      list.style.left = 0;
      setTimeout(function () {
        currentIndex = 1;
        list.style.transition = '';
        list.style.left = -currentIndex * liW + 'px';
      }, 50);
      return;
    } else if (index === 0) {
      list.style.transition = 'none';
      list.style.left = -(len - 1) * liW + 'px';
      setTimeout(function () {
        currentIndex = len - 2;
        list.style.transition = '';
        list.style.left = -currentIndex * liW + 'px';
      }, 50);
      return;
    }

    list.style.left = -index * liW + 'px';
  }

  function slideNext() {
    currentIndex++;
    slideTo(currentIndex);
  }

  function slidePrev() {
    currentIndex--;
    slideTo(currentIndex);
  }

  var id;

  function auto() {
    clearInterval(id);
    id = setInterval(slideNext, 3000);
  }

  function stop() {
    clearInterval(id);
  }

  auto();
  var $nextBtn = $('main .notice_carousel .notice_carousel_next');
  var $prevBtn = $('main .notice_carousel .notice_carousel_prev');
  $nextBtn.on('click', slideNext);
  $prevBtn.on('click', slidePrev);
  $noticeCarouselUl.on('mouseover', stop);
  $noticeCarouselUl.on('mouseout', auto);
})();