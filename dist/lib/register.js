"use strict";

(function () {
  var isTelT = false;
  var isPasswdT = false;
  var isPasswdCT = false;
  var isCheckT = false;
  var $tel = $('.registerForm .telNum input');
  var $passwd = $('.registerForm .passWD input');
  var $passwdc = $('.registerForm .passWDC input');
  var $check = $('.registerForm .check-protocol input');
  var $sub = $('.registerForm .sub input');
  $tel.on('blur', function () {
    var telReg = /^1[3-9]\d{9}$/;
    var tel = $tel.val();

    if (telReg.test(tel)) {
      ////////AJAX
      isTelT = true;
      $tel.siblings().children().html('');
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
      $passwd.siblings().children().html(''); //////AJAX
    } else {
      $passwd.siblings().children().html('输入密码格式不正确');
      isPasswdT = false;
    }

    change();
  });
  $passwdc.on('blur', function () {
    var passwd = $passwd.val();
    var passwdc = $passwdc.val();

    if (passwd === passwdc) {
      isPasswdCT = true;
      $passwdc.siblings().children().html('');
    } else {
      $passwdc.siblings().children().html('两次密码输入不一致');
      isPasswdCT = false;
    }

    change();
  });
  $check.on('click', function () {
    if (isCheckT) {
      isCheckT = false;
    } else {
      isCheckT = true;
    }

    change();
  });
  $sub.on('click', function (evt) {
    if (isTelT && isPasswdT && isPasswdCT && isCheckT) {
      var tel = $tel.val();
      var passwd = $passwd.val();
      $.ajax({
        method: 'POST',
        url: './../UNIQLO/api/register.php',
        data: {
          tel: "".concat(tel),
          pw: "".concat(passwd)
        },
        success: function success(data) {
          if (JSON.parse(data).result) {
            alert('注册成功');
            window.location.href = './../index.html';
          } else {
            alert('注册失败');
          }
        },
        error: function error(xhr) {
          alert('注册失败');
        }
      });
    } else {
      evt.stopPropagation();
      evt.preventDefault();
    }
  });

  function change() {
    if (isTelT && isPasswdT && isPasswdCT && isCheckT) {
      $sub.css({
        background: '#28788c'
      });
    } else {
      $sub.css({
        background: '#dadada'
      });
    }
  }
})();