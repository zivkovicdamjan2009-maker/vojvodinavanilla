/* Wedding Centar Vanilla — interakcije
   Sve animacije poštuju prefers-reduced-motion. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var HDR = 72;

  /* Preloader — sklanja se posle animacije zavese (~1.2s) */
  var pre = document.getElementById('pre');
  if (pre) {
    if (reduce.matches) pre.classList.add('done');
    else setTimeout(function () { pre.classList.add('done'); }, 1400);
  }

  /* Reveal na ulazu u viewport */
  var revealables = document.querySelectorAll('[data-reveal]');
  if (reduce.matches || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        e.target.addEventListener('transitionend', function () { e.target.style.willChange = 'auto'; }, { once: true });
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  }

  /* Sticky header + hero parallax — jedan rAF frame po scroll eventu */
  var hdr = document.getElementById('hdr');
  var heroBg = document.getElementById('heroBg');
  var heroVisible = true;
  var scrolled = false;
  var ticking = false;

  if (heroBg && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      heroVisible = es[0].isIntersecting;
      heroBg.style.willChange = heroVisible ? 'transform' : 'auto';
    }).observe(heroBg);
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var y = window.pageYOffset;
      if (heroBg && heroVisible && !reduce.matches) {
        var p = Math.min(y * 0.15, window.innerHeight * 0.15);
        heroBg.style.transform = 'translate3d(0,' + p.toFixed(1) + 'px,0)';
      }
      var s = y > 40;
      if (s !== scrolled) { scrolled = s; hdr.classList.toggle('scrolled', s); }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobilni meni */
  var mmenu = document.getElementById('mmenu');
  var burger = document.getElementById('burger');
  function setMenu(open) {
    mmenu.hidden = !open;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(mmenu.hidden); });
  document.getElementById('mclose').addEventListener('click', function () { setMenu(false); });

  /* Smooth scroll sa offsetom za sticky header */
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    setMenu(false);
    var top = el.getBoundingClientRect().top + window.pageYOffset - HDR;
    window.scrollTo({ top: top, behavior: reduce.matches ? 'auto' : 'smooth' });
  });

  /* Galerija + lightbox (Escape zatvara) */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var gal = document.getElementById('gal');
  if (gal) {
    gal.addEventListener('click', function (e) {
      var img = e.target.closest('figure') && e.target.closest('figure').querySelector('img');
      if (!img) return;
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  }
  function closeLb() { lb.hidden = true; lbImg.removeAttribute('src'); document.body.style.overflow = ''; }
  lb.addEventListener('click', closeLb);
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) closeLb();
    if (!mmenu.hidden) setMenu(false);
  });

  /* Slider utisaka */
  var track = document.getElementById('tTrack');
  var count = track ? track.children.length : 0;
  var idx = 0;
  function go(n) { idx = (n + count) % count; track.style.transform = 'translateX(-' + idx * 100 + '%)'; }
  if (track) {
    document.getElementById('tNext').addEventListener('click', function () { go(idx + 1); });
    document.getElementById('tPrev').addEventListener('click', function () { go(idx - 1); });
  }

  /* Kontakt vodi direktno na poziv i WhatsApp — nema forme ni mail servisa.
     Brojevi su u index.html: tel:+381611199999 i https://wa.me/381611199999 */
})();
