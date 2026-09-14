(function () {
  "use strict";

  var masthead = document.querySelector(".nx-masthead");
  if (masthead) {
    var onScroll = function () {
      masthead.classList.toggle("is-scrolled", window.scrollY > 18);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.getElementById("nav-toggle");
  document.querySelectorAll(".nx-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (toggle) toggle.checked = false;
    });
  });

  var cards = document.querySelectorAll("[data-open]");
  var chambers = document.querySelectorAll(".nx-chamber");

  function openChamber(id) {
    var dialog = document.getElementById(id);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  }

  function closeChamber(dialog) {
    if (dialog && dialog.open) dialog.close();
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      openChamber(card.getAttribute("data-open"));
    });
  });

  chambers.forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeChamber(dialog);
    });
  });

  document.querySelectorAll("[data-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      closeChamber(button.closest("dialog"));
    });
  });

  if (location.hash) {
    var fromHash = location.hash.replace("#", "");
    if (document.getElementById(fromHash)) openChamber(fromHash);
  }

  var filters = document.querySelectorAll("[data-filter]");
  var workCards = document.querySelectorAll("[data-kind]");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var kind = button.getAttribute("data-filter");
      filters.forEach(function (item) {
        item.classList.toggle("is-on", item === button);
      });
      workCards.forEach(function (card) {
        var show = kind === "all" || card.getAttribute("data-kind") === kind;
        card.hidden = !show;
      });
    });
  });

  var form = document.querySelector(".nx-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.classList.add("is-sent");
    });
  }
})();
