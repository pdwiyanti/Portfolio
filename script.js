(function () {
  var root = document.documentElement;
  root.classList.add('js');

  // Mobile menu
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Fade in each section once
  var secs = document.querySelectorAll('.sec');
  if ('IntersectionObserver' in window) {
    var reveal = new IntersectionObserver(function (items) {
      items.forEach(function (i) {
        if (i.isIntersecting) { i.target.classList.add('in'); reveal.unobserve(i.target); }
      });
    }, { threshold: 0.08 });
    secs.forEach(function (s) { reveal.observe(s); });
  } else {
    secs.forEach(function (s) { s.classList.add('in'); });
  }

  // Highlight current section in nav
  var links = document.querySelectorAll('nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (items) {
      items.forEach(function (i) {
        if (i.isIntersecting) {
          links.forEach(function (l) {
            l.classList.toggle('on', l.getAttribute('href') === '#' + i.target.id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { spy.observe(s); });
  }

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
