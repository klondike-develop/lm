$(document).ready(function() {
    if ($('[data-fancybox]').length) {
        $('[data-fancybox]').fancybox({
            infobar: false,
            transitionEffect: "slide",
            animationEffect: "fade",
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
    }

    $('.logistic-order-from-phone-mask').mask('+7 (999) 999-99-99');
});

document.addEventListener("DOMContentLoaded", function () {
    let sliderGallWarehouse = new Swiper(".gallary-warehouse__container", {
        slidesPerView: 5,
        spaceBetween: 16,
        watchOverflow: true,

        navigation: {
            nextEl: ".gallary-warehouse__slider .slider-next",
            prevEl: ".gallary-warehouse__slider .slider-prev",
        },
    });
})