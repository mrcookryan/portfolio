/**
 * Juniper Lane Boutique — Scripts
 * Minimal JS for form handling, shop filters, and Quick View
 */

(function () {
  "use strict";

  /* -----------------------------------------------------------------------
     Close mobile nav when a link is clicked
     ----------------------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");

  if (navToggle) {
    const navLinks = document.querySelectorAll(".primary-nav__link");

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.checked = false;
      });
    });
  }

  /* -----------------------------------------------------------------------
     Contact form submission
     ----------------------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const messageEl = document.getElementById("form-message");
      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      const subject = contactForm.querySelector("#subject");
      const message = contactForm.querySelector("#message");

      let isValid = true;

      [name, email, subject, message].forEach(function (field) {
        if (!field.value.trim()) {
          isValid = false;
          field.setAttribute("aria-invalid", "true");
        } else {
          field.removeAttribute("aria-invalid");
        }
      });

      if (!isValid) {
        showFormMessage(
          messageEl,
          "Please complete all required fields.",
          "error"
        );
        return;
      }

      if (!isValidEmail(email.value)) {
        email.setAttribute("aria-invalid", "true");
        showFormMessage(
          messageEl,
          "Please enter a valid email address.",
          "error"
        );
        return;
      }

      showFormMessage(
        messageEl,
        "Thank you for reaching out. We will respond within one business day.",
        "success"
      );

      contactForm.reset();
    });
  }

  /* -----------------------------------------------------------------------
     Newsletter form submission
     ----------------------------------------------------------------------- */
  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (!emailInput || !isValidEmail(emailInput.value)) {
        if (emailInput) {
          emailInput.setAttribute("aria-invalid", "true");
          emailInput.focus();
        }
        return;
      }

      emailInput.removeAttribute("aria-invalid");
      emailInput.value = "";
      emailInput.placeholder = "Welcome to Juniper Lane";
    });
  }

  /* -----------------------------------------------------------------------
     Shop category filters
     ----------------------------------------------------------------------- */
  const filterTags = document.querySelectorAll(".filter-tag");
  const productCards = document.querySelectorAll(".product-card");
  const productCount = document.querySelector(".shop-toolbar__count");

  if (filterTags.length && productCards.length) {
    filterTags.forEach(function (tag) {
      tag.addEventListener("click", function () {
        const category = tag.dataset.filter;

        filterTags.forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-pressed", "false");
        });

        tag.classList.add("is-active");
        tag.setAttribute("aria-pressed", "true");

        let visibleCount = 0;

        productCards.forEach(function (card) {
          const cardCategory = card.dataset.category;
          const show = category === "all" || cardCategory === category;

          card.hidden = !show;
          if (show) visibleCount++;
        });

        if (productCount) {
          productCount.textContent =
            visibleCount + " piece" + (visibleCount !== 1 ? "s" : "");
        }
      });
    });
  }

 /* -----------------------------------------------------------------------
   Quick View — robust modal, viewport-safe, appended to body
   ----------------------------------------------------------------------- */
