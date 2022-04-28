$(document).ready(function(){

    //cabinet order more
    $('.cabinet-order-more').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet-order-content').toggleClass('open').find('.cabinet-order-detail').slideToggle(200);
    });

    //------------------------------------------------------------------------//

    //cabinet order set
    $('.cabinet-order-product-set-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet-order-product-set').toggleClass('open').find('.cabinet-order-product-set-list').slideToggle(200);
    });

    //------------------------------------------------------------------------//

    //cabinet order history
    $('.cabinet-order-history-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.cabinet-order-sidebar-caption').toggleClass('open').find('.cabinet-order-history').slideToggle(200);
    });

    //------------------------------------------------------------------------//

    //cabinet file
    $('.cabinet-file-input').on('change', function(event) {
        var fileValue = $(this).val();
        fileValue = fileValue.substr(fileValue.lastIndexOf('\\') + 1);
        if (fileValue) {
            $('.cabinet-file-label').text(fileValue);
        }
    });

    //------------------------------------------------------------------------//

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

});//document ready