(function () {
  'use strict';

  /* Constantes de tiempo */
  const REVIEW_INTERVAL_MS = 5500;
  const FOOTER_INTERVAL_MS = 7000;

  /* -- Navbar: estado de scroll ----------------------------------------- */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* -- Observer de revelacion en scroll -------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.story-chapter, .products-header, .reviews-header')
    .forEach(el => revealObserver.observe(el));

  /* -- Particulas ------------------------------------------------------- */
  function spawnParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'story-particle';
      p.style.cssText = [
        'left:'    + (Math.random() * 100) + '%',
        'top:'     + (Math.random() * 100) + '%',
        '--dur:'   + (8 + Math.random() * 10) + 's',
        '--delay:' + (Math.random() * 12) + 's',
        'width:'   + (2 + Math.random() * 3.5) + 'px',
        'height:'  + (2 + Math.random() * 3.5) + 'px',
      ].join(';');
      container.appendChild(p);
    }
  }

  spawnParticles('story-particles', 220);
  spawnParticles('presentation-particles', 120);

  /* -- Cartas de productos: revelacion escalonada ----------------------- */
  const cards = document.querySelectorAll('.product-card');
  const cardsArray = Array.from(cards);

  const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = cardsArray.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 100);
        cardsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => cardsObserver.observe(card));

  /* -- Carrusel de resenas ---------------------------------------------- */
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

    rCards.forEach((c, i) => c.classList.toggle('active-card', i === idx));
    dots.forEach((d, i)  => d.classList.toggle('active', i === idx));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), REVIEW_INTERVAL_MS);
  }

  function stopAuto() {
    if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  }

  if (btnNext) btnNext.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  if (btnPrev) btnPrev.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
  });

  if (track) {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      const reviewsObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          goTo(0);
          startAuto();
          reviewsObs.disconnect();
        }
      }, { threshold: 0.2 });
      reviewsObs.observe(reviewsSection);
    }
  }

  window.addEventListener('resize', () => goTo(current));

  /* -- Carrusel del footer ---------------------------------------------- */
  const footerCarousel = document.getElementById('footer-carousel');
  if (footerCarousel) {
    const images = footerCarousel.querySelectorAll('.footer-package-img');
    let currentIndex = 0;
    const totalImages = images.length;

    if (totalImages > 1) {
      setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % totalImages;
        images[currentIndex].classList.add('active');
      }, FOOTER_INTERVAL_MS);
    }
  }

})();
