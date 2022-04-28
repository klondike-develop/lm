$(document).ready(function () {

    //new cabinet status promocode list
    var newCabinetStatusPromocode,
        newCabinetStatusPromocodeLength = $('.new-cabinet-status-promocode-list').length;
    if (newCabinetStatusPromocodeLength) {
        newCabinetStatusPromocode = new Swiper('.new-cabinet-status-promocode-list', {
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
            spaceBetween: 30,
            slidesPerView: 1,
        });
    }

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

    //new cabinet modal promocode
    $('#new-cabinet-modal-promocode').on('shown', function () {
        $.ajax({
            url: '../new-cabinet-modal-promocode.html',
            cache: false,
            success: function () {
                $('#new-cabinet-modal-promocode').load('../new-cabinet-modal-promocode.html', function (response, status, xhr) {
                    centerModal();
                });
            }
        });
    });

    //------------------------------------------------------------------------//

    //new cabinet modal promocode apply
    $('#new-cabinet-modal-promocode-apply').on('shown', function () {
        $.ajax({
            url: '../new-cabinet-modal-promocode-apply.html',
            cache: false,
            success: function () {
                $('#new-cabinet-modal-promocode-apply').load('../new-cabinet-modal-promocode-apply.html', function (response, status, xhr) {
                    centerModal();
                });
            }
        });
    });

    //------------------------------------------------------------------------//

});//document ready