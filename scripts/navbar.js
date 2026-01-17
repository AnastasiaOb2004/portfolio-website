let hoverTimeout = null;

function handleNavbarDisplay() {
  const burgerMenu = document.querySelector('#burger-menu');
  const hiddenMenu = document.querySelector('#hidden-menu');
  const navbar = document.querySelector('#navbar');

  burgerMenu.style.display = 'none';
  hiddenMenu.innerHTML = '';
  navbar.innerHTML = '';

  const projectsSubMenu = `
    <ul class="projects-submenu">
      <li><a href="uxProjects.html">UX-Projects</a></li>
      <li><a href="frontEndProjects.html">Front-end</a></li>
      <li><a href="gameProjects.html">Game Design</a></li>
    </ul>
  `;

  if (window.innerWidth <= 768) {
    navbar.style.display = 'none';
    burgerMenu.style.display = 'flex';

    let isClicked = false;

    burgerMenu.onclick = () => {
      hiddenMenu.style.transition = '0.5s ease-in-out';
      hiddenMenu.style.right = isClicked ? '-300px' : '10px';
      isClicked = !isClicked;
    };

    hiddenMenu.innerHTML = `
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="skills.html">Skills</a></li>
        <li class="projects-toggle">
          <span class="projects-label">Projects <span class="arrow">▾</span></span>
          ${projectsSubMenu}
        </li>
      </ul>
    `;

    setupProjectsToggle();
  } else {
    navbar.style.display = 'flex';

    navbar.innerHTML = `
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="skills.html">Skills</a></li>
        <li class="projects-toggle">
          <span class="projects-label">Projects <span class="arrow">▾</span></span>
          ${projectsSubMenu}
        </li>
      </ul>
    `;

    setupDesktopHover();
  }
}

function setupProjectsToggle() {
  document.querySelectorAll('.projects-toggle').forEach(item => {
    const submenu = item.querySelector('.projects-submenu');

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      submenu.classList.toggle('show');
      item.classList.toggle('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.projects-submenu').forEach(menu => {
      menu.classList.remove('show');
    });
    document.querySelectorAll('.projects-toggle').forEach(item => {
      item.classList.remove('open');
    });
  });
}

function setupDesktopHover() {
  const item = document.querySelector('.projects-toggle');
  const submenu = item.querySelector('.projects-submenu');

  item.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    submenu.classList.add('show');
    item.classList.add('open');

    hoverTimeout = setTimeout(() => {
      submenu.classList.remove('show');
      item.classList.remove('open');
    }, 1000);
  });

  item.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      submenu.classList.remove('show');
      item.classList.remove('open');
    }, 1000);
  });
}

window.addEventListener('load', handleNavbarDisplay);
window.addEventListener('resize', handleNavbarDisplay);
