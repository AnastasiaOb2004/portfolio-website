const cloudWrapper = document.querySelector('#cloud-wrapper');
const allIntroP = document.querySelectorAll('#home-content-text p');
const introHeader = document.querySelector('#home-content-text h1');
const introBtn = document.querySelector('#home-content-text button');

const homeContent = document.querySelector('#home-content');
const introCharacter = document.querySelector('#home-character');


if (window.innerWidth <= 768) {

    homeContent.style.display = 'flex';
    homeContent.style.flexDirection = 'column';
    homeContent.style.marginRight = '40px';

    cloudWrapper.style.display = 'none';
    allIntroP.forEach(p => {
        p.style.fontSize = '23px';
    });

    introHeader.style.fontSize = '40px';
    introBtn.style.display = 'none';
    
    introCharacter.style.width = `386px`;
    introCharacter.style.marginTop = `15px`;
    introCharacter.style.left = `-10px`;
}