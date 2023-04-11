// SLIDER

new Swiper('.hero__slider', {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    navigation: {
        prevEl: '.hero__slider-btn-btn_prev',
        nextEl: '.hero__slider-btn-btn_next'
    },
    autoplay: {
        delay: 3000
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        560: {
            spaceBetween: 8,
        }
    }
});

// CALCULATOR

const calcForm = document.querySelector('.js-calc-form');
const totalSquare = document.querySelector('.js-square');
const totalPrice = document.querySelector('.js-total-price');
const calcResultWrapper = document.querySelector('.calc__result-wrapper')
const btnSubmit = document.querySelector('.js-submit')

const tariff = {
    economy: 550,
    comfort: 1400,
    premium: 2700,
}
calcForm.addEventListener('input', () => {
    btnSubmit.disabled = !(calcForm.wcidth.value > 0 && calcForm.length.value > 0)

    // if (calcForm.width.value > 0 && calcForm.length.value > 0) {
    //     btnSubmit.disabled = false
    // } else {
    //     btnSubmit.disabled = true
    // }
});

calcForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (calcForm.width.value > 0 && calcForm.length.value > 0) {
        const square = calcForm.width.value * calcForm.length.value;
        const price = square * tariff[calcForm.tariff.value];

        calcResultWrapper.style.display = 'inline';

        totalSquare.textContent = `${square} кв м`;
        totalPrice.textContent = `${price} руб`;
    }
})

// модальное окно
const scrollController = {
    scrollPosition: 0,
    disabledScroll() {
        scrollController.scrollPosition = window.scrollY;
        document.body.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${window.innerWidth - document.body.offsetWidth}px
        `;
        document.documentElement.style.scrollBehavior = 'unset';
    },
    enabledScroll() {
        document.body.style.cssText = '';
        window.scroll({top: scrollController.scrollPosition})
        document.documentElement.style.scrollBehavior = '';
    },
    }


    const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
    const buttonElems = document.querySelectorAll(btnOpen);
    const modalElem = document.querySelector(modal);

    modalElem.style.cssText = `
        display: flex;
        visibility: hidden;
        opacity: 0;
        transition: opacity ${time}ms ease-in-out;
    `;

    const closeModal = event => {
        const target = event.target;

        if (
        target === modalElem ||
        (btnClose && target.closest(btnClose)) ||
        event.code === 'Escape'
        ) {
        
        modalElem.style.opacity = 0;

        setTimeout(() => {
            modalElem.style.visibility = 'hidden';
            scrollController.enabledScroll();
        }, time);

        window.removeEventListener('keydown', closeModal);
        }
    }

    const openModal = () => {
        modalElem.style.visibility = 'visible';
        modalElem.style.opacity = 1;
        window.addEventListener('keydown', closeModal);
        scrollController.disabledScroll();
    };

    buttonElems.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modalElem.addEventListener('click', closeModal);
    };

    
modalController({
    modal: '.modal',
    btnOpen: '.js-order', 
    btnClose: '.modal__close',
    time: 400
});
