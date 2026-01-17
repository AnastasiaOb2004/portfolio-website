document.querySelectorAll('.game').forEach((game, index) => {
  const circles = game.querySelector('.circles');
  const pacman = game.querySelector('.pacman');

  const trigger = game.nextElementSibling;
  if (!trigger) return;

  const fromRight = index % 2 === 1;

  if (fromRight) {
  pacman.style.transform = 'translateY(-50%) scaleX(-1)';
} else {
  pacman.style.transform = 'translateY(-50%) scaleX(1)';
}


  let pacmanX = fromRight ? window.innerWidth + 180 : -180;
  const speed = fromRight ? -4 : 4;
  let started = false;

  pacman.style.left = pacmanX + 'px';

  const dotSpacing = 60;

  for (let i = 0; i < 5; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${i * dotSpacing}px`;
    dot.style.top = '4px';
    circles.appendChild(dot);
  }

  function movePacman() {
    pacmanX += speed;
    pacman.style.left = pacmanX + 'px';

    const pacRect = pacman.getBoundingClientRect();
    const mouthX = pacRect.left + pacRect.width * (fromRight ? 0.2 : 0.8);
    const centerY = pacRect.top + pacRect.height / 2;

    circles.querySelectorAll('.dot').forEach(dot => {
      const d = dot.getBoundingClientRect();
      const dx = d.left + d.width / 2;
      const dy = d.top + d.height / 2;

      if (Math.hypot(mouthX - dx, centerY - dy) < 15) {
        dot.remove();
      }
    });

    requestAnimationFrame(movePacman);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        movePacman();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(trigger);
});


function nextSlide(button) {
  changeSlide(button, 1);
}

function previousSlide(button) {
  changeSlide(button, -1);
}

function changeSlide(button, direction) {
  const slider = button.closest('.slider');
  const slides = slider.querySelectorAll('.place-images');

  let index = Number(slider.dataset.index || 0);
  index += direction;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slides.forEach(slide => slide.style.display = 'none');
  slides[index].style.display = 'block';

  slider.dataset.index = index;
}

document.querySelectorAll('.slider').forEach(slider => {
  const slides = slider.querySelectorAll('.place-images');
  slides.forEach(slide => slide.style.display = 'none');
  slides[0].style.display = 'block';
  slider.dataset.index = 0;
});
