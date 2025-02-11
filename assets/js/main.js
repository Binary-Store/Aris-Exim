(function ($) {
    'use strict';

    /*-------------------------------------------------------------------------------
  Preloader
    -------------------------------------------------------------------------------*/
    $(window).on('load', function () {
        $('.ct-preloader').addClass('hidden');
    });

    /*-------------------------------------------------------------------------------
  Aside Menu
    -------------------------------------------------------------------------------*/

    $(".aside-trigger-right").on('click', function () {
        var $el = $(".sigma_aside-right-panel");
        $el.toggleClass('open');
        if ($el.hasClass('open')) {
            setTimeout(function () {
                $el.find('.sidebar').fadeIn();
            }, 300);
        } else {
            $el.find('.sidebar').fadeOut();
        }
    });

    $(".aside-trigger-left").on('click', function () {
        $(".sigma_aside-left").toggleClass('open');
    });

    $(".sigma_aside .menu-item-has-children > a").on('click', function (e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();

        submenu.slideToggle(200);
    });


    /*-------------------------------------------------------------------------------
  Sticky Header
    -------------------------------------------------------------------------------*/
    var header = $(".can-sticky");
    var headerHeight = header.innerHeight();

    function doSticky() {
        if (window.pageYOffset > headerHeight) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    }
    doSticky();

    /*-------------------------------------------------------------------------------
  Aside Scroll
    -------------------------------------------------------------------------------*/
    function initAsideScrollbar() {
        var scrollHeight = $('.main-aside').innerHeight() - $(".main-aside .navbar-brand").innerHeight(); // Calculate the height of the scroll container
        var calculatedHeight = isNaN(scrollHeight) ? "auto" : scrollHeight;
        $('.aside-scroll').slimScroll({
            height: calculatedHeight,
            position: "right",
            size: "5px",
            color: "#dcdcdc",
            opacity: 1,
            wheelStep: 5,
            touchScrollStep: 50,
        });
    }
    initAsideScrollbar();

    /*-------------------------------------------------------------------------------
    Count Up
    -------------------------------------------------------------------------------*/
    $('.counter-number span').each(function () {
        $(this).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    /*-------------------------------------------------------------------------------
    Progress bar on view
    -------------------------------------------------------------------------------*/
    $(".sigma_progress").each(function () {
        var progressBar = $(this).find(".progress-bar");
        var progressCount = $(this).find(".sigma_progress-count");
        $(progressBar).on('inview', function (event, isInView) {
            if (isInView) {
                $(progressBar).animate({
                    width: $(progressBar).attr("aria-valuenow") + "%"
                });
                $(progressCount).animate({
                    left: $(progressBar).attr("aria-valuenow") + "%"
                });
            }
        });
    });

    /*-------------------------------------------------------------------------------
    Tooltips
    -------------------------------------------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /*-------------------------------------------------------------------------------
    Magnific Popup
    -------------------------------------------------------------------------------*/
    $('.popup-youtube').magnificPopup({
        type: 'iframe'
    });
    $('.popup-vimeo').magnificPopup({
        type: 'iframe'
    });
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });

    /*-------------------------------------------------------------------------------
    Banner Slider
    -------------------------------------------------------------------------------*/
    $(".banner-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.banner .slider-prev'),
        nextArrow: $('.banner .slider-next'),
        autoplay: true,       // Enables automatic sliding
        autoplaySpeed: 3000,  // Sets the delay (in milliseconds) between slides
        responsive: [{
            breakpoint: 768,
            settings: {
                arrows: false,
                dots: true,
                autoplay: true,  // Ensures autoplay works on smaller screens
                autoplaySpeed: 3000
            }
        }]
    });


    /*-------------------------------------------------------------------------------
    Testimonials Slider
    -------------------------------------------------------------------------------*/
    $(".ct-testimonials-slider").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.ct-testimonials .slider-prev'),
        nextArrow: $('.ct-testimonials .slider-next'),
    });

    $(".ct-testimonials-slider-3").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 1,
            }
        },]
    });

    /*-------------------------------------------------------------------------------
    Banner Carousel Slider
    -------------------------------------------------------------------------------*/
    $(".banner-carousel-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        centerMode: true,
        centerPadding: '0px',
        prevArrow: $('.banner .slider-prev'),
        nextArrow: $('.banner .slider-next'),
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false,
                dots: true
            }
        },
        ]
    });

    /*-------------------------------------------------------------------------------
    Insta Slider
    -------------------------------------------------------------------------------*/

    $(".insta-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
        },
        ]
    });

    /*-------------------------------------------------------------------------------
    Masonry
    -------------------------------------------------------------------------------*/
    $('.masonry').imagesLoaded(function () {
        var isotopeContainer = $('.masonry');
        isotopeContainer.isotope({
            itemSelector: '.masonry-item',
        });
    });

    /*-------------------------------------------------------------------------------
    Product List/Grid Toggle
    -------------------------------------------------------------------------------*/
    $(".toggle-grid").on('click', function () {
        $(".view-toggler i").removeClass('active');
        $(this).addClass('active');
        $('.ct-product').removeClass('product-list');
        $('.ct-product').parent().removeClass('col-md-12').addClass('col-md-6');
    })
    $(".toggle-list").on('click', function () {
        $(".view-toggler i").removeClass('active');
        $(this).addClass('active');
        $('.ct-product').addClass('product-list');
        $('.ct-product').parent().removeClass('col-md-6').addClass('col-md-12');
    })

    //On scroll events
    $(window).on('scroll', function () {

        doSticky();

    });

    //On resize events
    $(window).on('resize', function () {

        initAsideScrollbar();

    });

})(jQuery);