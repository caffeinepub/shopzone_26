// ===== BANNER SLIDER =====
(function() {
  const track = document.getElementById('sliderTrack');
  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const progressBar = document.getElementById('sliderProgress');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');

  const TOTAL = slides.length;
  const AUTO_PLAY_DURATION = 5000; // ms per slide

  let current = 0;
  let autoTimer = null;
  let progressTimer = null;
  let isTransitioning = false;

  function goTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    // Wrap around
    current = (index + TOTAL) % TOTAL;

    track.style.transform = `translateX(-${current * 100}%)`;

    // Update dots
    dots.forEach((d, i) => d.classList.toggle('active', i === current));

    setTimeout(() => { isTransitioning = false; }, 700);
  }

  function startProgress() {
    stopProgress();
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      // Force reflow
      progressBar.offsetWidth;
      progressBar.style.transition = `width ${AUTO_PLAY_DURATION}ms linear`;
      progressBar.style.width = '100%';
    }
  }

  function stopProgress() {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    startProgress();
    autoTimer = setInterval(() => {
      goTo(current + 1);
      startProgress();
    }, AUTO_PLAY_DURATION);
  }

  function stopAutoPlay() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  // Prev / Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(current - 1);
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(current + 1);
      startAutoPlay();
    });
  }

  // Dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.getAttribute('data-index'), 10));
      startAutoPlay();
    });
  });

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      startAutoPlay();
    }
  }, { passive: true });

  // Pause on hover
  const slider = document.querySelector('.banner-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); startAutoPlay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAutoPlay(); }
  });

  // Init
  goTo(0);
  startAutoPlay();
})();
