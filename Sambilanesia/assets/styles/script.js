// active link
let home = document.querySelector('#Home');
let about = document.querySelector('#About');
let services = document.querySelector('#Services');
let profile = document.querySelector('#Profile');

window.addEventListener('scroll', function () {
    let nav = window.pageYOffset;


    if (home.offsetTop <= Math.round(nav) && about.offsetTop > Math.round(nav)) {
        console.log("home");
        document.getElementsByTagName('a')[1].setAttribute('id', 'active');
        document.getElementsByTagName('a')[2].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[3].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[4].removeAttribute('id', 'active');
    }
    else if (about.offsetTop <= (Math.round(nav) + 1) && services.offsetTop > Math.round(nav)) {
        console.log("about");
        document.getElementsByTagName('a')[2].setAttribute('id', 'active');
        document.getElementsByTagName('a')[1].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[3].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[4].removeAttribute('id', 'active');

    }
    else if (services.offsetTop <= Math.round(nav) && profile.offsetTop > Math.round(nav)) {
        console.log("services");
        document.getElementsByTagName('a')[3].setAttribute('id', 'active');
        document.getElementsByTagName('a')[1].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[2].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[4].removeAttribute('id', 'active');
    }
    else if (profile.offsetTop <= Math.round(nav)) {
        console.log("profile");
        document.getElementsByTagName('a')[4].setAttribute('id', 'active');
        document.getElementsByTagName('a')[1].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[2].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[3].removeAttribute('id', 'active');
    }
    else {
        console.log("home");
        document.getElementsByTagName('a')[1].setAttribute('id', 'active');
        document.getElementsByTagName('a')[2].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[3].removeAttribute('id', 'active');
        document.getElementsByTagName('a')[4].removeAttribute('id', 'active');
    }
});


// scroll reveal
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal('.image, #Home article, #About article, #Services .h1-main, .courses_card, .services_1, #Profile article', {
    interval: 150
});

// tollbar

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
burger.addEventListener('click', function () {

    menu.classList.toggle('appear');
});