$(document).ready(function() {
    $.each($(".new-collections"), function(index, val) {
        var slider = $(val).find(".new-collections-slider");
        var btnPrev = $(val).find(".swiper-button-prev");
        var btnNext = $(val).find(".swiper-button-next");

        var newCollectionsSlider = new Swiper(slider[0], {
            slidesPerView: 3,
            watchOverflow: true,
            spaceBetween: 15,
    
            navigation: {
                nextEl: btnNext[0],
                prevEl: btnPrev[0],
            },
    
            breakpoints: {
                1326: {
                    slidesPerView: 5
                }
            },
        });
    });
});