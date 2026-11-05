/* 画面幅に合わせて、PC(1440)／SP(390)の列を拡大縮小する。768〜1023px はSP列を最大1.6倍 */
(function () {
  'use strict';
  var pc = document.querySelector('.col--pc'), sp = document.querySelector('.col--sp');
  function fit() {
    var w = document.documentElement.clientWidth, isSp = w < 1024, col = isSp ? sp : pc, base = isSp ? 390 : 1440;
    var s = isSp ? Math.min(w / base, w < 768 ? 9 : 1.6) : w / base;
    col.style.zoom = s;
    // SP のときは、SP 列の各セクションに id を移す
    var from = isSp ? pc : sp, to = isSp ? sp : pc;
    var a = from.querySelectorAll('.sec[id]'), b = to.querySelectorAll('.sec');
    for (var i = 0; i < a.length; i++) { b[i].id = a[i].id; a[i].removeAttribute('id'); }
  }
  fit();
  window.addEventListener('resize', fit);
})();
