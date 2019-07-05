const borderCollapse = () => {
  const table = document.querySelector('table');

  table.style.borderCollapse = 'collapse';
}

const button = document.querySelector('button');
button.addEventListener('click', borderCollapse);