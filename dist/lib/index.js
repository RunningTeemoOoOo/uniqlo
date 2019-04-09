"use strict";

(function () {
  function noticeCarouse() {
    var $noticeCarouselUl = $('main .notice_carousel ul');
    var liW = $noticeCarouselUl.children('li')[0].offsetWidth;
    var len = $noticeCarouselUl[0].childElementCount;
    var currentIndex = 1;
    $noticeCarouselUl[0].style.width = liW * len + 'px';
    $noticeCarouselUl[0].style.left = (1280 - liW) / 2 - liW + 'px';

    function slideTo(index) {
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
    var $noticeCarousel = $('main .notice_carousel');
    $nextBtn.on('click', slideNext);
    $prevBtn.on('click', slidePrev);
    $noticeCarousel.on('mouseover', stop);
    $noticeCarousel.on('mouseout', auto);
  }

  function bigCarouse() {
    var currentIndex = 1;
    var $ul = $('main .carousel .ulList .list');
    var $pagination = $('main .carousel .pagination');
    var liW = $ul.children('li')[0].offsetWidth;
    var len = $ul[0].childElementCount;

    function slideTo(index) {
      var list = $ul[0];
      var pointerFocus;

      if (index === len - 1) {
        list.style.transition = 'none';
        list.style.left = 0;
        setTimeout(function () {
          currentIndex = 1;
          list.style.transition = '';
          list.style.left = -currentIndex * liW + 'px';
          document.querySelector('main .carousel .pagination .focus').classList.remove('focus');
          $pagination.children('li')[0].classList.add('focus');
        }, 50);
        return;
      } else if (index === 0) {
        list.style.transition = 'none';
        list.style.left = -(len - 1) * liW + 'px';
        setTimeout(function () {
          currentIndex = len - 2;
          list.style.transition = '';
          list.style.left = -currentIndex * liW + 'px';
          document.querySelector('main .carousel .pagination .focus').classList.remove('focus');
          $pagination.children('li')[len - 3].classList.add('focus');
        }, 50);
        return;
      }

      if (index === len - 1) {
        pointerFocus = 0;
      } else if (index === 0) {
        pointerFocus = len - 3;
      } else {
        pointerFocus = index - 1;
      }

      document.querySelector('main .carousel .pagination .focus').classList.remove('focus');
      $pagination.children('li')[pointerFocus].classList.add('focus');
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
      id = setInterval(slideNext, 2000);
    }

    function stop() {
      clearInterval(id);
    }

    function pointersEvent() {
      var pointers = document.querySelectorAll('main .carousel .pagination li');

      for (var i = 0; i < pointers.length; i++) {
        pointers[i].index = i;

        pointers[i].onmouseover = function () {
          currentIndex = this.index + 1;
          slideTo(currentIndex);
        };
      }
    }

    var $prevBtn = $('main .carousel .carousel_prev');
    var $nextBtn = $('main .carousel .carousel_next');
    var $carousel = $('main .carousel');
    $prevBtn.on('click', slidePrev);
    $nextBtn.on('click', slideNext);
    $carousel.on('mouseover', stop);
    $carousel.on('mouseout', auto);
    auto();
    pointersEvent();
  }

  function views() {
    var $titleNav = $('main .views .view .title_nav');
    var $goods = $('main .views .view .goods');
    var thisIndex;
    $titleNav.children('li').on('click', function () {
      $(this).parent().children('li').removeClass('focus');
      $(this).addClass('focus');
      thisIndex = $(this).index();
      $(this).parent().siblings('.goods').children('li').removeClass('focus');
      $($(this).parent().siblings('.goods').children('li')[thisIndex]).addClass('focus');
    });
  }

  noticeCarouse();
  bigCarouse();
  views();
})();