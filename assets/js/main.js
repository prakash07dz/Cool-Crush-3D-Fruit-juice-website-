window.addEventListener('load', function () {
    showPreloader();
    toggleNav();
    setupButtonHoverEffect();
    setupScrollToTopButton();
    setupHoverEffect();
    setupBlogSlider();
    setupFadeEffect();
    setupCustomCursor();
});

//? preloader

function showPreloader() {
    document.getElementById('preloader').style.display = 'flex';

    setTimeout(function () {
        document.getElementById('preloader').style.display = 'none';
    }, 3000);
}

//? toggle navbar

function toggleNav() {
    document.getElementById('ham-btn').addEventListener('click', () => {
        const navItems = document.querySelector('.nav-items');
        if (navItems.style.display === 'flex') {
            navItems.style.display = 'none';
            document.querySelector('#nav-list').classList.remove('active-header');
        } else {
            navItems.style.display = 'flex';
            document.querySelector('#nav-list').classList.add('active-header');
        }
    });
}

//? button hover effect

function setupButtonHoverEffect() {
    let buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        let text = button.textContent;
        button.innerHTML = '';

        for (let char of text) {
            let span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            button.appendChild(span);
        }

        let spans = button.querySelectorAll('span');

        button.addEventListener('mouseenter', () => {
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.add('hover');
                }, index * 50);
            });
        });

        button.addEventListener('mouseleave', () => {
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('hover');
                }, index * 50);
            });
        });
    });
}

//?scroll to top button 

function setupScrollToTopButton() {

    let mybutton = document.getElementById("scrollToTopBtn");

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    mybutton.addEventListener('click', scrollToTop);

    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

//? multiple images on mouse hover

function setupHoverEffect() {

    let elems = document.querySelectorAll('.elem');

    elems.forEach(function (e) {

        let hoverImg = e.querySelector('img');

        e.addEventListener('mouseenter', function () {
            hoverImg.style.opacity = "1";
        });

        e.addEventListener('mouseleave', function () {
            hoverImg.style.opacity = "0";
        });

        e.addEventListener('mousemove', function (dets) {
            let rect = e.getBoundingClientRect();
            let offsetX = dets.clientX - rect.left;
            let offsetY = dets.clientY - rect.top;
            hoverImg.style.left = offsetX - (hoverImg.width / 2) + "px";
            hoverImg.style.top = offsetY - (hoverImg.height / 2) + "px";
        });
    });
}

//? blog slider

function setupBlogSlider() {
    const sliderContainer = document.querySelector('.blog-slider-container');
    const sliderItems = document.querySelectorAll('.blog-slider-item');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let index = 0;

    prevBtn.addEventListener('click', () => {
        index = (index > 0) ? index - 1 : sliderItems.length - 1;
        sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    });

    nextBtn.addEventListener('click', () => {
        index = (index < sliderItems.length - 1) ? index + 1 : 0;
        sliderContainer.style.transform = `translateX(-${index * 100}%)`;
    });
}

//? fade effect

function setupFadeEffect() {

    const options = {
        threshold: 0.1,
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, options);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        observer.observe(section);
    });
}

//? custom cursor

function setupCustomCursor() {

    if (typeof $.fn.confettiButton !== 'undefined') {
        $('.cursor').confettiButton();
    } else {
        console.error("confettiButton plugin is not loaded");
    }

    $(document).mousemove(function (e) {

        let cursor = $('.cursor');
        let product = $('#product');
        let productOffset = product.offset();
        let productHeight = product.outerHeight();
        let productWidth = product.outerWidth();

        if (e.pageY >= productOffset.top && e.pageY <= productOffset.top + productHeight && e.pageX >= productOffset.left && e.pageX <= productOffset.left + productWidth) {
            cursor.css({ left: e.pageX, top: e.pageY }).show();
        } else {
            cursor.hide();
        }
    });
}
