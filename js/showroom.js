$(document).ready(function(){

    //fancybox
    $('[data-fancybox]').fancybox({
        infobar: false,
        transitionEffect: "slide",
        buttons: [
            "close"
        ],
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
                NEXT: "Следующая",
                PREV: "Предыдущая",
                ERROR: "Запрошенный контент не может быть загружен. <br/> Повторите попытку позже.",
                PLAY_START: "Включить слайд-шоу",
                PLAY_STOP: "Остановить слайд-шоу",
                FULL_SCREEN: "Полноэкранный режим",
                THUMBS: "Эскизы",
                DOWNLOAD: "Скачать",
                SHARE: "Поделиться",
                ZOOM: "Увеличить"
            }
        }
    });

    //------------------------------------------------------------------------//

    //new showroom categories
    var newShowroomCategories,
        newShowroomCategoriesLength = $('.new-showroom-products-categories').length;
    if ( newShowroomCategoriesLength ) {
        newShowroomCategories = new Swiper ('.new-showroom-products-categories', {
            navigation: {
                nextEl: '.new-showroom-products-categories-wrapper .swiper-button-next',
                prevEl: '.new-showroom-products-categories-wrapper .swiper-button-prev',
            },
            speed: 500,
            slidesPerView: 5,
            watchOverflow: true,
            breakpoints: {
                1326: {
                    slidesPerView: 8
                }
            }
        });
    }

    //------------------------------------------------------------------------//

});//document ready