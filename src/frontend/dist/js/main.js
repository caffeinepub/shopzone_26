// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ===== MOBILE SERVICES ACCORDION =====
const mobileServicesToggle = document.querySelector('.mobile-services-toggle');
const mobileServicesList = document.querySelector('.mobile-services-list');

if (mobileServicesToggle && mobileServicesList) {
  mobileServicesToggle.addEventListener('click', () => {
    mobileServicesToggle.classList.toggle('open');
    mobileServicesList.classList.toggle('open');
  });
}

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up');

if (fadeEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));
}

// ===== TYPING ANIMATION =====
const typingEl = document.getElementById('typingText');

if (typingEl) {
  const words = ['DEVELOPING SOLUTIONS', 'BUILDING THE FUTURE', 'ENGINEERING INNOVATION', 'CREATING IMPACT'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const word = words[wordIndex];

    if (isDeleting) {
      typingEl.textContent = word.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = word.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === word.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card[data-category]');

if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', msg: 'Please enter your name.' },
      { id: 'email', msg: 'Please enter a valid email.', isEmail: true },
      { id: 'message', msg: 'Please enter a message.' }
    ];

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      const group = input ? input.closest('.form-group') : null;
      const errEl = group ? group.querySelector('.form-error') : null;

      if (!input || !group) return;

      const val = input.value.trim();
      let err = '';

      if (!val) {
        err = field.msg;
      } else if (field.isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        err = 'Please enter a valid email address.';
      }

      if (err) {
        group.classList.add('error');
        if (errEl) errEl.textContent = err;
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (valid) {
      const successEl = document.getElementById('formSuccess');
      if (successEl) {
        successEl.style.display = 'block';
        contactForm.reset();
        setTimeout(() => { successEl.style.display = 'none'; }, 5000);
      }
    }
  });

  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group) group.classList.remove('error');
    });
  });
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const counters = document.querySelectorAll('[data-target]');

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));
}
