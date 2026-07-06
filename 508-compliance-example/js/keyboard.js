const btn = document.getElementById('action-btn');
const feedback = document.getElementById('action-feedback');

btn.addEventListener('click', () => {
  feedback.textContent = 'Action activated successfully.';
});
