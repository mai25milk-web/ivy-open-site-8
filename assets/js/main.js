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

  // モーション：幕は最短0.6秒・最長1.4秒で上げる。セクションは見えたら文字を出す
  var root = document.documentElement;
  if (root.classList.contains('motion')) {
    var t0 = Date.now(), done = false;
    var ready = function () { if (done) return; done = true; setTimeout(function () { root.classList.add('is-ready');
      setTimeout(function () { var d = document.querySelectorAll('.f-1-2 .deco, .f-1-1020 .deco'); for (var i = 0; i < d.length; i++) d[i].classList.add('is-float'); }, 2000); }, Math.max(0, 600 - (Date.now() - t0))); };
    var hero = document.querySelector((document.documentElement.clientWidth < 1024 ? '.col--sp' : '.col--pc') + ' .photo img');
    if (hero && !hero.complete) hero.addEventListener('load', ready); else ready();
    setTimeout(ready, 1400);
    var secs = document.querySelectorAll('.sec');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; var s = e.target; s.classList.add('is-in'); io.unobserve(s);
        setTimeout(function () { var d = s.querySelectorAll('.deco'); for (var i = 0; i < d.length; i++) d[i].classList.add('is-float'); }, 1400); }); }, { rootMargin: '0px 0px -15% 0px' });
      for (var i = 0; i < secs.length; i++) if (!/f-1-2|f-1-1020/.test(secs[i].className)) io.observe(secs[i]);
    } else for (var j = 0; j < secs.length; j++) secs[j].classList.add('is-in');
  }
})();
