$(document).ready(function(){

    //centerModal
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
    $(document).on('click', '[data-toggle="modal"]', function(event) {
        centerModal();
    });
    $(window).resize(function(){
        centerModal();
    });

    //------------------------------------------------------------------------//

    function modalAssembly_init() {
        $('.assembly-phone-mask').mask('+7 (999) 999-99-99');

        $('.assembly-form-day-slider').slick({
            dots: false,
            arrows: true,
            draggable: true,
            infinite: false,
            centerMode: true,
            centerPadding: '0px',
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 500,
            pauseOnHover: false,
            pauseOnDotsHover: false,
            slide: '.slide-js',
            slidesToShow: 5,
            slidesToScroll: 1,
            initialSlide: 9,
            focusOnSelect: true,
            swipeToSlide: true
        });

        $('.assembly-form-time-period').on('click', function(event) {
            event.preventDefault();
            $(this).parents('.assembly-form-time').toggleClass('closed');
        });

    }
    modalAssembly_init();

    //------------------------------------------------------------------------//

    //modal assembly
    $('#modal-assembly').on('shown', function () {
        $.ajax({
            url: '../assembly-form.html',
            cache: false,
            success: function() {
                $('#modal-assembly').load( '../assembly-form.html', function( response, status, xhr ) {
                    modalAssembly_init();
                    centerModal();
                });
            }
        });
    });

    //------------------------------------------------------------------------//

});//document ready