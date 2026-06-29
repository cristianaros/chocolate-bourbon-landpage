(function () {
  'use strict';

  /* ── Navbar scroll state ───────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

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

  /* ── OBSERVER MOSTRAR ENTIDADES ────────────────────────── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.story-chapter, .products-header, .reviews-header')
    .forEach(el => observer.observe(el));

  /* ── CREACION DE PARTICULAS ───────────────────────────────────── */
  function spawnParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'story-particle';

      const left = Math.random() * 100;
      const top  = Math.random() * 100;
      const dur  = 8 + Math.random() * 10;
      const del  = Math.random() * 12;
      const size = 2 + Math.random() * 3.5;

      p.style.cssText = [
        'left:' + left + '%',
        'top:' + top + '%',
        '--dur:' + dur + 's',
        '--delay:' + del + 's',
        'width:' + size + 'px',
        'height:' + size + 'px',
      ].join(';');

      container.appendChild(p);
    }
  }

  spawnParticles('story-particles', 220);
  spawnParticles('presentation-particles', 120);

  /* ── CARTAS DE PRODUCTOS ──────────────────────────────── */
  const cards = document.querySelectorAll('.product-card');
  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardsObserver.observe(card));

  /* ── CARRUSEL REVIEWS ──────────────────────────────────────────────── */
  const track    = document.getElementById('reviews-track');
  const dotsWrap = document.getElementById('reviews-dots');
  const btnPrev  = document.getElementById('rev-prev');
  const btnNext  = document.getElementById('rev-next');
  const rCards   = track ? track.querySelectorAll('.review-card') : [];
  const dots     = dotsWrap ? dotsWrap.querySelectorAll('.rdot') : [];
  let current    = 0;
  const total    = rCards.length;
  let autoTimer  = null;

  function goTo(idx) {
    if (!track || !total) return;
    idx = ((idx % total) + total) % total;
    current = idx;

    const cardWidth = track.parentElement.offsetWidth;
    track.style.transform = 'translateX(-' + (idx * cardWidth) + 'px)';

    rCards.forEach((c, i) => {
      c.classList.toggle('active-card', i === idx);
    });

    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => {
      goTo(current + 1);
    }, 5500);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  if (track) {
    const reviewsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        goTo(0);
        startAuto();
        reviewsObs.disconnect();
      }
    }, { threshold: 0.2 });

    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) reviewsObs.observe(reviewsSection);
  }

  window.addEventListener('resize', () => {
    goTo(current);
  });

})();
