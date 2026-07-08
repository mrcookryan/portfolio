const form = document.getElementById('quiz-form');
const feedback = document.getElementById('feedback');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const answer = data.get('answer');

  if (!answer) {
    feedback.textContent = 'Please select an option before checking your answer.';
    feedback.className = 'feedback feedback--error';
    return;
  }

  if (answer === 'a') {
    feedback.textContent = 'Correct! Semantic HTML improves accessibility and helps assistive technologies understand the page.';
    feedback.className = 'feedback feedback--success';
  } else {
    feedback.textContent = 'Not quite. Semantic HTML is the option that best improves accessibility.';
    feedback.className = 'feedback feedback--error';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const target = event.target;

    // Only intercept real interactive elements
    if (
      target.matches('a[href]') ||
      target.matches('button') ||
      target.closest('a[href]') ||
      target.closest('button')
    ) {
      event.preventDefault();
      alert('Demo purposes only — this action is not functional.');
    }
  });
});

