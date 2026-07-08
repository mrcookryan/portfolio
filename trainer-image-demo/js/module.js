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
