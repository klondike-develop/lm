$(document).ready(function () {
    function substrNameCat(value, lengthText) {
        $.each($(value), function(index, val) {
            var valText = $(val).text();
            if (valText.length > lengthText) {
                $(val).text(valText.slice(0, lengthText) + '...');
            }
        });
    }

    substrNameCat(".menu-catalog-dropdown-category-name a", 115);
    substrNameCat(".menu-catalog-name > span", 27);

    $(".js-toggle-menu-catalog").on("click", function() {

        if (!$('.menu-catalog-list > li').hasClass("hover")) {
            openSubmenuCategory($('.menu-catalog-list > li:first-child'));
        }

        $(this).toggleClass("show");
        $(".menu-catalog-wrapper").fadeToggle();

    });

    var timer;

    $('.menu-catalog-list > li').mouseenter(function() {
        if (!$(this).hasClass("hover")) {
            clearTimeout(timer);
            closeSubmenuCategory($('.menu-catalog-dropdown'));
            closeSubmenuCategory($('.menu-catalog-list > li'));
    
            thisLi = $(this);
            timer = setTimeout(function () { openSubmenuCategory(thisLi); }, 150);
        }
    })

    $('.menu-catalog-list > li > ul').mouseenter(function(e) {
        e.stopPropagation();
    })

    function openSubmenuCategory(value) {
        var menuId = $(value).attr("data-id-cat");
        $(value).addClass('hover');
        $("#" + menuId).addClass('hover');
    }
    function closeSubmenuCategory(value) {
        $(value).removeClass('hover');
    }

});