//Лабораторна 2
const navbar = document.getElementById("navbar");
const navbarLogoContainer = document.querySelector("#navbar-logo-container");
const navbarComponentsContainer = document.querySelector("#navbar-components-container");

const transition = "0.3s ease-in";
navbar.style.transition = transition;

if (window.innerWidth > 992) {
    window.addEventListener("scroll", function () {
        const scrollPos = window.scrollY;
        if (scrollPos > 1) {
            navbar.style.top = "-85px";
            navbar.style.backgroundColor = "rgb(235, 206, 202)";
            navbar.style.boxShadow = "2px 2px 8px";
        } else {
            navbar.style.top = "0px";
            navbar.style.backgroundColor = "#fefaf7";
            navbar.style.boxShadow = "none";
        }
    })
}

const footerField = document.querySelector('#footer-field');
document.querySelector('#footer-btn').addEventListener('click', () => {
    footerField.value = "";
})

//Лабораторна 3
const burgerMenu = document.querySelector("#burger-menu");
const hiddenMenu = document.querySelector("#hidden-menu");
if (window.innerWidth <= 992) {
    burgerMenu.style.display = "flex";

    if (navbarLogoContainer) {
        navbar.removeChild(navbarLogoContainer);
    }
    if (navbarComponentsContainer) {
        navbar.removeChild(navbarComponentsContainer);
    }

    let isClicked = false;
    burgerMenu.addEventListener('click', () => {
        hiddenMenu.style.transition = `0.5s ease-in-out`;
        if (!isClicked) {
            hiddenMenu.style.right = 0;
            isClicked = true;
        } else {
            hiddenMenu.style.right = `-300px`;
            isClicked = false;
        }
    });
}

const arrowTop = document.querySelector('#footer-arrow-top-btn');
arrowTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

//Лабораторна 4
const pictureContainer = document.querySelector('#pictures-slider');

const images = [
    'images/footer-images/flower1.jpg',
    'images/footer-images/flower2.jpg',
    'images/footer-images/flower3.jpg',
    'images/footer-images/flower4.jpg',
    'images/footer-images/flower5.jpg',
    'images/footer-images/flower6.jpg',
    'images/footer-images/flower7.jpg',
    'images/footer-images/flower8.jpg',
    'images/footer-images/flower9.jpg',
];

const promiseArray = [];

for (const image of images) {
    const promise = new Promise((resolve, reject) => {
        const imageHTML = document.createElement('img');
        imageHTML.classList.add('pictures');
        imageHTML.style.display = 'none';
        imageHTML.src = image;

        const arrayOfLoadingGifs = document.querySelectorAll('.loading-gif');

        if (window.innerWidth <= 992) {
            arrayOfLoadingGifs[0].style.display = 'flex';
        } else {
            for (let i = 0; i < arrayOfLoadingGifs.length; i++) {
                arrayOfLoadingGifs[i].style.display = 'flex';
            }
        }


        imageHTML.addEventListener('load', () => {
            resolve();
        });

        imageHTML.addEventListener('error', () => {
            reject();
        })

        pictureContainer.appendChild(imageHTML);
    });

    promiseArray.push(promise);
}

const picturesDisplayed = [];

setTimeout(() => {
    Promise.all(promiseArray).then(
        function () {
            const pictures = document.querySelectorAll('.pictures');
            if (window.innerWidth <= 992) {
                pictures[0].style.display = 'flex';
            } else {
                for (let i = 0; i < 4; i++) {
                    pictures[i].style.display = 'flex';
                }
            }

            document.querySelectorAll('.loading-gif').forEach((gif) => {
                gif.style.display = 'none';
            });

            findIndex();
        },
        function () {
            alert('Error occured while loading images');
        }
    )
}, 5000);

//Лабораторна 5
const pictures = document.querySelectorAll('.pictures');
const indexArrays = [];
let isEndNext = false;
let isEndBefore = true;

function nextSlide() {
    pictures[indexArrays[0]].style.display = 'none';

    for (let i = 0; i < indexArrays.length; i++) {
        if (indexArrays[i] < 8) {
            indexArrays[i] += 1;
            pictures[indexArrays[i]].style.display = 'flex';
            isEndNext = false;
            isEndBefore = false;
        }

        if (indexArrays[i] === 8) {
            isEndNext = true;
        }
    }
};

