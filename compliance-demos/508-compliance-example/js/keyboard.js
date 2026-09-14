const btn = document.getElementById('action-btn');
const feedback = document.getElementById('action-feedback');

btn.addEventListener('click', () => {
  feedback.textContent = 'Action activated successfully.';
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const target = event.target;

    // Only intercept real interactive elements
    if (
      target.matches('a[href]') || target.closest('a[href]')
    ) {
      event.preventDefault();
      alert('module links are for demo purposes only');
    }
  });
});
