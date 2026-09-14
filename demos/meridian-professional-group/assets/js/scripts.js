/**
 * Meridian Professional Group — Site Scripts
 * Minimal JS for carousel controls and form handling.
 */

(function () {
  'use strict';

  /* --- Industries Carousel ------------------------------------------------ */
  function initCarousel() {
    var carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    var track = carousel.querySelector('[data-carousel-track]');
    var prevBtn = carousel.querySelector('[data-carousel-prev]');
    var nextBtn = carousel.querySelector('[data-carousel-next]');

    if (!track || !prevBtn || !nextBtn) return;

    function getScrollAmount() {
      var card = track.querySelector('.industry-card');
      if (!card) return 320;
      var gap = parseInt(getComputedStyle(track).gap, 10) || 24;
      return card.offsetWidth + gap;
    }

    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 1;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
    }

    prevBtn.addEventListener('click', function () {
      track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', function () {
      track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  /* --- Contact Form ------------------------------------------------------- */
  function initContactForm() {
    var form = document.querySelector('[data-contact-form]');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var requiredFields = form.querySelectorAll('[required]');
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      var emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          valid = false;
          emailField.setAttribute('aria-invalid', 'true');
        }
      }

      var statusEl = form.querySelector('[data-form-status]');
      if (!valid) {
        if (statusEl) {
          statusEl.textContent = 'Please complete all required fields with valid information.';
          statusEl.setAttribute('role', 'alert');
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent = 'Thank you for your inquiry. A member of our team will respond within one business day.';
        statusEl.setAttribute('role', 'status');
      }

      form.reset();
    });
  }

  /* --- Mobile Nav: Close on link click ------------------------------------ */
  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    if (!toggle) return;

    var navLinks = document.querySelectorAll('.site-nav__link, .site-nav__mega-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.checked = false;
      });
    });
  }

  /* --- Init --------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
    initContactForm();
    initMobileNav();
  });
})();
