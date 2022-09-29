// Add attribute for section title
const sectionTitles = document.querySelectorAll(".section-title");
sectionTitles.forEach(function (title) {
  title.setAttribute("data-aos", "zoom-in");
});

// add attribute for footer link
const footerLinks = document.querySelectorAll(".footer-link");
footerLinks.forEach((link, index) => {
  index > 0 ? index *= 10 : index;
  link.setAttribute("data-aos", "zoom-in-right");
  link.setAttribute("data-aos-duration", index * 100 + 600);

});

// animation on scroll
AOS.init({
  duration: 600,
  once: true,
});

// navbar scroll animation
const navbar = document.getElementById("my-navbar");
const navbarBrand = document.querySelector(".navbar-brand");
window.onscroll = () => {
  if (this.scrollY > 0) {
    navbar.style.padding = "0";
    navbarBrand.style.fontSize = "2.5rem";
  } else {
    navbar.style.padding = "1rem 0";
    navbarBrand.style.fontSize = "2rem";
  }
};

// Burger menu
const burger = document.querySelector(".navbar-toggler--nav");
burger.addEventListener("click", () => {
  burger.classList.toggle("toggler-active");
})