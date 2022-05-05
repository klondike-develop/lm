$(document).ready(function() {
    var newCollectionsSlider = new Swiper('.new-collections-slider', {
        slidesPerView: 5,
        watchOverflow: true,
        spaceBetween: 15,

        navigation: {
            nextEl: '.new-collections .swiper-button-next',
            prevEl: '.new-collections .swiper-button-prev',
        },
    });
});