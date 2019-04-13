"use strict";

(function () {
  function views() {
    $('.view').on('mousemove', function (evt) {
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
        // left: x,
        // top: y
        borderTopWidth: y,
        borderRightWidth: 500 - 250 - x,
        borderBottomWidth: 500 - 250 - y,
        borderLeftWidth: x
      });
      $('.magnify img').css({
        left: -2 * x,
        top: -2 * y
      });
    }).mouseover(function () {
      $('.magnify').css({
        zIndex: 1
      });
      $('.float, .magnify img').show();
      $('.mask').show();
    }).mouseout(function () {
      $('.magnify').css({
        zIndex: -1
      });
      $('.float, .magnify img').hide();
      $('.mask').hide();
    });
  }

  views();

  function cart() {
    $('.cart').on('click', function () {
      var name = $('.name').html();
      var price = $('.price').html();
      var description = $('.tit').html() + " " + name;
      var imgURL = $($('.magnify img'))[0].src;
      var imgUrlReg = /\/imgs\/.*/;
      var img = imgURL.match(imgUrlReg);
      $.ajax({
        method: 'POST',
        url: './../UNIQLO/api/addInCart.php',
        data: {
          name: "".concat(name),
          price: "".concat(price),
          description: "".concat(description),
          img: "".concat(img)
        },
        success: function success(data) {
          if (JSON.parse(data).result) {
            alert('添加成功');
            window.location.href = './cart.html';
          } else {
            alert('添加失败');
          }
        },
        error: function error(xhr) {
          console.error(xhr);
        }
      });
    });
  }

  cart();
})();