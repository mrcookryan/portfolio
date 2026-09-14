(function () {
  "use strict";

  var form = document.querySelector("[data-inquiry-form]");
  if (!form) {
    return;
  }

  var note = form.querySelector("[data-form-note]");
  var required = form.querySelectorAll("[required]");

  function setInvalid(field, invalid) {
    var wrap = field.closest(".field");
    if (wrap) {
      wrap.classList.toggle("is-invalid", invalid);
    }
  }

  function isFilled(field) {
    return String(field.value || "").trim().length > 0;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var valid = true;

    required.forEach(function (field) {
      var ok = isFilled(field);
      if (field.type === "email") {
        ok = ok && isValidEmail(field.value.trim());
      }
      setInvalid(field, !ok);
      if (!ok) {
        valid = false;
      }
    });

    if (!valid) {
      var firstInvalid = form.querySelector(".field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    form.reset();
    required.forEach(function (field) {
      setInvalid(field, false);
    });

    if (note) {
      note.classList.add("is-visible");
      note.focus();
    }
  });

  required.forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.closest(".field").classList.contains("is-invalid") && isFilled(field)) {
        setInvalid(field, false);
      }
    });
  });
})();
