$(document).ready(function() {
    var newCollectionsSlider = new Swiper('.new-collections-slider', {
        slidesPerView: 3,
        watchOverflow: true,
        spaceBetween: 15,

        navigation: {
            nextEl: '.new-collections .swiper-button-next',
            prevEl: '.new-collections .swiper-button-prev',
        },

        breakpoints: {
            1326: {
                slidesPerView: 5
            }
        },
    });
});