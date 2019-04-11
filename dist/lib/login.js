"use strict";

(function () {
  var isTelT = false;
  var isPasswdT = false;
  var $tel = $('.loginForm .telNum input');
  var $passwd = $('.loginForm .passWD input');
  var $sub = $('.loginForm .sub input');
  $tel.on('blur', function () {
    var telReg = /^1[3-9]\d{9}$/;
    var tel = $tel.val();

    if (telReg.test(tel)) {
      $.ajax({
        method: 'POST',
        url: './../UNIQLO/api/checkUser.php',
        data: {
          tel: "".concat(tel)
        },
        success: function success(data) {
          if (JSON.parse(data).result) {
            isTelT = true;
            $tel.siblings().children().html('');
          } else {
            isTelT = false;
            $tel.siblings().children().html('用户名不存在');
          }
        },
        error: function error(xhr) {
          console.log(xhr);
        }
      });
    } else {
      isTelT = false;
      $tel.siblings().children().html('请输入正确的手机号');
    }

    change();
  });
  $passwd.on('blur', function () {
    var passwdReg = /^[A-Za-z0-9]{6,16}$/;
    var passwd = $passwd.val();

    if (passwdReg.test(passwd)) {
      isPasswdT = true;
      $passwd.siblings().children().html('');
    } else {
      $passwd.siblings().children().html('密码格式为6-16位的数字或字母');
      isPasswdT = false;
    }

    change();
  });

  function change() {
    if (isTelT && isPasswdT) {
      $sub.css({
        background: '#28788c'
      });
    } else {
      $sub.css({
        background: '#dadada'
      });
    }
  }

  $sub.on('click', function (evt) {
    if (isTelT && isPasswdT) {
      var tel = $tel.val();
      var passwd = $passwd.val();
      $.ajax({
        method: 'POST',
        url: './../UNIQLO/api/login.php',
        data: {
          tel: "".concat(tel),
          pw: "".concat(passwd)
        },
        success: function success(data) {
          if (JSON.parse(data).result) {
            alert('登陆成功');
            window.location.href = './../index.html';
          } else {
            alert('用户名或密码不正确');
          }
        },
        error: function error(xhr) {
          alert('登陆失败');
        }
      });
    } else {
      evt.stopPropagation();
      evt.preventDefault();
    }
  });
})();