$(document).ready(function(){

    //fancybox
    function fancybox_init() {
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
    fancybox_init();

    //------------------------------------------------------------------------//

    function gallery_init() {

        //product gallery
        $('.product-gallery-thumbs-slider').slick({
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
            slidesToShow: 6,
            slidesToScroll: 1,
            swipeToSlide: true,
            vertical: true,
            verticalSwiping: true,
            focusOnSelect: true,
            asNavFor: '.product-gallery-slider',
            lazyLoad: 'progressive',
            responsive: [
                {
                    breakpoint: 1326,
                    settings: {
                        slidesToShow: 5
                    }
                }
            ]
        });

        $('.product-gallery-thumbs-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){

            var thisSlider = $('.product-gallery-thumbs-slider');
                slidesCount = thisSlider.find('.slick-slide').length,
                thisSliderTrack = thisSlider.find('.slick-track');
                heightTotal = thisSliderTrack.innerHeight(),
                visibleHeight = thisSlider.find('.slick-list').innerHeight(),
                slideHeight = heightTotal / slidesCount,
                invisibleSlides = ( heightTotal - visibleHeight ) / slideHeight;

            if ( nextSlide != 0 && nextSlide < ( slidesCount - invisibleSlides - 1 ) ) {
                thisSliderTrack.css({
                    'top': slideHeight+'px'
                });
            } else {
                thisSliderTrack.css({
                    'top': '0'
                });
            }

        });

        $('.product-gallery-slider').on('init', function(event, slick){
            var thisFirst = $(this).find('.slide-js').eq(0);
            var has3D = thisFirst.find('.threesixty');
            var hasVideo = thisFirst.find('.youtube-video');
            var hasSet = thisFirst.find('.set-gallery');
            if ( has3D.length || hasVideo.length || hasSet.length ) {
                $('.product-gallery-slider').addClass('product-gallery-no-arrows');
            }
        });

        $('.product-gallery-slider').slick({
            dots: false,
            arrows: true,
            swipe: false,
            swipeToSlide: false,
            draggable: false,
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
            slidesToScroll: 1,
            asNavFor: '.product-gallery-thumbs-slider',
            fade: true,
            adaptiveHeight: true,
            lazyLoad: 'progressive'
        });

        $('.product-gallery-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var hasVideo = $('.product-gallery-slider').find('.slide-js').eq(currentSlide).find('.youtube-video');
            if (hasVideo.length) {
                hasVideo[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
        });

        var active3D = 0;
        $('.product-gallery-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            var has3D = $('.product-gallery-slider').find('.slide-js').eq(currentSlide).find('.threesixty');
            var hasVideo = $('.product-gallery-slider').find('.slide-js').eq(currentSlide).find('.youtube-video');
            var hasSet = $('.product-gallery-slider').find('.slide-js').eq(currentSlide).find('.set-gallery');
            if (has3D.length && !active3D) {
                //threesixty
                $('.product-gallery-slider .threesixty').threeSixty({
                    dragDirection: 'horizontal',
                    useKeys: true,
                    draggable: true
                });
                active3D = 1;
            }
            if ( has3D.length || hasVideo.length || hasSet.length ) {
                $('.product-gallery-slider').addClass('product-gallery-no-arrows');
            } else {
                $('.product-gallery-slider').removeClass('product-gallery-no-arrows');
            }
        });

        var lastSlideChange = 0;
        // $(document).on('mousewheel DOMMouseScroll', '.product-gallery-thumbs-slider', function(event) {
        //     event.preventDefault();
        //     var timeNow = new Date().getTime();
        //     if (!(timeNow - lastSlideChange < 500)) {
        //         lastSlideChange = timeNow;
        //         if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        //             $('.product-gallery-slider').slick('slickPrev');
        //         } else {
        //             $('.product-gallery-slider').slick('slickNext');
        //         }
        //     }
        // });

    }
    gallery_init();

    //------------------------------------------------------------------------//

    function modalGallery_init() {

        // var galleryThumbsNum = $('.product-gallery-thumbs-slider .slide-js').length;
        // var galleryDraggHeight = 100/galleryThumbsNum;
        //console.log(galleryThumbsNum);
        // $('<div class="product-gallery-scroll-panel"><div class="product-gallery-scroll-dragg" style="height: '+galleryDraggHeight+'%;"></div></div>').appendTo('.modal-gallery-thumbs');

        // var pressed, pressX, pressY,
        //     dragged, draggedDir,
        //     offset = 3;

        // $(document)
        // .on('mousedown', '.product-gallery-scroll-dragg', function(e) {
        //     pressX = e.pageX;
        //     pressY = e.pageY;
        //     pressed = true;
        // })
        // .on('mousemove', '.product-gallery-scroll-dragg', function(e) {
        //     if (!pressed) return;
        //     dragged = Math.abs(e.pageY - pressY) > offset;
        //     if (dragged) {
        //         draggedDir = e.pageY - pressY;
        //         $('.product-gallery-scroll-dragg').css({
        //             'transform': 'translateY(' + draggedDir + 'px)'
        //         });
        //     }
        // })
        // .on('mouseup', function() {
        //     if (dragged) {
        //         if (draggedDir < 0) {
        //             $('.modal-gallery-thumbs-slider').slick('slickPrev');
        //         } else {
        //             $('.modal-gallery-thumbs-slider').slick('slickNext');
        //         }
        //     }
        //     pressed = dragged = false;
        //     $('.product-gallery-scroll-dragg').css({
        //         'transform': 'translateY(0px)'
        //     });
        // });

        //modal gallery
        // $('.modal-gallery-thumbs-slider').slick({
        //     dots: false,
        //     arrows: false,
        //     draggable: true,
        //     infinite: false,
        //     centerMode: false,
        //     centerPadding: '0px',
        //     autoplay: false,
        //     autoplaySpeed: 5000,
        //     speed: 500,
        //     pauseOnHover: false,
        //     pauseOnDotsHover: false,
        //     slide: '.slide-js',
        //     slidesToShow: 6,
        //     slidesToScroll: 1,
        //     swipeToSlide: true,
        //     vertical: true,
        //     verticalSwiping: true,
        //     focusOnSelect: true,
        //     asNavFor: '.modal-gallery-slider',
        //     lazyLoad: 'progressive'
        // });

        // $('.modal-gallery-thumbs-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        //     $('.product-gallery-scroll-dragg').css({'top': galleryDraggHeight*nextSlide+'%'});
        // });

        // var lastSlideChange = 0;
        // $(document).on('mousewheel DOMMouseScroll', '.modal-gallery-thumbs-slider', function(event) {
        //     event.preventDefault();
        //     var timeNow = new Date().getTime();
        //     if (!(timeNow - lastSlideChange < 500)) {
        //         lastSlideChange = timeNow;
        //         if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
        //             $('.modal-gallery-thumbs-slider').slick('slickPrev');
        //         } else {
        //             $('.modal-gallery-thumbs-slider').slick('slickNext');
        //         }
        //     }
        // });

        $('.modal-gallery-slider').on('init', function(event, slick){
            var thisFirst = $(this).find('.slide-js').eq(0);
            var has3D = thisFirst.find('.threesixty');
            var hasVideo = thisFirst.find('.youtube-video');
            if ( has3D.length || hasVideo.length ) {
                $('.modal-gallery-slider').addClass('modal-gallery-no-arrows');
            }
        });

        $('.modal-gallery-slider').slick({
            dots: false,
            arrows: true,
            swipe: false,
            swipeToSlide: false,
            draggable: false,
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
            slidesToScroll: 1,
            // asNavFor: '.modal-gallery-thumbs-slider',
            fade: true,
            adaptiveHeight: true,
            lazyLoad: 'progressive'
        });

        function fixHeightSlider() {
            // var modalSliderHeight = $('.modal-gallery-slider').innerHeight(),
            //     modalSliderDoc = $('body').innerHeight() - 80;
            // if (modalSliderHeight > modalSliderDoc) {
            //     var newWidth = modalSliderDoc/modalSliderHeight,
            //         currentWidth = $('.modal-gallery-slider').innerWidth();
            //     currentWidth = currentWidth * newWidth;
            //     $('.modal-gallery-slider').css({'max-width': currentWidth+'px'});
            //     $('.modal-gallery-slider').slick('setPosition');
            // }
        }

        $(window).resize(function() {
            fixHeightSlider();
            $('.modal-gallery-slider').slick('setPosition');
        });


        $(document).on('click', '.product-photo', function(event) {
            var goToSlide = $(this).parents('.slide-js').index();
            $('.product-gallery-slider').slick( 'slickGoTo', goToSlide );
            $('#modal-gallery').modal('show');
        });

        $('#modal-gallery').on('shown', function () {
            $('.modal-gallery-slider').slick('setPosition');
            centerModal();
            var currentSlide = $('.product-gallery-slider').slick('slickCurrentSlide');
            $('.modal-gallery-slider').slick( 'slickGoTo', parseInt(currentSlide) );

            $('.modal-gallery-thumb').eq(currentSlide).addClass('active').siblings('a').removeClass('active');

            fixHeightSlider();
        });
        $('#modal-gallery').on('hidden', function () {
            var currentSlide = $('.modal-gallery-slider').slick('slickCurrentSlide');
            $('.product-gallery-slider').slick( 'slickGoTo', parseInt(currentSlide) );
        });

        $('.modal-gallery-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var hasVideo = $('.modal-gallery-slider').find('.slide-js').eq(currentSlide).find('.youtube-video');
            if (hasVideo.length) {
                hasVideo[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
            }
            $('.modal-gallery-thumb').eq(nextSlide).addClass('active').siblings('a').removeClass('active');
        });

        var active3Dmodal = 0;
        $('.modal-gallery-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            var has3D = $('.modal-gallery-slider').find('.slide-js').eq(currentSlide).find('.threesixty');
            var hasVideo = $('.modal-gallery-slider').find('.slide-js').eq(currentSlide).find('.youtube-video');
            if (has3D.length && !active3Dmodal) {
                //threesixty
                $('.modal-gallery-slider .threesixty').threeSixty({
                    dragDirection: 'horizontal',
                    useKeys: true,
                    draggable: true
                });
                active3Dmodal = 1;
            }
            if ( has3D.length || hasVideo.length ) {
                $('.modal-gallery-slider').addClass('modal-gallery-no-arrows');
            } else {
                $('.modal-gallery-slider').removeClass('modal-gallery-no-arrows');
            }

            $('.modal-gallery-thumb').eq(currentSlide).addClass('active').siblings('a').removeClass('active');

        });

    }

    modalGallery_init();

    $(document).on('click', '.modal-gallery-thumb', function(event) {
        event.preventDefault();
        var thisIndex = $(this).index();
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.modal-gallery-slider').slick('slickGoTo', parseInt(thisIndex));
    });

    $('.modal-gallery-full').on('hidden', function () {
        $('.modal-gallery-img').each(function(index, el) {
            if ( $(this).find('.zoomit-container').length ) {
                var imgTemplate = $(this).find('.zoomit-target');
                $(this).removeClass('can-disable-zoom');
                $(this).html(imgTemplate);
            }
        });
    });

    $(document).on('click', '.modal-gallery-img:not(".can-disable-zoom")', function(event) {
        event.preventDefault();
        $(this).removeClass('disable-zoom');
        $(this).addClass('can-disable-zoom');
        var thisZoomTarget = $(this).find('.zoomit-target'),
            thisZoomLength = $(this).find('.zoomit-container');

        if ( thisZoomTarget.length && !thisZoomLength.length ) {
            thisZoomTarget.zoomIt();
        }

    });
    $(document).on('click', '.can-disable-zoom', function(event) {
        event.preventDefault();
        $(this).addClass('disable-zoom');
        $(this).removeClass('can-disable-zoom');
    });



    //------------------------------------------------------------------------//

    //product favorite (ajax ready)
    $(document).on('click', '.product-favorite', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //product number (ajax ready)
    $(document).on('keypress', '.product-number-text', function(event) {
        event = event || window.event;
        if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) ) return false;
    });

    //(ajax ready)
    $(document).on('click', '.product-number-minus', function(event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.product-number').find('.product-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if ( quantityValue < 0 ) { quantityValue = 0; }
        quantityInput.val(quantityValue);
    });

    //(ajax ready)
    $(document).on('click', '.product-number-plus', function(event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.product-number').find('.product-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
    });

    //------------------------------------------------------------------------//

    //product color (ajax ready)
    $(document).on('click', '.product-color-item', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.product-color-list').each(function(index, el) {
        if ( $(this).find('.product-color-item').length < 4 ) {
            $(this).parents('.product-color').addClass('product-color-few');
        }
    });

    //------------------------------------------------------------------------//

    //product sizes (ajax ready)
    $(document).on('click', '.product-sizes-more', function(event) {
        event.preventDefault();
        $(this).parent('.product-sizes-wrapper').addClass('show');
    });

    $(document).on('click', '.product-size', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    //------------------------------------------------------------------------//

    //product parameters (ajax ready)
    $(document).on('click', '.product-parameters-more', function(event) {
        event.preventDefault();
        $(this).parent('.product-parameters').toggleClass('show');
    });

    //------------------------------------------------------------------------//

    //product photos
    function productPhotos_init() {
        $('.product-photos-slider').slick({
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
    productPhotos_init();

    //------------------------------------------------------------------------//

    //scroll pane products
    var scrollPane = function() {
        var pane = $('.scroll-pane-products');
        pane.jScrollPane(
            {
                showArrows: false,
                autoReinitialise: true
            }
        );
    }
    scrollPane();

    var scrollPaneResize = function() {
        $('.scroll-pane-products').each(function(index, el) {
            $(this).jScrollPane({showArrows: false, autoReinitialise: true}).data('jsp').destroy();
        });
        $('.scroll-pane-products').each(function(index, el) {
            $(this).jScrollPane({showArrows: false, autoReinitialise: true}).data('jsp').reinitialise();
        });
    }
    $(window).resize(function(){
        scrollPaneResize();
    });

    var lastAnimation = 0;
    $(document).on('mousewheel DOMMouseScroll', '.scroll-pane-products', function(event) {
        var timeNow = new Date().getTime();
        var pane = $(this);
        pane.jScrollPane({showArrows: false,autoReinitialise: true});
        var api = pane.data('jsp');
        if (!(timeNow - lastAnimation < 20)) {
            lastAnimation = timeNow;
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                var currentPosition = api.getContentPositionX();
                api.scrollToX(currentPosition-30);
            } else {
                var currentPosition = api.getContentPositionX();
                api.scrollToX(currentPosition+30);
            }
        }
    });

    //------------------------------------------------------------------------//

    //counter
    $('.countdown').downCount({
        date: '09/09/2019 12:00:00',
        offset: +10
    }, function () {
        //callback
    });

    //------------------------------------------------------------------------//

    //(ajax ready)
    $(document).on('click', '.product-comments-more-button', function(event) {
        event.preventDefault();
        var buttonNum = parseInt($('.product-comments-more-num').text());
        $(this).find('.product-comments-more-num').text(--buttonNum);
        //change to AJAX
        var template = $('.product-comment').eq(1).clone();
        $('.product-comments-list .col-11').append(template);
    });

    //------------------------------------------------------------------------//

    //(ajax ready)
    var productCheckboxIndex = 1;
    $(document).on('click', '.product-set-all-button', function(event) {
        event.preventDefault();
        var buttonNum = parseInt($('.product-set-all-button-num').text());
        $(this).find('.product-set-all-button-num').text(--buttonNum);
        //change to AJAX
        var template = '<div class="product-set-item"><div class="row"><div class="col-16"><div class="product-set-item-wrapper"><div class="product-set-item-products"><div class="product-set-item-products-content scroll-pane-products"><div class="product-set-item-products-wrapper"><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set1.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product1'+productCheckboxIndex+'" name="set-item" checked><label for="set-item-product1'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Стол раскладной <br>Ford Dark Oak</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">8 540 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set2.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product2'+productCheckboxIndex+'" name="set-item"><label for="set-item-product2'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Кашпо Lechuza 16020 <br>LS 21 Белый</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">2 650 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set3.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product3'+productCheckboxIndex+'" name="set-item" checked><label for="set-item-product3'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Стол раскладной <br>Ford Dark Oak</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="2"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">3 350 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set4.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product4'+productCheckboxIndex+'" name="set-item" checked><label for="set-item-product4'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Подвесной светильник Cucina&nbsp;A3320SP-1WH</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">1 050 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set5.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product5'+productCheckboxIndex+'" name="set-item"><label for="set-item-product5'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Настенное зеркало Utility&nbsp;овальное</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">21 050 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set3.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product6'+productCheckboxIndex+'" name="set-item" checked><label for="set-item-product6'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Стол раскладной <br>Ford Dark Oak</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="product-set-item-product-price-new">8 540 ₽</div><div class="product-set-item-product-price-old">10 540 ₽</div></div></div></div><div class="product-set-item-product"><div class="product-set-item-product-img-wrapper"><a href="#" class="product-set-item-product-img"><img src="upload/images/product_set2.jpg" width="227" height="227" alt=""></a><div class="product-set-item-product-plus"></div><div class="product-set-item-product-checkbox"><div class="checkbox"><input type="checkbox" id="set-item-product7'+productCheckboxIndex+'" name="set-item"><label for="set-item-product7'+productCheckboxIndex+'"></label></div></div></div><div class="product-set-item-product-content"><div class="product-set-item-product-title"><a href="#">Кашпо Lechuza 16020 <br>LS 21 Белый</a></div><div class="product-number clearfix"><a href="#" class="product-number-minus"></a><input type="text" class="input-text product-number-text" value="1"><a href="#" class="product-number-plus"></a></div><div class="product-set-item-product-price"><div class="nowrap">2 650 ₽</div></div></div></div></div></div></div><div class="product-set-item-total"><div class="product-set-item-total-wrapper"><div class="product-set-item-total-content"><div class="product-set-item-total-title">Цена за комплект</div><div class="product-set-item-total-price"><div class="product-set-item-total-price-old">21 285 ₽</div><div class="product-set-item-total-price-new">16 280 ₽</div></div><div class="product-set-item-total-saving">Вы сэкономите: <strong>5000 ₽</strong></div></div><div class="product-set-item-total-equal"></div></div></div></div></div></div></div>';
        $('.product-set-items').append(template);
        scrollPaneResize();
        productCheckboxIndex++;
    });

    //------------------------------------------------------------------------//

    //centerModal (ajax ready)
    function centerModal() {
        var modalName = $('.modal-center');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        modalName.each(function() {
            var modalOuterWidth = $(this).outerWidth();
            var modalOuterHeight = $(this).outerHeight();
            $(this).css({
                margin: 0
            });
            if (windowHeight > modalOuterHeight) {
                $(this).css({
                    top: (windowHeight - modalOuterHeight) /2
                });
            } else {
               $(this).css({
                    top: 0
                });
            }
            if (windowWidth > modalOuterWidth) {
                $(this).css({
                    left: (windowWidth - modalOuterWidth) /2
                });
            } else {
               $(this).css({
                    left: 0
                });
            }
        });
    }
    $(document).on('click', '[data-toggle="modal"], .set-position-modal', function(event) {
        centerModal();
    });
    $(window).resize(function(){
        centerModal();
    });
    centerModal();

    //modal hide
    $('.modal').on('shown', function () {
        var thisModal = $(this);
        thisModal.find('.modal-content').hover(function() {
            thisModal.removeClass('modal-can-close');
        }, function() {
            thisModal.addClass('modal-can-close');
        });
    });
    $('.modal').on('hidden', function () {
        $('.modal').removeClass('modal-can-close');
    });
    $(document).on('click', '.modal-can-close', function(event) {
        $('.modal.in').modal('hide');
    });

    //------------------------------------------------------------------------//

    //product material (ajax ready)
    $(document).on('click', '.product-material-more-button', function(event) {
        event.preventDefault();
        $(this).parents('.product-material-content').addClass('open');
    });

    //------------------------------------------------------------------------//

    //scroll to (ajax ready)
    $(document).on('click', '.scroll-link', function(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 400);
                return false;
            }
        }
    });

    //------------------------------------------------------------------------//

    //more (ajax ready)
    $(document).on('click', '.product-thumbs-more .button', function(){
        var thisParent = $(this).parents('.global-tab.tab');
        var thisParentRow = thisParent.find('.product-thumbs .row');
        var contentCopy = '<div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div><div class="col"><div class="product-thumb"><a href="#" class="product-thumb-link"><span class="product-thumb-img"><img src="upload/images/product_thumb2.jpg" width="227" height="227" alt=""></span><span class="product-thumb-caption"><span class="product-thumb-title">Стол-книжка СП-09 <br>дуб венге</span><span class="product-thumb-price">12 540 ₽</span></span></a></div></div>';
        $(contentCopy).appendTo(thisParentRow);
    });

    //------------------------------------------------------------------------//


    $(document).on('mouseenter', '.product-color.active .product-color-list', function(event) {
        var x=window.scrollX;
        var y=window.scrollY;
        window.onscroll=function(){window.scrollTo(x, y);};
    });

    $(document).on('mouseleave', '.product-color.active .product-color-list', function(event) {
        window.onscroll=function(){};
    });

    $(document).on('click', '.product-color-close', function(event) {
        event.preventDefault();
        window.onscroll=function(){};
    });


    //product color scroll
    $(document).on('mousewheel DOMMouseScroll', '.product-color.active .product-color-list', function(event) {

        var timeNow = new Date().getTime();
        var thisPosition = $(this).scrollLeft();

        if (!(timeNow - lastAnimation < 20)) {
            lastAnimation = timeNow;
            if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
                $(this).scrollLeft(thisPosition -= 20);
            } else {
                $(this).scrollLeft(thisPosition += 20);
            }
        }

    });

    //------------------------------------------------------------------------//

    //modal thumbs scroll
    var scrollPaneModal = function() {
        var pane = $('.modal-gallery-thumbs-scroll');
        pane.jScrollPane(
            {
                showArrows: false,
                autoReinitialise: true
            }
        );
    }
    scrollPaneModal();

    var scrollPaneResizeModal = function() {
        $('.modal-gallery-thumbs-scroll').each(function(index, el) {
            $(this).jScrollPane({showArrows: false, autoReinitialise: true}).data('jsp').destroy();
        });
        $('.modal-gallery-thumbs-scroll').each(function(index, el) {
            $(this).jScrollPane({showArrows: false, autoReinitialise: true}).data('jsp').reinitialise();
        });
    }
    $(window).resize(function(){
        scrollPaneResizeModal();
    });

    $('.modal').on('shown', function () {
        scrollPaneResizeModal();
    });

    //------------------------------------------------------------------------//

    function reInitProduct() {

        //destroy all sliders
        $('.product-photos-slider, .product-gallery .slick-slider, .modal-gallery .slick-slider').each(function(index, el) {
            $(this).slick('unslick');
        });

        //fancybox init
        fancybox_init();

        //gallery init
        gallery_init();

        //modal gallery init
        modalGallery_init();

        //photos init
        productPhotos_init();

        //scrollPane destroy & reinit
        scrollPaneResize();
        scrollPaneResizeModal();

        //console
        console.log('plugins reloaded');
    }
    //reInitProduct();

    $('#modal-quick-view').on('shown', function () {
        $.ajax({
            url: '../quick-view.html',
            cache: false,
            success: function() {
                $('#modal-quick-view').load( '../quick-view.html', function( response, status, xhr ) {

                    //init gallery
                    modalGallery_init();
                    scrollPaneResizeModal();
                    centerModal();

                    //set slider
                    $(response).find('.modal-product-slider-wrapper img').eq(0).on('load',function(){
                        $('.modal-gallery-slider').slick('setPosition');
                        var modalCurrentSlide =  $('.product-gallery-slider').slick('slickCurrentSlide');
                        if ( modalCurrentSlide ) {
                            $('.modal-gallery-slider').slick('slickGoTo', modalCurrentSlide);
                        }
                    });

                });
            }
        });
    });

    //------------------------------------------------------------------------//

});//document ready

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.fn.zoomIt = function (options) {
        // Default parameters
        var defaults = {
            enabled: 1,
            status: 0,
            loaded: 0,
            img: $(this),
            offset: [0,0],
            class: {
                container: 'zoomit-container',
                loaded: 'loaded',
                img: 'zoomit-zoomed',
                ghost: 'zoomit-ghost'
            },
            // Get image src
            src: function () {
                return this.img.data('zoomed')
            },
            // Get zoom image src
            getSrc: function () {
                return typeof this.src == 'function' ? this.src() : this.src;
            },
            // Image HTML
            imgTag: null
        };

        // Merge options
        options = $.extend(defaults, options);

        // Execute Callback
        options.execute = function (e) {
            if (typeof e === 'string' && typeof options[e] === 'function') {
                options[e]( options );
            }
        };

        // Get container
        options.getContainer = function () {
            return $('<div class="' + options.class.container + '"></div>');
        };

        // Get zoom image src
        options.getImgSrc = function () {
            if ( options.imgTag === null ) {
                options.imgTag = $('<img />').addClass( options.class.img ).attr('src', this.getSrc());

                // Alt Tag
                if ( typeof options.img.attr('alt') !== 'undefined' ) {
                    options.imgTag.attr( 'alt', options.img.attr('alt') );
                }
            }

            return options.imgTag;
        };

        // Get zoomed image instance
        options.getZoomInstance = function () {
            return options.img.parent().find('.' + options.class.img);
        };

        // Restrict a numerical value between 0 and 1
        options.restrict = function (val) {
            if (val > 1) {
                val = 1;
            } else if (val < 0) {
                val = 0;
            }

            return val;
        };

        // Get image dimensions
        options.getDimensions = function () {
            // Set position
            options.position = {
                img: {
                    width: options.img.width(),
                    height: options.img.height(),
                    offset: options.img.offset()
                },
                zoom: {
                    width: options.getZoomInstance().innerWidth(),
                    height: options.getZoomInstance().innerHeight()
                }
            };
        };

        // Position zoomed image element
        options.setPosition = function (event) {
            // iOS Original Event (Pointer Position)
            if (typeof event.originalEvent !== 'undefined') {
                event = event.originalEvent;
            }

            // Get image dimensions
            if (options.loaded === 0) {
                options.getDimensions();
            }

            // Add loaded class
            options.img.parent().addClass( options.class.loaded );
            options.loaded = 1;

            // Percentages
            options.position.x = options.restrict( (event.pageX - options.position.img.offset.left) / options.position.img.width );
            options.position.y = options.restrict( (event.pageY - options.position.img.offset.top) / options.position.img.height );

            //offset fix
            var offsetFixSizeLeft = $('.slick-active').find('.modal-gallery-img').offset().left;
            var offsetSidebar = $('.modal-gallery-thumbs').innerWidth() / 2;
            var offsetFixSizeTop = $('.slick-active').find('.modal-gallery-img').offset().top;

            // Offsets
            options.position.zoom.offset = {
                left: (options.position.zoom.width - options.position.img.width - offsetFixSizeLeft + offsetSidebar) * options.position.x,
                top: (options.position.zoom.height - options.position.img.height - 0) * options.position.y
            };

            // console.log(options.position.zoom.offset.left);
            // console.log(options.position.zoom.offset.top);

            var leftTranslate = 0;
            if ( options.position.zoom.offset.left > 0 ) {
                leftTranslate = options.position.zoom.offset.left;
            }

            var topTranslate = 0;
            if ( options.position.zoom.offset.top > 0 ) {
                topTranslate = options.position.zoom.offset.top;
            }

            options.getZoomInstance().css({
                'transform': 'translate(-' + leftTranslate + 'px, -' + topTranslate + 'px)'
            });
        };

        // Show zoom
        options.show = function (event) {
            // Return early if image is loading
            if ( !options.enabled || options.status === 1 && options.loaded === 0 ) {
                return;
            }

            // Set zoom status
            options.status = 1;

            // Append image
            if ( options.img.parent().find('.' + options.class.img).length == 0 ) {
                options.img.after( options.getImgSrc() );

                // Image loaded callback
                options.getZoomInstance().on('load', function() {
                    options.setPosition(event);
                }).each(function() {
                    if( this.complete ) options.setPosition(event);
                });
            } else {
                options.setPosition(event);
            }

            // onZoomIn
            options.execute('onZoomIn');
        };

        // Hide zoom
        options.hide = function () {
            options.status = 0;
            options.loaded = 0;
            options.imgTag = null;
            options.img.parent().removeClass( options.class.loaded );
            options.getZoomInstance().remove();

            // onZoomOut
            options.execute('onZoomOut');
        };

        // Move zoom
        options.move = function (event) {
            if (options.status) {
                options.show(event);
            }
        };

        // Enable
        options.enable = function () {
            options.enabled = 1;
        }

        // Disable
        options.disable = function () {
            options.enabled = 0;
        }

        // Initialize
        options.init = function () {
            options.img
                .wrap( options.getContainer() )
                .after('<div class="' + options.class.ghost + '"></div>');

            // Ghost
            options.ghost = options.img.parent().find('.' + options.class.ghost);

            // Mouse events
            options.ghost.on('mouseenter touchstart', function (event) {
                options.show(event);
            }).on('mouseleave touchend', function () {
                //options.hide();
            }).on('mousemove touchmove', function (event) {
                event.stopPropagation();
                event.preventDefault();
                options.move(event);
            }).on('click', function () {
                options.execute('onClick');
            });

            // onInit
            options.execute('onInit');
        };

        // Bind zoom data
        options.img.data('zoom', options);
        options.init();

        $(window).resize(function() {
            options.hide();
        });

    };
}));