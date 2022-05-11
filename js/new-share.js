$(document).ready(function() {
    $(".js-toggle-share").on("click", function() {
        $(this).parent().find(".new-product-share-wrap").toggleClass("active");
    });

    $(document).on("click", function(e) {
        if ($(e.target).closest(".new-product-share").length === 0) {
            $(".new-product-share-wrap").removeClass("active");
        }
    });
});