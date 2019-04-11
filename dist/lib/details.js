"use strict";

(function () {
  $('.view').on('mousemove', function (evt) {
    console.log('123');
    var x = evt.offsetX;
    var y = evt.offsetY;
    x = x - $('.float').width() / 2;
    y = y - $('.float').height() / 2;

    if (x < 0) {
      x = 0;
    }

    if (y < 0) {
      y = 0;
    }

    if (x > $('.view').width() - $('.float').width()) {
      x = $('.view').width() - $('.float').width();
    }

    if (y > $('.view').height() - $('.float').height()) {
      y = $('.view').height() - $('.float').height();
    }

    $('.float').css({
      left: x,
      top: y
    });
    $('.magnify img').css({
      left: -2 * x,
      top: -2 * y
    });
  }).mouseover(function () {
    $('.float, .magnify img').show();
  }).mouseout(function () {
    $('.float, .magnify img').hide();
  });
})();