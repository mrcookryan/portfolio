/* =============================================================
   main.js — Transportation Services
   Handles: nav toggle, active link, scroll animations,
            quote form validation, smooth interactions
   ============================================================= */

'use strict';

/* ── Nav Mobile Toggle ───────────────────────────────────────── */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('open');
    }
  });
})();

/* ── Active Nav Link ─────────────────────────────────────────── */
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-menu a');
  const path  = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ── Scroll Fade-up Animations ───────────────────────────────── */
(function initFadeUp() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

/* ── Quote Form Validation ───────────────────────────────────── */
(function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const successMsg = document.getElementById('formSuccess');

  /**
   * Validate a single field
   * @param {HTMLElement} group - .form-group wrapper
   * @returns {boolean}
   */
  function validateField(group) {
    const input = group.querySelector('input, select, textarea');
    const error = group.querySelector('.field-error');
    if (!input || !error) return true;

    const required = input.hasAttribute('required');
    const val      = input.value.trim();

    let msg = '';

    if (required && !val) {
      msg = error.getAttribute('data-required') || 'This field is required.';
    } else if (val && input.type === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg = 'Please enter a valid email address.';
      }
    } else if (val && input.type === 'tel') {
      if (!/^[\d\s\+\-\(\)]{7,20}$/.test(val)) {
        msg = 'Please enter a valid phone number.';
      }
    } else if (input.type === 'date' && val) {
      const today = new Date().toISOString().split('T')[0];
      if (val < today) {
        msg = 'Date must be today or in the future.';
      }
    }

    group.classList.toggle('has-error', !!msg);
    error.textContent = msg;
    return !msg;
  }

  // Live validation on blur
  form.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (input) {
      input.addEventListener('blur', () => validateField(group));
      input.addEventListener('input', () => {
        if (group.classList.contains('has-error')) validateField(group);
      });
    }
  });

  // Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const groups  = form.querySelectorAll('.form-group');
    let   isValid = true;

    groups.forEach(group => {
      if (!validateField(group)) isValid = false;
    });

    if (isValid) {
      // Simulate async submission
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';

      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 900);
    } else {
      // Focus first error
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
    }
  });
})();

/* ── Vehicle Filter Tabs (Vehicles page) ─────────────────────── */
(function initVehicleFilter() {
  const tabGroup = document.querySelector('[role="tablist"]');
  if (!tabGroup) return;

  const tabs  = tabGroup.querySelectorAll('[role="tab"]');
  const cards = document.querySelectorAll('[data-category]');

  function filter(cat) {
    cards.forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.style.display = show ? '' : 'none';
      card.setAttribute('aria-hidden', String(!show));
    });
    tabs.forEach(tab => {
      const active = tab.dataset.filter === cat;
      tab.setAttribute('aria-selected', String(active));
      tab.classList.toggle('tab--active', active);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => filter(tab.dataset.filter));
    tab.addEventListener('keydown', (e) => {
      let idx = [...tabs].indexOf(tab);
      if (e.key === 'ArrowRight') idx = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') idx = (idx - 1 + tabs.length) % tabs.length;
      else return;
      e.preventDefault();
      tabs[idx].focus();
      filter(tabs[idx].dataset.filter);
    });
  });
})();

/* ── Smooth Scroll Anchors ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id  = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

/* ── Header scroll shadow ────────────────────────────────────── */
(function initHeaderShadow() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,.3)'
      : '0 2px 12px rgba(0,0,0,.25)';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
