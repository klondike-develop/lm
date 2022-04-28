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

});//document ready