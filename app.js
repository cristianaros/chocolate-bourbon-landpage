/* ==========================================================================
   Alfort Mini Chocolate — Landing Page Script (Vanilla JS)
   Handles: Navbar scroll, hero particles, story chapter reveal,
            products / reviews section reveal, reviews carousel, scroll animations
   ========================================================================== */

(function () {
  'use strict';

  /* ── Navbar scroll state ───────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── Hero particles ────────────────────────────────────────────────── */
  var particlesContainer = document.getElementById('hero-particles');

  function spawnParticles() {
    if (!particlesContainer) return;
    var count = 20;
    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'hero-particle';

      var left = Math.random() * 100;
      var dur  = 6 + Math.random() * 8;
      var del  = Math.random() * 10;
      var size = 1 + Math.random() * 3;

      p.style.cssText = [
        'left:' + left + '%',
        'bottom:' + (Math.random() * 30) + '%',
        '--dur:' + dur + 's',
        '--delay:' + del + 's',
        'width:' + size + 'px',
        'height:' + size + 'px',
      ].join(';');

      particlesContainer.appendChild(p);
    }
  }

  spawnParticles();

  /* ── Intersection Observer helper ─────────────────────────────────── */
  function observeElements(selector, className, options) {
    var elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    var opts = Object.assign({ threshold: 0.15 }, options || {});

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        }
      });
    }, opts);

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Story chapters scroll reveal ──────────────────────────────────── */
  observeElements('.story-chapter', 'visible', { threshold: 0.12 });

  /* ── Products header ───────────────────────────────────────────────── */
  observeElements('.products-header', 'visible', { threshold: 0.2 });

  /* ── Product cards staggered reveal ────────────────────────────────── */
  var productCards = document.querySelectorAll('.product-card');
  var cardsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var idx = Array.prototype.indexOf.call(productCards, entry.target);
        var delay = idx * 120;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  productCards.forEach(function (card) {
    cardsObserver.observe(card);
  });

  /* ── Reviews header ────────────────────────────────────────────────── */
  observeElements('.reviews-header', 'visible', { threshold: 0.2 });

  /* ── Reviews Carousel ──────────────────────────────────────────────── */
  var track    = document.getElementById('reviews-track');
  var dotsWrap = document.getElementById('reviews-dots');
  var btnPrev  = document.getElementById('rev-prev');
  var btnNext  = document.getElementById('rev-next');
  var cards    = track ? track.querySelectorAll('.review-card') : [];
  var dots     = dotsWrap ? dotsWrap.querySelectorAll('.rdot') : [];
  var current  = 0;
  var total    = cards.length;
  var autoTimer = null;

  function goTo(idx) {
    if (!track || !total) return;

    // Clamp
    idx = ((idx % total) + total) % total;
    current = idx;

    // Slide the track — cards are flex: 0 0 100%, no gap
    var cardWidth = track.parentElement.offsetWidth;
    track.style.transform = 'translateX(-' + (idx * cardWidth) + 'px)';

    // Active card
    cards.forEach(function (c, i) {
      c.classList.toggle('active-card', i === idx);
    });

    // Dots
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
  }

  // Init — activate first card
  function initCarousel() {
    if (!total) return;
    cards.forEach(function (c) { c.classList.remove('active-card'); });
    cards[0].classList.add('active-card');
    startAuto();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      goTo(current + 1);
    }, 5500);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  // Observe reviews section to start auto when visible
  if (track) {
    var reviewsObs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        initCarousel();
        reviewsObs.disconnect();
      }
    }, { threshold: 0.2 });

    var reviewsSection = document.getElementById('reviews');
    if (reviewsSection) reviewsObs.observe(reviewsSection);
  }

  // Handle resize to recalculate slide width
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      goTo(current);
    }, 150);
  });

  /* ── Smooth scroll for internal anchor links ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Subtle parallax for hero product image ────────────────────────── */
  var heroImg = document.getElementById('hero-product-img');

  if (heroImg) {
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      var translateY = scrollY * 0.18;
      heroImg.style.transform = 'translateY(' + translateY + 'px)';
    }, { passive: true });
  }

  /* ── Energy scene rotation for chapter 3 ──────────────────────────── */
  // Already handled via CSS animation — no JS needed.

  /* ── Clock hand animation for chapter 1 ───────────────────────────── */
  // Static SVG display — decorative only.

  /* ── Nav active section highlight ─────────────────────────────────── */
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    var scrollY = window.scrollY + 120;
    var current = '';

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollY) {
        current = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--gold-pure)';
      } else {
        link.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

})();
