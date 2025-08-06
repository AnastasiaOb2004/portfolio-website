function handleNavbarDisplay() {
    const burgerMenu = document.querySelector('#burger-menu');
    const hiddenMenu = document.querySelector('#hidden-menu');
    const navbar = document.querySelector('#navbar');

    burgerMenu.style.display = 'none';
    hiddenMenu.innerHTML = '';
    navbar.innerHTML = '';

    if (window.innerWidth <= 768) {
      navbar.style.display = 'none';
        burgerMenu.style.display = 'flex';
        let isClicked = false;
        burgerMenu.addEventListener('click', () => {
            hiddenMenu.style.transition = `0.5s ease-in-out`;
            if (!isClicked) {
                hiddenMenu.style.right = `10px`;
                isClicked = true;
            } else {
                hiddenMenu.style.right = `-300px`;
                isClicked = false;
            }
        });
        hiddenMenu.innerHTML = `
         <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="html/about.html">About</a></li>
    <li><a href="html/skills.html">Skills</a></li>
    <li><a href="html/projects.html">Projects</a></li>
  </ul>
`;
    } else {
        navbar.style.display = `flex`;
        navbar.innerHTML = `
         <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="html/about.html">About</a></li>
    <li><a href="html/skills.html">Skills</a></li>
    <li><a href="html/projects.html">Projects</a></li>
  </ul>
`;
    }
}

window.addEventListener('load', handleNavbarDisplay);
window.addEventListener('resize', handleNavbarDisplay);
