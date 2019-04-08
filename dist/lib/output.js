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

    window.onscroll = function () {
      var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;

      if (scrollTop > 50) {
        $sec_list_cover.css({
          display: 'none'
        });
        $secListUlLis.removeClass('show');
      }
    };
  });
})();