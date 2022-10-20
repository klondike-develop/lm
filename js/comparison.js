$(document).ready(function () {

    //SCROLLING

    function scrolling() {
        $wW = $(window).width();
        $wH = $(window).height();

        $top1 = $('body').scrollTop();
        $top2 = $('html').scrollTop();

        if ($top1) {
            $top = $top1;
        } else {
            $top = $top2;
        }

        $fixedSliderInit = $('.box:visible .fixed-slider-init');
        $fixedSliderInitTop = $fixedSliderInit.offset().top;
        $fixedSliderPlaceholder = $('.box:visible .fixed-slider-placeholder');
        $fixedSliderPlaceholderH = $fixedSliderPlaceholder.height();

        //console.log($top, $fixedSliderInitTop);

        if ($top > $fixedSliderInitTop + $fixedSliderPlaceholderH) {
            $('.box:visible .fixed-slider').addClass('scrolled');
            $('.box:visible .fixed-slider').css('top', $top - $fixedSliderInitTop);
        } else {
            $('.box:visible .fixed-slider').removeClass('scrolled');
            $('.box:visible .fixed-slider').css('top', 0);
        }
    }

    //scrolling();
    $(window).on("scroll", scrolling);

    function findDifferent() {
        $(".box[style*=block] .options-list").each(function () {
            $this = $(this);

            //Find different
            $this.find('.col-3 .comparison-option').each(function () {
                $index = $(this).data('option');

                $text = '';
                $different = false;
                $(this).closest('.options-list').find('.col-13 .comparison-option[data-option=' + $index + ']').each(function () {
                    if ($text == '') {
                        $text = $(this).text();
                    } else if ($text != $(this).text()) {
                        $different = true;
                        return false;
                    }
                });

                if (!$different) {
                    $(this).closest('.options-list').find('.comparison-option[data-option=' + $index + ']').addClass('non-different');
                } else {
                    $(this).closest('.options-list').find('.comparison-option[data-option=' + $index + ']').removeClass('non-different');
                }
            });

            if ($(this).find('.comparison-option').length == $(this).find('.comparison-option.non-different').length) {
                $(this).prev('.row').addClass('non-different');
            } else {
                $(this).prev('.row').removeClass('non-different');
            }
        });
    }

    function sliderJsComparison() {

        $(".box[style*=block] .options-list").each(function () {
            $this = $(this);

            //Set height
            $options = [];

            $this.find(".comparison-option").css('height', 'auto');

            $this.find(".comparison-option").each(function () {
                $optIndex = $(this).data('option');

                if ($options[$optIndex]) {
                    if ($(this).height() > $options[$optIndex]) {
                        $options[$optIndex] = $(this).height();
                    }
                } else {
                    $options[$optIndex] = $(this).height();
                }
            });

            $.each($options, function (key, value) {
                if (value) {
                    $this.find('[data-option=' + key + ']').height(value);
                }
            });
        });

        $(".slider-js-comparison").each(function () {
            $th = 0;

            $(this).find(".catalog-product-title").css('height', 'auto');
            $(this).find(".catalog-product-title").each(function () {
                if ($(this).height() > $th) {
                    $th = $(this).height();
                }
            });
            $(this).find(".catalog-product-title").css('height', $th);
        });

        $(".slider-js-comparison").slick({
            dots: false,
            arrows: true,
            draggable: false,
            infinite: false,
            centerMode: false,
            centerPadding: "0px",
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 500,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            slide: ".slide-js",
            slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: false,
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                    }
                },
            ]
        });
        $(".slider-js-comparison").removeClass('fade-left').addClass('fade-right');

        $(".slider-js-comparison-linked").each(function () {
            $(this).slick({
                dots: false,
                arrows: false,
                draggable: false,
                infinite: false,
                centerMode: false,
                centerPadding: "0px",
                autoplay: false,
                autoplaySpeed: 5000,
                speed: 500,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                slide: ".slide-js",
                slidesToShow: 4,
                slidesToScroll: 1,
                swipeToSlide: false,
                responsive: [
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                ]
            });
        });

        $('.slider-js-comparison').on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            $(this).closest('.box').find(".slider-js-comparison-linked").each(function () {
                $(this).slick('slickGoTo', nextSlide);
            });
        });

        $('.slider-js-comparison').on('afterChange', function (event, slick, currentSlide, nextSlide) {

            $(this).addClass('fade-left').addClass('fade-right');

            if ($(this).closest('.box').find('.slick-prev').hasClass('slick-disabled')) {
                $(this).removeClass('fade-left');
            }
            if ($(this).closest('.box').find('.slick-next').hasClass('slick-disabled')) {
                $(this).removeClass('fade-right');
            }
        });

        $('.slider-js-comparison').each(function () {
            $tH = $(this).closest('.fixed-slider').height();
            $(this).closest('.fixed-slider').next('.fixed-slider-placeholder').height($tH);
        });
    }

    sliderJsComparison();
    findDifferent();

    $('.comparison-page .global-tabs').click(function () {
        setTimeout(function () {
            $('.slider-js-comparison, .slider-js-comparison-linked').slick('unslick');
            sliderJsComparison();
            findDifferent();

            $('.slider-js-comparison').each(function () {
                $tH = $(this).closest('.fixed-slider').height();
                $(this).closest('.fixed-slider').next('.fixed-slider-placeholder').height($tH);
            });

            $cnt = $('.box[style*=block] .slider-js-comparison').find('.slide-js').length;
            $('.comparison-cnt').text($cnt);

            $cntTotal = 0;
            $('.global-tabs li b').each(function () {
                $cntTotal += $(this).text() * 1;
            });
            $('.comparison-total-cnt').text($cntTotal);
        }, 1);
    });

    $('body').on('click', '.comparison-type label', function () {
        if ($(this).hasClass('different')) {
            $(this).closest('.box').find('.non-different').hide();
        } else {
            $(this).closest('.box').find('.non-different').show();
        }
    });

    $('body').on('click', '.product-comparison-remove', function () {
        $elementId = $(this).data('id');
        $elementIndex = $(this).closest('.slide-js').index();

        $cnt = $(this).closest('.slider-js-comparison').find('.slide-js').length - 1;
        $('.comparison-cnt, .global-tabs .active b').text($cnt);

        if ($cnt < 5) {
            $('.box[style*=block] .slider-js-comparison').removeClass('fade-right');
        }

        $cntTotal = 0;
        $('.global-tabs li b').each(function () {
            $cntTotal += $(this).text() * 1;
        });
        $('.comparison-total-cnt').text($cntTotal);

        $('.box[style*=block] .slider-js-comparison, .box[style*=block] .slider-js-comparison-linked').slick('slickRemove', $elementIndex);

        findDifferent();
    });

    $('body').on('click', '.comparison-remove-all', function () {
        $next = $('.global-tabs .active').next('li');
        $('.global-tabs .active').remove();

        $nextBox = $('.box[style*=block]').next('.box');
        $('.box[style*=block]').remove();

        $nextBox.show();

        if ($next.length) {
            $next.trigger('click');
        } else {
            $('.comparison-total-cnt').text(0);
            $('.comparison-remove-all').remove();
        }
    });

});//document ready