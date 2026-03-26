let hoverTimeout = null;

function handleNavbarDisplay() {
  const burgerMenu = document.querySelector('#burger-menu');
  const hiddenMenu = document.querySelector('#hidden-menu');
  const navbar = document.querySelector('#navbar');

  navbar.innerHTML = '';
  hiddenMenu.innerHTML = '';
  hiddenMenu.classList.remove('open');

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

    hiddenMenu.innerHTML = `
      <div class="mobile-menu-content">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="skills.html">Skills</a></li>
          <li class="projects-toggle">
            <button type="button" class="projects-label">
              <span>Projects</span>
              <span class="arrow">▾</span>
            </button>
            ${projectsSubMenu}
          </li>
        </ul>
      </div>
    `;

    burgerMenu.onclick = (e) => {
      e.stopPropagation();
      hiddenMenu.classList.toggle('open');
      burgerMenu.classList.toggle('active');
    };

    setupProjectsToggle();
    setupMobileClose();
  } else {
    navbar.style.display = 'flex';
    burgerMenu.style.display = 'none';
    hiddenMenu.classList.remove('open');

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
    const trigger = item.querySelector('.projects-label');
    const submenu = item.querySelector('.projects-submenu');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      item.classList.toggle('open');
      submenu.classList.toggle('show');
    });
  });
}

function setupMobileClose() {
  const hiddenMenu = document.querySelector('#hidden-menu');
  const burgerMenu = document.querySelector('#burger-menu');

  document.addEventListener('click', (e) => {
    if (
      hiddenMenu.classList.contains('open') &&
      !hiddenMenu.contains(e.target) &&
      !burgerMenu.contains(e.target)
    ) {
      hiddenMenu.classList.remove('open');
      burgerMenu.classList.remove('active');
    }
  });

  hiddenMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hiddenMenu.classList.remove('open');
      burgerMenu.classList.remove('active');
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
  });

  item.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      submenu.classList.remove('show');
      item.classList.remove('open');
    }, 300);
  });
}

window.addEventListener('load', handleNavbarDisplay);
window.addEventListener('resize', handleNavbarDisplay);