function previousSlide() {
    if (window.innerWidth >= 992) {
        pictures[indexArrays[3]].style.display = 'none';
    } else {
        pictures[indexArrays[0]].style.display = 'none';
    }

    for (let i = 0; i < indexArrays.length; i++) {
        if (indexArrays[i] > 0) {
            indexArrays[i] -= 1;
            pictures[indexArrays[i]].style.display = 'flex';
            isEndNext = false;
            isEndBefore = false;
        }

        if (window.innerWidth >= 992) {
            if (indexArrays[i] === 3) {
                isEndBefore = true;
            }
        } else {
            if (indexArrays[i] === 0) {
                isEndBefore = true;
            }
        }
    }
};

function findIndex() {
    for (let i = 0; i < pictures.length; i++) {
        if (pictures[i].style.display === 'flex') {
            indexArrays.push(i);
        }
    }
}


document.querySelector('#next-arrow').addEventListener('click', () => {
    if (!isEndNext) {
        nextSlide();
    }
})

document.querySelector('#previous-arrow').addEventListener('click', () => {
    if (!isEndBefore) {
        previousSlide();
    }
})

//Лабораторна 6
const buttons = document.querySelectorAll('.btns');
const arrowBtns = document.querySelectorAll('.arrow-btns');

buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        anime({
            targets: button,
            scale: 1.1,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
            borderRadius: "20px",
            duration: 500,
            easing: "easeInOutQuad"
        });
    });

    button.addEventListener('mouseout', () => {
        anime({
            targets: button,
            scale: 1,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            duration: 1000,
            easing: "easeInOutQuad"
        });
    });
});

const animationFooterBtnClick = (button, isGreen, isNotRounded) => {
    const backgroundColor = isGreen
        ? [
            { value: '#72a296', duration: 300 },
            { value: '#5d776c', duration: 500 }
        ]
        : [
            { value: 'rgba(254, 237, 235, 0.742)', duration: 300 },
            { value: 'rgb(235, 206, 202)', duration: 500 }
        ];

        const borderRadius = isNotRounded
        ? [  { value: '10%', duration: 300, easing: 'easeOutQuad' },
             { value: '0%', duration: 500, easing: 'easeOutElastic(1, .5)' }
        ]
        :  [
            { value: '50%', duration: 300, easing: 'easeOutQuad' },
            { value: '100%', duration: 500, easing: 'easeOutElastic(1, .5)' }
        ];
    anime({
        targets: button,
        scale: [
            { value: 1.2, duration: 500, easing: "easeOutQuad" },
            { value: 1, duration: 500, easing: 'easeOutElastic(1, .5)' },
        ],

        backgroundColor: backgroundColor,
        borderRadius: borderRadius,

        boxShadow: [
            { value: '0 10px 20px rgba(0, 0, 0, 0.3)', duration: 300 },
            { value: '0 5px 10px rgba(0, 0, 0, 0.2)', duration: 500 }
        ]
    });
};

document.querySelector('#footer-btn').addEventListener('click', () => {
    animationFooterBtnClick(document.querySelector('#footer-btn'), true, true);
})

document.querySelector('#input-calc-btn').addEventListener('click', () => {
    animationFooterBtnClick(document.querySelector('#input-calc-btn'), false, true);
})

document.querySelector('#form-btn').addEventListener('click', () => {
    animationFooterBtnClick(document.querySelector('#form-btn'), false, true);
})

arrowBtns.forEach((button) => {
    button.addEventListener('click', () => {
        animationFooterBtnClick(button, true, false);  
    })
})


//Лабораторна 7

function modifyThumbNail(event, parentImg) {
    const link = event.target.closest('a');
    if (!link) return;
    event.preventDefault();
    parentImg.src = link.href;
}


const galleryFlowers = document.querySelector('#gallery-el1');
const parentImageFlowers = document.querySelector('#catalogue-el1-image');

galleryFlowers.addEventListener('click', (event) => {
    modifyThumbNail(event, parentImageFlowers);
})

const galleryGifts = document.querySelector('#gallery-el2');
const parentImageGifts = document.querySelector('#catalogue-el2-image');

galleryGifts.addEventListener('click', (event) => {
    modifyThumbNail(event, parentImageGifts);
})

const galleryWeddings = document.querySelector('#gallery-el3');
const parentImageWeddings = document.querySelector('#catalogue-el3-image');

galleryWeddings.addEventListener('click', (event) => {
    modifyThumbNail(event, parentImageWeddings);
})

