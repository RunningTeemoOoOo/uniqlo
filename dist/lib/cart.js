"use strict";

(function () {
  $.ajax({
    url: './../UNIQLO/api/cart.php',
    data: {
      username: 'admin'
    },
    success: function success(data) {
      var products = JSON.parse(data);
      var htmlStr = '';
      var trArray = products.map(function (product) {
        var tr = "\n                <tr>\n                    <td><label><input type=\"checkbox\"></label></td>\n                    <td><a href=\"javascript:void(0)\">\u4FEE\u6539\u914D\u9001\u65B9\u5F0F</a></td>\n                    <td>\n                        <img src=\"./../resource".concat(product.img, "\" alt=\"\">\n                        <span>").concat(product.description, "</span>\n                    </td>\n                    <td class=\"price\">").concat(product.price, "</td>\n                    <td><button class=\"drop\">-</button><p class=\"count\">0</p><button class=\"add\">+</button></td>\n                    <td class=\"total\">0</td>\n                    <td>\n                        <p><a href=\"javascript:void(0)\">\u79FB\u5165\u6536\u85CF\u5939</a></p>\n                        <p class=\"deleteFromCart\"><a href=\"javascript:void(0)\">\u5220\u9664</a></p>\n                        <p><a href=\"javascript:void(0)\">\u67E5\u627E\u76F8\u4F3C</a></p>\n                    </td>\n                </tr>\n                ");
        return tr;
      });
      var $tbody = $('tbody');
      $tbody.html(trArray.join(''));
      events();
    },
    error: function error(xhr) {
      console.error('请求失败');
    }
  });

  function events() {
    var $add = $('table tbody tr .add');
    var $drop = $('table tbody tr .drop');
    $add.on('click', function () {
      var coun = Number($(this).siblings('.count').html());
      coun++;
      $(this).siblings('.count').html(coun);
      var price = Number($(this).parent().siblings('.price').html());
      price = coun * price;
      $(this).parent().siblings('.total').html(price);
      sub();
    });
    $drop.on('click', function () {
      var coun = Number($(this).siblings('.count').html());
      coun--;

      if (coun < 0) {
        coun = 0;
      }

      $(this).siblings('.count').html(coun);
      var price = Number($(this).parent().siblings('.price').html());
      price = coun * price;
      $(this).parent().siblings('.total').html(price);
      sub();
    });
    $('.deleteFromCart').on('click', function () {
      var description = $(this).parent().prevAll().children('span').html();
      $.ajax({
        method: 'POST',
        url: './../UNIQLO/api/deleteFromCart.php',
        data: {
          description: "".concat(description)
        },
        success: function success(data) {
          if (JSON.parse(data).result) {
            alert('删除成功');
            window.location.href = './cart.html';
          } else {
            alert('删除失败');
          }
        },
        error: function error(xhr) {
          console.error(xhr);
        }
      });
    });
  }

  function sub() {
    var $sub = $('.cartBtn .all span');
    var $checked = $('table tbody input[type=checkbox]:checked');
    var sum = 0;

    for (var i = 0; i < $checked.length; i++) {
      sum += Number($checked.parents('td').siblings('.total')[i].innerHTML);
    }

    $sub.html(sum);
  }

  document.querySelector('thead input[type=checkbox]').onchange = function () {
    var checkboxes = document.querySelectorAll('tbody input[type=checkbox]');

    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = this.checked;
    }

    sub();
  };

  document.querySelector('tbody').onchange = function (evt) {
    if (evt.target.tagName === 'INPUT') {
      var allCount = document.querySelectorAll('tbody input[type=checkbox]').length;
      var checkedCount = document.querySelectorAll('tbody input[type=checkbox]:checked').length;
      document.querySelector('thead input[type=checkbox]').checked = allCount === checkedCount;
    }

    sub();
  };
})();