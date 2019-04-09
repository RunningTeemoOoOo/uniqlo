"use strict";

(function () {
  var $headerNavUlLis = $('header nav .left li');
  var $secListUlLis = $('header .sec_list .sec_list_ul').children('li');
  var $sec_list_cover = $('header .sec_list_cover');
  $headerNavUlLis.on('click', function () {
    $sec_list_cover.css({
      display: 'block'
    });
    $secListUlLis.removeClass('show');
    $($secListUlLis[$(this).index() - 1]).addClass('show');
    $sec_list_cover.on('click', function () {
      $sec_list_cover.css({
        display: 'none'
      });
      $secListUlLis.removeClass('show');
    });
  });
  var $hearerTop = $('header .top');
  var $toTop = $('#toTop');

  window.onscroll = function () {
    var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;

    if (scrollTop > 50) {
      $sec_list_cover.css({
        display: 'none'
      });
      $secListUlLis.removeClass('show');
      $hearerTop.css({
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 0 5px 2px #ddd',
        width: '1280px',
        zIndex: '10'
      });
      $toTop.css({
        display: 'block'
      });
    } else {
      $hearerTop.css({
        position: 'relative',
        background: 'none',
        boxShadow: 'none'
      });
      $toTop.css({
        display: 'none'
      });
    }
  };

  $toTop.on('click', function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
})();