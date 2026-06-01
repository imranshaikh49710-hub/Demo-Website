// ══════════════════════════════════════════
//   KsisPainter — Global JS
// ══════════════════════════════════════════

// ── LOADER ──
// Always show for at least 2.8s so animation completes on fast connections too
(function() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const MIN_SHOW = 2800; // ms
  const start = Date.now();

  function hideLoader() {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, MIN_SHOW - elapsed);
    setTimeout(() => loader.classList.add('hidden'), remaining);
  }

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
    // Safety fallback: never block forever
    setTimeout(() => loader.classList.add('hidden'), 6000);
  }
})();

// ── NAV SCROLL SHADOW ──
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── HAMBURGER TOGGLE ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

// ── MOBILE DROPDOWN ──
document.querySelectorAll('.nav-links > li > a').forEach(a => {
  a.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      const li = a.parentElement;
      const dd = li.querySelector('.dropdown');
      if (dd) {
        e.preventDefault();
        li.classList.toggle('open');
      } else {
        hamburger?.classList.remove('open');
        navLinks?.classList.remove('open');
      }
    }
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// ── COUNTER ANIMATION ──
const counterEls = document.querySelectorAll('.counter-num');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      let start = 0;
      const duration = 1800;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target + (target >= 98 ? '%' : '+');
      };
      requestAnimationFrame(step);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counterEls.forEach(el => counterObs.observe(el));

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── PORTFOLIO FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.portfolio-item').forEach(item => {
      const cat = item.getAttribute('data-cat');
      item.style.opacity = (filter === 'all' || cat === filter) ? '1' : '0.25';
      item.style.transform = (filter === 'all' || cat === filter) ? '' : 'scale(0.96)';
    });
  });
});

// ── WHATSAPP CONTACT FORM ──
// Collects all fields and opens WhatsApp with a pre-filled message
function sendToWhatsApp() {
  const WA_NUMBER = '919999999999'; // change to real number

  // Grab field values — works on contact.html
  const name    = (document.getElementById('f-name')    || {}).value || '';
  const phone   = (document.getElementById('f-phone')   || {}).value || '';
  const email   = (document.getElementById('f-email')   || {}).value || '';
  const city    = (document.getElementById('f-city')    || {}).value || '';
  const service = (document.getElementById('f-service') || {}).value || '';
  const message = (document.getElementById('f-message') || {}).value || '';

  // Basic validation
  if (!name.trim()) { alert('Please enter your name.'); return; }
  if (!phone.trim()) { alert('Please enter your phone number.'); return; }

  const text =
    `*New Enquiry — KsisPainter*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    (email   ? `📧 *Email:* ${email}\n`   : '') +
    (city    ? `📍 *City:* ${city}\n`    : '') +
    (service ? `🔧 *Service:* ${service}\n` : '') +
    (message ? `📝 *Details:* ${message}\n` : '') +
    `\n_Sent from KsisPainter website_`;

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  // Visual feedback
  const btn = document.getElementById('submit-btn');
  if (btn) {
    btn.textContent = 'Opening WhatsApp…';
    btn.disabled = true;
    btn.style.background = '#25D366';
    setTimeout(() => {
      btn.innerHTML = '✓ Redirecting to WhatsApp';
    }, 800);
  }

  setTimeout(() => window.open(url, '_blank'), 400);
}

// ── ACTIVE NAV HIGHLIGHT ──
(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.getAttribute('data-page') === page) {
      a.parentElement.classList.add('active');
    }
  });
})();
