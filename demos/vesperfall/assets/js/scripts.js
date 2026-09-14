(function () {
  "use strict";

  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.querySelectorAll(".omen-nav a");

  if (navToggle && navLinks.length) {
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.checked = false;
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.checked) {
        navToggle.checked = false;
        var label = document.querySelector(".nav-toggle-label");
        if (label) {
          label.focus();
        }
      }
    });
  }

  var riteTriggers = document.querySelectorAll("[data-open-rite]");
  var openDialog = null;
  var lastFocus = null;

  function closeRite(dialog) {
    if (!dialog) {
      return;
    }
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    document.body.classList.remove("is-locked");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    openDialog = null;
    lastFocus = null;
  }

  riteTriggers.forEach(function (button) {
    button.addEventListener("click", function () {
      var id = button.getAttribute("data-open-rite");
      var dialog = document.getElementById(id);
      if (!dialog) {
        return;
      }
      lastFocus = button;
      openDialog = dialog;
      document.body.classList.add("is-locked");
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
      var closeBtn = dialog.querySelector(".rite-modal__close");
      if (closeBtn) {
        closeBtn.focus();
      }
    });
  });

  document.querySelectorAll(".rite-modal").forEach(function (dialog) {
    var closeBtn = dialog.querySelector(".rite-modal__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        closeRite(dialog);
      });
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeRite(dialog);
      }
    });

    dialog.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
      if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
      }
      openDialog = null;
      lastFocus = null;
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && openDialog) {
      closeRite(openDialog);
    }
  });

  var form = document.querySelector("[data-booking-form]");
  if (!form) {
    return;
  }

  var note = form.querySelector("[data-form-note]");
  var requiredFields = form.querySelectorAll("[required]");

  function isFilled(field) {
    return String(field.value || "").trim().length > 0;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function markField(field, invalid) {
    field.setAttribute("aria-invalid", invalid ? "true" : "false");
    var wrap = field.closest(".inquiry-field");
    if (wrap) {
      wrap.classList.toggle("is-invalid", invalid);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var valid = true;
    var firstInvalid = null;

    requiredFields.forEach(function (field) {
      var ok = isFilled(field);
      if (field.type === "email") {
        ok = ok && isValidEmail(field.value.trim());
      }
      markField(field, !ok);
      if (!ok && !firstInvalid) {
        firstInvalid = field;
        valid = false;
      } else if (!ok) {
        valid = false;
      }
    });

    if (!valid) {
      if (note) {
        note.hidden = false;
        note.className = "inquiry-note inquiry-note--error";
        note.textContent = "Complete every required field before sending the rite.";
      }
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    form.reset();
    requiredFields.forEach(function (field) {
      markField(field, false);
    });

    if (note) {
      note.hidden = false;
      note.className = "inquiry-note inquiry-note--ok";
      note.textContent = "Inquiry received. Management will answer within two business days.";
      note.focus();
    }
  });

  requiredFields.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true" && isFilled(field)) {
        markField(field, false);
      }
    });
  });
})();
