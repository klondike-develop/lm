$(document).ready(function () {

    //wholesale subcategory products
    var wholesaleSubcategoryProducts = $('.wholesale-subcategory-products');
    if (wholesaleSubcategoryProducts.length) {
        wholesaleSubcategoryProducts.each(function (index, element) {
            var thisParent = $(element).parents('.wholesale-subcategory-products-wrapper');
            var thisPrev = thisParent.find('.swiper-button-prev');
            var thisNext = thisParent.find('.swiper-button-next');
            new Swiper($(element), {
                navigation: {
                    nextEl: thisNext,
                    prevEl: thisPrev,
                },
                watchOverflow: true,
                speed: 500,
                spaceBetween: 16,
                slidesPerView: 'auto',
                centerInsufficientSlides: true,
            });
        });
    }

    //------------------------------------------------------------------------//

});//document ready