//Лабораторна 8

const discountField = document.querySelector('#discount');
const resultField = document.querySelector('#count-sum');
const flowersField = document.querySelector('#flowers-num');

const inputButton = document.querySelector('#input-calc-btn');
const inputs = document.querySelectorAll('.inputs-calc');

let roses = 0;
let lilies = 0;
let camomiles = 0;


function applyDiscount() {
    const result = detectFlowersAmount();
    let finalPrice = calculateOrigPrice();
    let discount = 0;
    if (result >= 50) {
        discount+= 15;
    } 
     if (roses >= 10)  {
        discount+= 15;
    } 
     if (lilies >= 10)  {
        discount+= 10;
    } 
    
    if (camomiles >= 10)  {
        discount+= 5;
    }

    finalPrice = finalPrice * (1 - discount / 100);
    finalPrice = finalPrice.toFixed(2); 

    discountField.textContent = `${discount}%`;
    resultField.textContent = `${finalPrice}$`;
}

function calculateOrigPrice() {
    const priceRoses = roses * 5;
    const priceLilies = lilies * 4.5;
    const priceCamomiles = camomiles * 2.5;

    return priceRoses + priceLilies + priceCamomiles;
}

inputButton.addEventListener('click', () => {
    applyDiscount();
})

function detectFlowersAmount() {
    let isFullyFilled = true;
    let result = 0;

    inputs.forEach((input) => {
        if (!input.value && input.value >= 0) {
            isFullyFilled = false;
        }
    });

    if (isFullyFilled) {
        for (let i = 0; i < inputs.length; i++) {
            result += Number(inputs[i].value);
            roses = inputs[0].value;
            lilies = inputs[1].value;
            camomiles = inputs[2].value;
            flowersField.textContent = `Roses: ${roses}, Lilies: ${lilies}, Daisies: ${camomiles}`;
        }
        return result;
    } else {
        alert("Please enter valid numbers greater than 0 in all fields.");
    }
}

//Лабораторна 9

document.getElementById("feedback-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("form-input-1").value;
    const surname = document.getElementById("form-input-2").value;
    const email = document.getElementById("form-input-3").value;
    const phone = document.getElementById("form-input-4").value;
    const comment = document.getElementById("form-input-5").value;
    const cv = document.getElementById("form-input-6").value;
    const errorMessages = document.getElementById("error-messages");
  
    errorMessages.innerHTML = "";

    let isCorrect = true;
  
    const nameSurnameRegex = /^[a-zA-Zа-яА-Я'-]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+380|0)\d{9}$/;
  
    let errors = [];
  
    if (!name) {
      errors.push("The 'Name' field is mandatory.");
      isCorrect = false;
    } else if (!nameSurnameRegex.test(name)) {
      errors.push("The 'Name' field must contain only letters, apostrophes, or hyphens, and must be at least 3 characters long.");
      isCorrect = false;
    } 
  
    if (!surname) {
      errors.push("The 'Surname' field is mandatory.");
      isCorrect = false;
    } else if (!nameSurnameRegex.test(surname)) {
      errors.push("The 'Surname' field must contain only letters, apostrophes, or hyphens, and must be at least 3 characters long.");
      isCorrect = false;
    }
 
    if (!email) {
      errors.push("The 'Email' field is mandatory.");
      isCorrect = false;
    } else if (!emailRegex.test(email)) {
      errors.push("The 'Email' field should have correct format, for ex., example@mail.com.");
      isCorrect = false;
    }
  
    if (!phone) {
      errors.push("The 'Phone' field is mandatory.");
      isCorrect = false;
    } else if (!phoneRegex.test(phone)) {
      errors.push("The 'Phone' field should be in the format of +380XXXXXXXXX or 0XXXXXXXXX.");
      isCorrect = false;
    }
  
    if (errors.length > 0) {
      event.preventDefault();
      errorMessages.innerHTML = errors.map((err) => `<p>${err}</p>`).join("");

      const formContentHeight = document.querySelector('#form-content').offsetHeight;
      document.querySelector('#form-picture').style.height = `${formContentHeight}px`;
    }

    if(isCorrect) {
        alert('The form was successfully sent!');
    
        document.querySelectorAll('.form-inputs').forEach((form) => {
            form.value = '';
        })

        document.querySelector('#form-picture').style.height = `522px`;
    }
  });
  