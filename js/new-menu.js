$(document).ready(function () {
    $(".js-toggle-menu-catalog").on("click", function() {
        $(this).toggleClass("show");
        $(".menu-catalog-wrapper").fadeToggle();
    });

    var timer;

    $('.menu-catalog-wrapper').mouseleave(function() {
        clearTimeout(timer);
        closeSubmenuCategory($('.menu-catalog-list > li'));
    });

    $('.menu-catalog-list > li').mouseenter(function() {
        clearTimeout(timer);
        closeSubmenuCategory($('.menu-catalog-list > li'));

        thisLi = $(this);
        timer = setTimeout(function () { openSubmenuCategory(thisLi); }, 150);
    })

    $('.menu-catalog-list > li > ul').mouseenter(function(e) {
        e.stopPropagation();
    })

    function openSubmenuCategory(value) {
        $(value).addClass('hover');
    }
    function closeSubmenuCategory(value) {
        $(value).removeClass('hover');
    }

});