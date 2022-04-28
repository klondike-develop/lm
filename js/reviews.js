$(document).ready(function () {

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

    //reviews sorting
    $('.reviews-sorting a').on('click', function (event) {
        event.preventDefault();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
    });

    //------------------------------------------------------------------------//

    //reviews audio
    $('.reviews-audio audio').audioPlayer();

    //------------------------------------------------------------------------//

    //reviews gallery
    var reviewsGallery,
        reviewsGalleryLength = $('.reviews-item-gallery').length;
    if (reviewsGalleryLength) {
        reviewsGallery = new Swiper('.reviews-item-gallery', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            watchOverflow: true,
            speed: 500,
            spaceBetween: 10,
            slidesPerView: 'auto',
        });
    }

    //------------------------------------------------------------------------//

    //reviews text more
    $(document).on('click', '.reviews-item-text-more', function (event) {
        event.preventDefault();
        $(this).hide().parents('.reviews-item-text').find('.reviews-item-text-hidden').show();
    });

    //------------------------------------------------------------------------//

});//document ready