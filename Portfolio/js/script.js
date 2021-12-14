$(document).ready(function () {

    // nav-burger
    $(".navbar-toggler").click(function () {
        $(".navbar-toggler--nav").toggleClass("toggler-active");
    });

    // nav scroll click
    $(".js-click").click(function (e) {
        let href = $(this).attr("href");

        let ambilIsiHref = $(href);

        $("html, body").animate(
            {
                scrollTop: ambilIsiHref.offset().top - 50
            }
            // , 1000,
            // "easeInOutExpo"
        );
        e.preventDefault();
    });

    // when navbar scroll
    let navbarCollapse = function () {
        if ($("#navbar").offset().top > 100)
            $("#navbar").addClass("nav-collapse");
        else
            $("#navbar").removeClass("nav-collapse");
    }

    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // when nav click and scroll
    $(window).scroll(function () {
        let height = $(this).scrollTop();
        // console.log(height);

        if ((height >= ($("#home").offset().top - 50)) && (height < ($("#experience").offset().top - 100))) {
            $("ul li a.nav-link").eq(0).addClass("active");

            $("ul li a.nav-link").eq(1).removeClass("active");
            $("ul li a.nav-link").eq(2).removeClass("active");
            $("ul li a.nav-link").eq(3).removeClass("active");
        }
        else if ((height >= ($("#experience").offset().top - 100)) && (height < ($("#portfolio").offset().top - 100))) {
            $("ul li a.nav-link").eq(1).addClass("active");
            $("#experience").show();
            $("ul li a.nav-link").eq(0).removeClass("active");
            $("ul li a.nav-link").eq(2).removeClass("active");
            $("ul li a.nav-link").eq(3).removeClass("active");
        }
        else if ((height >= ($("#portfolio").offset().top - 100)) && (height < ($("#contact").offset().top - 550))) {
            $("ul li a.nav-link").eq(2).addClass("active");
            $("ul li a.nav-link").eq(0).removeClass("active");
            $("ul li a.nav-link").eq(1).removeClass("active");
            $("ul li a.nav-link").eq(3).removeClass("active");
        }
        else if ((height >= ($("#contact").offset().top - 550))) {
            $("ul li a.nav-link").eq(3).addClass("active");
            $("ul li a.nav-link").eq(1).removeClass("active");
            $("ul li a.nav-link").eq(2).removeClass("active");
            $("ul li a.nav-link").eq(0).removeClass("active");
        }
        else {
            $("ul li a.nav-link").eq(0).addClass("active");
            $("ul li a.nav-link").eq(1).removeClass("active");
            $("ul li a.nav-link").eq(2).removeClass("active");
            $("ul li a.nav-link").eq(3).removeClass("active");
        }
    });


});