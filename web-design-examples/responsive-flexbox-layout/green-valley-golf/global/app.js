// app.js
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current path
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(a => {
    if (a.getAttribute('href') === location.pathname.split('/').pop() || (a.getAttribute('href') === 'index.html' && location.pathname.endsWith('/'))) {
      a.classList.add('active');
    }
  });

  // Simple registration form handler
  const regForm = document.getElementById('regForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = regForm.querySelector('input[type="email"]');
      const msg = document.getElementById('regMsg');
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = 'crimson';
        return;
      }
      msg.textContent = 'Thanks — registration received.';
      msg.style.color = 'var(--accent-dark)';
      regForm.reset();
    });
  }

  // Contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = contactForm.querySelector('input[type="email"]');
      const msg = document.getElementById('contactMsg');
      if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
        msg.textContent = 'Please enter a valid email.';
        msg.style.color = 'crimson';
        return;
      }
      msg.textContent = 'Message sent. We will follow up by email.';
      msg.style.color = 'var(--accent-dark)';
      contactForm.reset();
    });
  }
});
