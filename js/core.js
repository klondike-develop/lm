$(document).ready(function () {

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //jScrollPane
    var scrollPane = function () {
        var pane = $('.scroll-pane');
        pane.jScrollPane(
            {
                showArrows: false,
                autoReinitialise: true
            }
        );
    }
    var scrollPaneResize = function () {
        $('.scroll-pane').each(function (index, el) {
            $(this).jScrollPane({ showArrows: false, autoReinitialise: true }).data('jsp').destroy();
            $(this).jScrollPane({ showArrows: false, autoReinitialise: true }).data('jsp').reinitialise();
        });
    }

    //------------------------------------------------------------------------//

    //single
    var scrollPaneSingle = function (jqParent) {
        var pane = jqParent.find('.scroll-pane');
        pane.jScrollPane({
            showArrows: false,
            autoReinitialise: false
        });
    }

    //------------------------------------------------------------------------//

    //drop
    activePop = null;
    dropClass = $('.drop');

    $(document).on('click', '.contact-info-callback', function (event) {
        event.preventDefault();
        $('.header-phone').addClass('active');
        activePop = 1;
    });

    $(document).on('click', '.cabinet-order-manager-callback-link', function (event) {
        event.preventDefault();
        $('.header-phone').addClass('active');
        activePop = 1;
    });

    function closeInactivePop() {
        $('.drop').each(function (i) {
            if ($(this).hasClass('active') && i != activePop) {
                $(this).removeClass('active');
            }
        });
        return false;
    }
    $(document).on('mouseover', '.drop', function (event) {
        activePop = $('.drop').index(this);
    });
    $(document).on('mouseout', '.drop', function (event) {
        activePop = null;
    });
    $(document).on('click', function (event) {
        closeInactivePop();
    });
    $(document).on('click', '.drop-close', function (event) {
        activePop = null;
        closeInactivePop();
    });

    var sliderJsArrowsNavInit = false;
    $(document).on('click', '.drop-toggle', function (event) {
        event.preventDefault();
        var thisParent = $(this).parent('.drop');
        thisParent.toggleClass('active');
        //
        var thisParentPane = thisParent.find('.scroll-pane');
        if (thisParentPane.length && !thisParent.hasClass('scroll-pane-initialized')) {
            scrollPaneSingle(thisParent);
            thisParent.addClass('scroll-pane-initialized');
        }
        //
        if ($(thisParent).find('.slider-js-arrows-nav').length) {
            $('.slider-js-arrows-nav').on('init', function () {
                sliderJsArrowsNavInit = true;
            });
            if (sliderJsArrowsNavInit) {
                $('.slider-js-arrows-nav').slick('setPosition');
            } else {
                $('.slider-js-arrows-nav').slick({
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
                    swipeToSlide: true
                });
            }
        }
        //
        if ($(thisParent).find('.phone-mask').length) {
            $('.phone-mask').mask('+7 (999) 999-99-99');
        }
        //
        if ($(thisParent).find('.code-mask').length) {
            $('.code-mask').mask('9  9  9  9');
        }
    });

    //extra
    var activeExtraPop = null;
    dropExtraClass = $('.drop-extra-block');
    $(document).on('click', '.drop-extra-toggle', function (event) {
        event.preventDefault();
        activePop = null;
        closeInactivePop();
        $(this).parents('.drop').find('.drop-extra-block').show();
        activeExtraPop = 1;
    });
    $(document).on('click', '.drop-extra-close', function (event) {
        event.preventDefault();
        dropExtraClass.hide();
    });
    dropExtraClass.on('mouseover', function (event) {
        activeExtraPop = 1;
    });
    dropExtraClass.on('mouseout', function (event) {
        activeExtraPop = null;
    });
    $(document).on('click', function (event) {
        if ($(this).parents('.drop-extra-block:visible') && !activeExtraPop) {
            dropExtraClass.hide();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.keyCode == 27) {
            dropExtraClass.hide();
            $('.drop').each(function (index, el) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
            });
        }
    });

    $(document).on('click', '.city-select-js', function (event) {
        event.preventDefault();
        $('.header-city-select').show();
        activeExtraPop = 1;
    });

    //------------------------------------------------------------------------//

    //new product select
    $(document).on('click', '.new-product-select-link', function (event) {
        event.preventDefault();
        var thisElement = $(this),
            thisElementHtml = thisElement.html(),
            thisParent = thisElement.parents('.new-product-select-block');
        thisElement.addClass('active').siblings().removeClass('active');
        thisParent.find('.new-product-select-toggle').html(thisElementHtml);
        activePop = null;
        closeInactivePop();
    });

    //------------------------------------------------------------------------//

    //reviews sorting select
    $(document).on('click', '.reviews-sorting-select-item', function (event) {
        event.preventDefault();
        var thisElement = $(this),
            thisElementText = thisElement.text(),
            thisParent = thisElement.parents('.reviews-sorting-select');
        thisElement.addClass('active').siblings().removeClass('active');
        thisParent.find('.reviews-sorting-select-toggle').text(thisElementText);
        activePop = null;
        closeInactivePop();
    });

    //------------------------------------------------------------------------//

    //tab
    $('.tabs').delegate('li:not(.active)', 'click', function () {
        $(this).addClass('active').siblings().removeClass('active').parents('.tab').find('.box').hide().eq($(this).index()).fadeIn(250, function () {

            //update
            if (!state3DGallery && $(this).find('.new-product-three-d-block').length) {
                init3DGallery();
                state3DGallery = true;
            }

        });
    });

    //------------------------------------------------------------------------//

    //new product 3d
    var state3DGallery = false;
    var threeDRangeSlider = $('.new-product-three-d-range');
    var threeDRangeInit = false;
    var totalFrames = 51;
    var api;

    if ($('.new-product-three-d-block').length && $('.new-product-three-d').is(':visible') && !state3DGallery) {
        state3DGallery = true;
        init3DGallery();
    }

    function init3DGallery() {
        var frames = SpriteSpin.sourceArray('../upload/3d/{frame}.jpg', { frame: [1, totalFrames], digits: 1 });
        var dataSlider = $('.new-product-three-d-block');

        dataSlider.spritespin({
            source: frames,
            width: 320,
            height: 265,
            sense: 1,
            responsive: true,
            animate: false,
            frame: totalFrames / 2,
            plugins: [
                //'progress',
                '360',
                //'drag'
            ],
            onFrame: function (e, data) {
                // if (threeDRangeSlider.length) {
                //     threeDRangeSlider.nstSlider("set_position", 0, data.frame);
                // }
            },
            onLoad: function () {
                api = dataSlider.spritespin("api");

                if (threeDRangeSlider.length && !threeDRangeInit) {
                    threeDRangeInit = true;
                    threeDRangeSlider.nstSlider({
                        "crossable_handles": false,
                        "left_grip_selector": ".new-product-three-d-range-handle-min",
                        "right_grip_selector": ".new-product-three-d-range-handle-max",
                        "value_bar_selector": ".new-product-three-d-range-bar",
                        "value_changed_callback": function (cause, minValue, maxValue, prevMinValue, prevMaxValue) {
                            api.updateFrame(maxValue);
                            //if (cause == 'drag_move') {
                            $('.new-product-three-d-play').removeClass('active');
                            api.stopAnimation();
                            //}
                        }
                    });
                    threeDRangeSlider.nstSlider("set_range", 0, totalFrames - 1);
                    threeDRangeSlider.nstSlider("set_position", 0, parseInt((totalFrames - 1) / 2));

                    $(window).resize(function () {
                        threeDRangeSlider.nstSlider("refresh");
                    });
                }

            }
        });

        $(document).on('click', '.new-product-three-d-play', function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            api.toggleAnimation();
        });
    }

    //------------------------------------------------------------------------//

    //tab-filter
    $(document).on('click', '.tabs-filter a', function () {

        $(this).parents('li').addClass('active').siblings('li').removeClass('active');

        var thisFilter = $(this).prop('href');
        thisFilter = thisFilter.substring(thisFilter.indexOf('#') + 1);

        var thisParent = $(this).parents('.global-tab-filter');

        thisParent.find('[data-filter]').each(function (index, el) {
            var thisElement = $(this);
            var thisData = thisElement.data('filter');

            var thisDataArray = new Array();
            thisDataArray = thisData.split(", ");

            if (jQuery.inArray(thisFilter, thisDataArray) != '-1' || thisFilter == 'filterAll') {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });

    });

    //------------------------------------------------------------------------//

    //slider no navigation
    function sliderJsNoNav() {
        $('.slider-js-no-nav').slick({
            dots: false,
            arrows: false,
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
            swipeToSlide: true
        });
    }
    sliderJsNoNav();

    //------------------------------------------------------------------------//

    //slider full navigation
    function sliderJsFullNav() {
        $('.slider-js-full-nav').slick({
            dots: true,
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
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }
    sliderJsFullNav();

    //------------------------------------------------------------------------//

    //slider outside navigation
    function sliderJsOutsideNav() {
        var thisSlider = $('.slider-js-outside-nav');
        thisSlider.each(function (index, el) {
            $(el).slick({
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
                slidesToShow: 6,
                slidesToScroll: 1,
                swipeToSlide: true,
                prevArrow: $(el).parents('.recently-viewed').prev('.global-title').find('.outside-slider-prev'),
                nextArrow: $(el).parents('.recently-viewed').prev('.global-title').find('.outside-slider-next'),
                responsive: [
                    {
                        breakpoint: 1326,
                        settings: {
                            slidesToShow: 5
                        }
                    }
                ]
            });
        });
    }
    sliderJsOutsideNav();

    //------------------------------------------------------------------------//

    $(document).on('click', '.header-cart-product-delete', function (event) {
        event.preventDefault();
        $(this).parents('.header-cart-product').fadeOut(1, function () {
            scrollPaneResize();
        });
    });

    //------------------------------------------------------------------------//

    $(document).on('click', '.header-favorite-product-delete', function (event) {
        event.preventDefault();
        var deleteIndex = $(this).parents('.slick-slide').index();
        $('.slider-js-arrows-nav').slick('slickRemove', deleteIndex);
    });

    //------------------------------------------------------------------------//

    //search toggle
    $(document).on('click', '.nav-search-toggle', function (event) {
        event.preventDefault();
        $(this).parent('.nav-search').addClass('nav-search-focus');
        $('.nav-search-input-text').focus();
    });
    $(document).on('focusin', '.nav-search-input-text', function (event) {
        $('.nav-search').addClass('nav-search-focus');
    });
    $(document).on('focusout', '.nav-search-input-text', function (event) {
        if (!$('.nav-search-open').length) {
            $('.nav-search').removeClass('nav-search-focus');
            $('.nav-search-panel').slideUp('100');
        }
    });
    $(document).on('keyup', '.nav-search-input-text', function (event) {
        if ($(this).val() != '' && event.keyCode != 27) {
            $('.nav-search').addClass('nav-search-open').addClass('nav-search-focus');
            $('.nav-search-panel').slideDown('200');
        } else {
            $('.nav-search').removeClass('nav-search-open');
            $('.nav-search-panel').slideUp('100');
        }

        if (event.keyCode == 27) {
            $('.nav-search').removeClass('nav-search-open');
            $('.nav-search-panel').slideUp('100');
            $('.nav-search').removeClass('nav-search-focus');
        }
    });
    $(document).on('click', '.nav-search-panel', function (event) {
        event.stopPropagation();
        $('.nav-search-input-text').focus();
        $('.nav-search').addClass('nav-search-focus');
    });
    $(document).on('click', '.nav-search-delete', function (event) {
        event.preventDefault();
        $('.nav-search').removeClass('nav-search-open');
        $('.nav-search-panel').slideUp('100');
        $('.nav-search-input-text').val('').focus();
    });

    //------------------------------------------------------------------------//

    //menu tab
    $(document).on('click', '.header-menu li:not(".active") a', function (event) {
        event.preventDefault();
        $(this).parents('li').addClass('active').siblings('li').removeClass('active');
        var hash = $(this).prop('href').split('#')[1];
        $('#' + hash).addClass('visible').siblings('.menu-wrapper').removeClass('visible');
    });

    //------------------------------------------------------------------------//

    //menu hover
    var timer;
    $('.menu > li').hover(function () {
        thisLi = $(this);
        timer = setTimeout(function () { openSubmenu(thisLi); }, 150);
    }, function () {
        clearTimeout(timer);
        closeSubmenu($(this));
    });
    function openSubmenu(value) {
        $(value).addClass('hover');
    }
    function closeSubmenu(value) {
        $(value).removeClass('hover');
    }

    //------------------------------------------------------------------------//

    //subscribe
    $(document).on('click', '.subscribe-button .button', function (event) {
        event.preventDefault();
        $(this).parents('.subscribe').addClass('subscribe-success');
    });

    //------------------------------------------------------------------------//

    //info panel
    $(document).on('click', '.info-panel-close', function (event) {
        event.preventDefault();
        $(this).parents('.info-panel').hide();
    });

    //------------------------------------------------------------------------//

    function reInitCore() {

        //destroy all sliders
        $('.slider-js-outside-nav, .slider-js-full-nav, .slider-js-no-nav').each(function (index, el) {
            $(this).slick('unslick');
        });

        sliderJsNoNav();
        sliderJsFullNav();
        sliderJsOutsideNav();
    }
    //reInitCore();

    //------------------------------------------------------------------------//

    //form phone mask
    if ($('.form-phone-mask').length) {
        $('.form-phone-mask').mask('+7 (999) 999-99-99');
    }

    //------------------------------------------------------------------------//

});//document ready