const buttons = document.querySelectorAll('.subscribe-option');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.setAttribute('data-selected', 'false')); 
    button.setAttribute('data-selected', 'true'); 
  });
});