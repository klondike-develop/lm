$(document).ready(function () {

    //filter range

    maxValue = 15000;

    $('.filter-range-slider').nstSlider({
        "rounding": {
            "10": "1"
        },
        "crossable_handles": false,
        "left_grip_selector": ".filter-range-handle-min",
        "right_grip_selector": ".filter-range-handle-max",
        "value_bar_selector": ".filter-range-bar",
        "value_changed_callback": function (cause, leftValue, rightValue) {
            $(this).parent().find('.filter-range-input-min').val(accounting.formatNumber(leftValue, 0, " "));
            $(this).parent().find('.filter-range-input-max').val(accounting.formatNumber(rightValue, 0, " "));
        }
    });

    $('.filter-range-input-min, .filter-range-input-max').on('change', function (event) {

        var thisParents = $(this).parents('.catalog-filter-range');

        var minVal = thisParents.find('.filter-range-input-min').val().replace(/\s/g, '');
        minVal = parseInt(minVal, 10);
        var maxVal = thisParents.find('.filter-range-input-max').val().replace(/\s/g, '');
        maxVal = parseInt(maxVal, 10);
        if (minVal >= maxVal) {
            minVal = maxVal - 10;
        }
        if (maxVal > maxValue || !maxVal) {
            maxVal = maxValue;
        }
        if (!minVal) {
            minVal = 0;
        }
        thisParents.find('.filter-range-slider').nstSlider('set_position', maxVal, minVal);
        thisParents.find('.filter-range-slider').nstSlider('refresh');
    });

    function filterPanelLeft(thisTargetPanelLeft, thisTargetPanelWidth, filterTarget, thisTargetPanel) {

        var filterWidth = filterTarget.innerWidth();
        var filterLeft = filterTarget.offset().left;
        var filterTotal = filterWidth + filterLeft;
        var panelTotal = thisTargetPanelWidth + thisTargetPanelLeft;

        if (filterLeft <= thisTargetPanelLeft && filterTotal >= panelTotal && filterWidth >= thisTargetPanelWidth) {
            //console.log('good');
        } else if (filterLeft <= thisTargetPanelLeft && filterTotal < panelTotal && filterWidth >= thisTargetPanelWidth) {
            thisTargetPanel.css({ 'margin-left': filterTotal - panelTotal });
        } else if (filterLeft > thisTargetPanelLeft && filterTotal >= panelTotal && filterWidth >= thisTargetPanelWidth) {
            thisTargetPanel.css({ 'margin-left': filterLeft - thisTargetPanelLeft });
        } else if (filterWidth < thisTargetPanelWidth) {
            thisTargetPanel.css({ 'margin-left': filterTotal - panelTotal });
        }
    }

    $(window).resize(function () {
        if ($('.catalog-filter-sorting-panel').is(':visible')) {
            var thisTargetPanel = $('.drop.active').find('.catalog-filter-sorting-panel');
            thisTargetPanel.css({ 'margin-left': 0 });
            var thisTargetPanelWidth = thisTargetPanel.innerWidth(),
                thisTargetPanelLeft = thisTargetPanel.offset().left,
                filterTarget = $('.catalog-filter');
            filterPanelLeft(thisTargetPanelLeft, thisTargetPanelWidth, filterTarget, thisTargetPanel);
        }
    });

    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        var thisParent = $(this).parent('.drop');
        if (thisParent.find('.filter-range-slider').length) {
            $('.filter-range-slider').each(function (index, el) {
                $(el).nstSlider('refresh');
            });
        }
        //
        if (thisParent.hasClass('active') && thisParent.hasClass('catalog-filter-sorting-drop')) {

            var thisTargetPanel = thisParent.find('.catalog-filter-sorting-panel');
            thisTargetPanel.css({ 'margin-left': 0 });

            var thisTargetPanelWidth = thisTargetPanel.innerWidth(),
                thisTargetPanelLeft = thisTargetPanel.offset().left,
                filterTarget = $('.catalog-filter');

            filterPanelLeft(thisTargetPanelLeft, thisTargetPanelWidth, filterTarget, thisTargetPanel);
        }
    });

    $(".filter-range-input-min, .filter-range-input-max").on('keypress', function (event) {
        event = event || window.event;
        if (event.charCode && event.charCode != 0 && event.charCode != 32 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57)) return false;
    });

    //------------------------------------------------------------------------//

    //filter item
    $('.filter-item-toggle').on('click', function (event) {
        event.preventDefault();
        $(this).parent('.filter-item').toggleClass('open');
    });

    $('.filter-item-more').on('click', function (event) {
        event.preventDefault();
        $(this).parent('.filter-item-block').toggleClass('show');
    });

    //------------------------------------------------------------------------//

    var catalogProductHover = false;
    $('.catalog-product').on('mouseenter', function (event) {
        if (!catalogProductHover) {
            $('.catalog-product-img-slider').slick({
                dots: true,
                arrows: false,
                draggable: false,
                infinite: false,
                centerMode: false,
                centerPadding: '0px',
                autoplay: false,
                autoplaySpeed: 5000,
                speed: 0,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                slide: '.slide-js',
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true
            });
            // $(document).on('mouseenter', '.catalog-product-img-slider .slick-dots li, .catalog-product-colors-list li', function (event) {
            //     event.preventDefault();
            //     var thisParent = $(this).parents('.catalog-product');
            //     var thisParentColors = $(this).parents('.catalog-product').find('.catalog-product-colors-list');
            //     thisParent.find('.catalog-product-img-slider').slick('slickGoTo', $(this).index());

            //     if (thisParentColors) {
            //         thisParentColors.find('li').eq($(this).index()).find('.catalog-product-color').addClass('hover');
            //         thisParentColors.find('li').eq($(this).index()).siblings('li').find('.catalog-product-color').removeClass('hover');
            //     }
            // });
        }
        catalogProductHover = true;
    });

    //------------------------------------------------------------------------//

    //catalog favorite
    $('.catalog-product-favorite').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //search results categories
    $('.search-results-categories-more-button').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.search-results-categories').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //catalog-product-info
    function catalogInit() {
        $('.catalog-product-info').each(function (index, el) {
            var thisElement = $(el),
                thisParentBg = thisElement.parents('.catalog-product').find('.catalog-product-bg');
            thisElement.css({
                'opacity': '0',
                'display': 'block'
            });
            var thisHeight = thisElement.innerHeight();
            thisParentBg.css({
                'bottom': -thisHeight
            });
            thisElement.attr({ 'style': '' });
        });
    }
    catalogInit();
    $(window).resize(function () {
        catalogInit();
    });

    //------------------------------------------------------------------------//

    //catalog filter toggle active
    $(document).on('click', '.catalog-filter-category-item, .catalog-filter-sorting-link', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //catalog filter item reset
    $(document).on('click', '.catalog-filter-sorting-item-reset', function (event) {
        event.preventDefault();
        $(this).parents('.catalog-filter-sorting-drop').removeClass('selected');
    });

    //------------------------------------------------------------------------//

    //popover
    if ($('.popover-target').length) {
        $('.popover-target').popover({
            trigger: 'hover',
            html: true
        });
    }

    //------------------------------------------------------------------------//

    //fancybox
    if ($('[data-fancybox]').length) {
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
    }

    //------------------------------------------------------------------------//

    //catalog menu dropdown
    $(document).on('click', '.catalog-menu-dropdown-toggle', function (event) {
        event.preventDefault();
        $(this).parents('li').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //catalog country
    $(document).on('click', '.catalog-country-item', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //catalog categories
    if ($('.catalog-categories').length) {
        $('.catalog-categories').slick({
            dots: false,
            arrows: true,
            draggable: true,
            infinite: false,
            centerMode: false,
            centerPadding: '0px',
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 500,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            slide: '.slide-js',
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 1326,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 2
                    }
                },
            ]
        });
    }

    //------------------------------------------------------------------------//

    //catalog categories item
    $(document).on('click', '.catalog-categories-item', function (event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //centerModal
    function centerModal() {
        var modalName = $('.modal-center');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        modalName.each(function () {
            var modalOuterWidth = $(this).outerWidth();
            var modalOuterHeight = $(this).outerHeight();
            $(this).css({
                margin: 0
            });
            if (windowHeight > modalOuterHeight) {
                $(this).css({
                    top: (windowHeight - modalOuterHeight) / 2
                });
            } else {
                $(this).css({
                    top: 0
                });
            }
            if (windowWidth > modalOuterWidth) {
                $(this).css({
                    left: (windowWidth - modalOuterWidth) / 2
                });
            } else {
                $(this).css({
                    left: 0
                });
            }
        });
    }
    $(document).on('click', '[data-toggle="modal"]', function (event) {
        centerModal();
    });
    $(window).resize(function () {
        centerModal();
    });

    //------------------------------------------------------------------------//

    //new product modal certificate
    function newProductModalCertificate_init() {

        var newProductModalCertificate,
            newProductModalCertificateLength = $('.new-product-modal-certificate').length;
        if (newProductModalCertificateLength) {
            newProductModalCertificate = new Swiper('.new-product-modal-certificate', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                watchOverflow: true,
                speed: 500,
                on: {
                    imagesReady: function () {
                        centerModal();
                    },
                },
            });
        }

    }

    $('#new-product-modal-certificate').on('shown', function () {
        $.ajax({
            url: '../new-product-modal-certificate.html',
            cache: false,
            success: function () {
                $('#new-product-modal-certificate').load('../new-product-modal-certificate.html', function (response, status, xhr) {
                    newProductModalCertificate_init();
                    centerModal();
                });
            }
        });
    });

    //------------------------------------------------------------------------//

});//document ready