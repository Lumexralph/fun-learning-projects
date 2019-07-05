const slideInterval = 3500;

const getFigures = () => {
  const el = document.getElementById('carousel');
  return el.children;
}

const moveForward = () => {
  let pointer;
  const figures = getFigures();
  for (let i = 0; i < figures.length; i++) {
    if (figures[i].className == 'visible') {
      figures[i].className = '';
      pointer = i;      
    }    
  }
  if (++pointer == figures.length) {
    pointer = 0;
  }
  figures[pointer].className = 'visible';
  setTimeout(() => {
    moveForward();
  }, slideInterval);
}

const startPlayback = () => {
  setTimeout(moveForward, slideInterval)
}

startPlayback(); //begin the carousel

console.log('working');