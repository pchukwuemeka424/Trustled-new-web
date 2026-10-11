/* TrustLed AI site interactions */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.remove('no-js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header shadow on scroll + back to top */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (toTop) toTop.classList.toggle('is-shown', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* Mobile menu */
  var menuBtn = document.querySelector('.menu-toggle');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Solutions dropdown */
  document.querySelectorAll('.dd').forEach(function (dd) {
    var btn = dd.querySelector('.dd-toggle');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    dd.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dd.is-open').forEach(function (dd) {
      if (!dd.contains(e.target)) { dd.classList.remove('is-open'); dd.querySelector('.dd-toggle').setAttribute('aria-expanded', 'false'); }
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger, [data-count], .bar');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          var parentTile = entry.target.closest('.tile, .card');
          if (parentTile) parentTile.classList.add('is-visible');
          if (entry.target.hasAttribute('data-count')) countUp(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
      var t = el.closest('.tile, .card'); if (t) t.classList.add('is-visible');
    });
  }

  /* Count-up numbers */
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    var start = null, duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* Button ripple feedback */
  document.addEventListener('pointerdown', function (e) {
    var btn = e.target.closest('.btn');
    if (!btn || reduceMotion) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var r = document.createElement('span');
    r.className = 'ripple';
    r.style.width = r.style.height = size + 'px';
    r.style.left = (e.clientX - rect.left - size / 2) + 'px';
    r.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(r);
    setTimeout(function () { r.remove(); }, 650);
  });

  /* Page transition fallback for browsers without cross-document view transitions */
  var supportsVT = typeof CSS !== 'undefined' && CSS.supports && CSS.supports('view-transition-name: none');
  if (!supportsVT && !reduceMotion) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      var url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(function () { location.href = a.href; }, 170);
    });
    window.addEventListener('pageshow', function () { document.body.classList.remove('is-leaving'); });
  }

  /* Table of contents highlight on case studies */
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });
    var tocIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove('is-active'); });
          var link = map[entry.target.id]; if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) tocIo.observe(s); });
  }

  /* Forms: all submissions are delivered to hello@trustledai.com via FormSubmit */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    var next = form.querySelector('input[name="_next"]');
    if (next) next.value = new URL('thank-you.html', location.href).href;
    if (form.hasAttribute('data-preview')) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var note = form.querySelector('.preview-note');
        if (!note) { note = document.createElement('p'); note.className = 'form-note preview-note'; note.setAttribute('role', 'status'); form.appendChild(note); }
        note.textContent = 'Preview only: on the live site this form sends to hello@trustledai.com.';
      });
      return;
    }
    var page = form.querySelector('input[name="Page"]');
    if (page) page.value = location.href;
    form.addEventListener('submit', function () {
      var b = form.querySelector('button[type="submit"]');
      if (b) { b.classList.add('is-loading'); b.setAttribute('aria-busy', 'true'); }
    });
  });

  /* Preselect enquiry topic from ?topic= */
  var topicSelect = document.querySelector('select[name="Topic"]');
  if (topicSelect) {
    var t = new URLSearchParams(location.search).get('topic');
    if (t) Array.prototype.forEach.call(topicSelect.options, function (o) { if (o.getAttribute('data-key') === t) topicSelect.value = o.value; });
  }

  /* Insights filter */
  var filterBtns = document.querySelectorAll('[data-filter]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      document.querySelectorAll('[data-type]').forEach(function (item) {
        var show = f === 'all' || item.getAttribute('data-type') === f;
        item.hidden = !show;
      });
    });
  });

  /* Tabs (service pages) */
  document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
    var btns = Array.prototype.slice.call(wrap.querySelectorAll('[role="tab"]'));
    function select(b, focus) {
      btns.forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-selected', on ? 'true' : 'false');
        x.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(x.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) b.focus();
    }
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { select(b); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (d) { e.preventDefault(); select(btns[(i + d + btns.length) % btns.length], true); }
      });
    });
  });

  /* Current year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
