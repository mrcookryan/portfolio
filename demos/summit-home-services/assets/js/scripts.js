/**
 * Summit Home Services
 * JS only where markup cannot cover it: project reel paging and work-request validation.
 */
(function () {
  "use strict";

  var track = document.getElementById("project-track");
  var reelButtons = document.querySelectorAll("[data-reel]");

  if (track && reelButtons.length) {
    reelButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var direction = button.getAttribute("data-reel") === "next" ? 1 : -1;
        var amount = Math.min(track.clientWidth * 0.72, 360);

        track.scrollBy({
          left: amount * direction,
          behavior: "smooth"
        });
      });
    });
  }

  var form = document.getElementById("work-request") || document.querySelector("form.ticket");

  if (!form) {
    return;
  }

  var statusEl = document.getElementById("form-status") || form.querySelector(".form-note");

  function setStatus(message, kind) {
    if (!statusEl) {
      return;
    }

    statusEl.textContent = message;
    statusEl.classList.add("is-on");

    if (statusEl.classList.contains("ticket__status")) {
      statusEl.className = "ticket__status" + (kind ? " " + kind : "");
    }
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var required = form.querySelectorAll("[required]");
    var valid = true;
    var emailField = form.querySelector("#email, input[type='email']");

    required.forEach(function (field) {
      if (!field.value.trim()) {
        field.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        field.removeAttribute("aria-invalid");
      }
    });

    if (!valid) {
      setStatus("Please complete the highlighted fields so we can price the walkthrough.", "is-error");
      return;
    }

    if (emailField && !isEmail(emailField.value.trim())) {
      emailField.setAttribute("aria-invalid", "true");
      setStatus("Enter a valid email so we can send the written scope.", "is-error");
      return;
    }

    setStatus("Request received. A carpenter will reply within one business day.", "is-ok");
    form.reset();
  });
})();