(function () {
  const productGrid = document.querySelector(".product-grid");

  // Ensure modal shell exists and is appended to body
  function ensureModal() {
    let modal = document.getElementById("quick-view-modal");
    if (!modal) {
      const modalHtml = `
        <div id="quick-view-modal" class="quick-view-modal" aria-hidden="true" role="dialog" aria-modal="true">
          <div class="qv-content" role="document">
            <button class="qv-close" aria-label="Close Quick View">×</button>
            <div class="qv-body">
              <div class="qv-media">
                <img class="qv-img" src="" alt="" />
                <div class="qv-loading" aria-hidden="true">Loading…</div>
              </div>
              <div class="qv-meta">
                <h3 class="qv-title"></h3>
                <p class="qv-price"></p>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      modal = document.getElementById("quick-view-modal");
    } else if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
    return modal;
  }

  const modal = ensureModal();
  const modalImg = modal.querySelector(".qv-img");
  const modalTitle = modal.querySelector(".qv-title");
  const modalPrice = modal.querySelector(".qv-price");
  const modalClose = modal.querySelector(".qv-close");
  const modalLoading = modal.querySelector(".qv-loading");
  let lastFocused = null;

  // Helpers to show/hide modal safely
  function showModal() {
    if (!modal) return;

    // ensure modal is direct child of body and fixed
    if (modal.parentElement !== document.body) document.body.appendChild(modal);
    modal.style.position = "fixed";

    lastFocused = document.activeElement;
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");

    // focus close button without scrolling
    if (modalClose && typeof modalClose.focus === "function") {
      try {
        modalClose.focus({ preventScroll: true });
      } catch (err) {
        modalClose.focus();
        window.scrollTo(0, 0);
      }
    }
  }

  function hideModal() {
    if (!modal) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    document.body.style.touchAction = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      try {
        lastFocused.focus({ preventScroll: true });
      } catch (err) {
        lastFocused.focus();
      }
    }
  }

  // Preload helper
  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      if (!src) return reject(new Error("no-src"));
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(new Error("load-fail"));
      img.src = src;
    });
  }

  // Open quick view for a card (tries back first, falls back to front)
  async function openQuickViewForCard(card) {
    if (!card || !modal) return;
    const title = card.querySelector(".product-card__title")?.textContent?.trim() || "";
    const price = card.querySelector(".product-card__price")?.textContent?.trim() || "";
    const imgs = card.querySelectorAll(".product-card__media img");
    const front = imgs[0]?.getAttribute("src") || "";
    const back = imgs[1]?.getAttribute("src") || "";

    modalTitle.textContent = title;
    modalPrice.textContent = price;

    const primary = back || front;
    const fallback = back ? front : "";

    if (modalLoading) modalLoading.style.display = "block";
    if (modalImg) {
      modalImg.style.opacity = "0";
      modalImg.src = "";
      modalImg.alt = title || "Product image";
      modalImg.style.background = "linear-gradient(90deg,#eee,#ddd)";
      modalImg.style.height = "auto";
    }

    let loaded = false;
    try {
      await preloadImage(primary);
      loaded = true;
      modalImg.src = primary;
    } catch (err) {
      if (fallback) {
        try {
          await preloadImage(fallback);
          loaded = true;
          modalImg.src = fallback;
        } catch (err2) {
          loaded = false;
        }
      } else {
        loaded = false;
      }
    }

    if (modalLoading) modalLoading.style.display = "none";

    if (!loaded && modalImg) {
      modalImg.src = "";
      modalImg.alt = "Image unavailable";
      modalImg.style.background = "linear-gradient(90deg,#eee,#ddd)";
      modalImg.style.height = "240px";
      modalImg.style.opacity = "1";
    } else if (modalImg) {
      modalImg.style.background = "none";
      modalImg.style.height = "auto";
      // ensure image fits viewport
      modalImg.style.maxHeight = "60vh";
      modalImg.style.objectFit = "contain";
      requestAnimationFrame(() => {
        modalImg.style.opacity = "1";
      });
    }

    // ensure content box constrained
    const content = modal.querySelector(".qv-content");
    if (content) {
      content.style.maxHeight = "calc(100vh - 4rem)";
      content.style.overflow = "auto";
    }

    showModal();
  }

  // Delegated click handler for Quick View (works for all cards)
  if (productGrid) {
    productGrid.addEventListener("click", function (e) {
      const btn = e.target.closest(".product-card__quick");
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest(".product-card");
      openQuickViewForCard(card);
    });
  } else {
    // fallback: attach to each button
    document.querySelectorAll(".product-card__quick").forEach(function (btn) {
      btn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const card = btn.closest(".product-card");
        openQuickViewForCard(card);
      });
    });
  }

  // Touch-friendly flip: first tap flips, second tap proceeds
  (function attachTouchFlip() {
    if (!productGrid) return;
    function handleTouchStart(e) {
      const card = e.target.closest(".product-card");
      if (!card) return;
      if (card.classList.contains("is-flipped")) return;
      e.preventDefault();
      e.stopPropagation();
      card.classList.add("is-flipped");
      setTimeout(() => card.classList.remove("is-flipped"), 3500);
    }
    productGrid.addEventListener("touchstart", handleTouchStart, { passive: false });
  })();

  // Modal close handlers: close button, click outside, Esc
  if (modal) {
    if (modalClose) {
      modalClose.addEventListener("click", function (e) {
        e.preventDefault();
        hideModal();
      });
    }

    modal.addEventListener("click", function (e) {
      const content = modal.querySelector(".qv-content");
      if (!content) return;
      if (!content.contains(e.target)) {
        hideModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-visible")) {
        hideModal();
      }
    });

    // Simple focus trap while modal is visible
    document.addEventListener("focus", function (e) {
      if (!modal.classList.contains("is-visible")) return;
      if (!modal.contains(e.target)) {
        e.stopPropagation();
        if (modalClose) modalClose.focus();
      }
    }, true);
  }
})();

// Prevent product-card <a href="#"> from jumping the page
if (productGrid) {
  productGrid.addEventListener("click", function (e) {
    const link = e.target.closest(".product-card__link");
    if (!link) return;

    // If user clicked Quick View or image (inside the link), stop the jump
    if (
      e.target.closest(".product-card__quick") ||
      e.target.closest(".product-card__media")
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
}


  /* -----------------------------------------------------------------------
     Helpers
     ----------------------------------------------------------------------- */
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function showFormMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = "form-message is-visible form-message--" + type;
    element.setAttribute("role", "alert");
  }
})();
