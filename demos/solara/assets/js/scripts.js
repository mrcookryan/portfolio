(function () {
  const header = document.querySelector(".duskbar");
  const form = document.getElementById("reserve-form");
  const status = document.getElementById("form-status");
  const toggle = document.getElementById("nav-toggle");

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  document.querySelectorAll(".coursenav a").forEach((link) => {
    link.addEventListener("click", () => {
      if (toggle) toggle.checked = false;
    });
  });

  if (!form || !status) return;

  const required = form.querySelectorAll("[required]");

  const clearInvalid = () => {
    required.forEach((field) => field.classList.remove("is-invalid"));
    status.classList.remove("is-error");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearInvalid();

    const missing = Array.from(required).filter((field) => !field.value.trim());

    if (missing.length) {
      missing.forEach((field) => field.classList.add("is-invalid"));
      status.textContent = "Please complete the required fields so we can hold your table.";
      status.classList.add("is-error");
      missing[0].focus();
      return;
    }

    status.textContent = "Thank you. Solara will confirm your table within one business day.";
    form.reset();
  });
})();
