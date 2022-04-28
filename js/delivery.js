$(document).ready(function(){

    //delivery address
    $('.delivery-rate-address-toggle').on('click', function(event) {
        event.preventDefault();
        $('.delivery-address').show();
    });

    $('.delivery-address-options-hide-button').on('click', function(event) {
        event.preventDefault();
        $('.delivery-address').hide();
    });

    //------------------------------------------------------------------------//

    //delivery map
    $('.delivery-address-options-map-hide').on('click', function(event) {
        event.preventDefault();
        $('.delivery-address').addClass('delivery-address-map-hidden');
    });

    $('.delivery-address-options-map-show').on('click', function(event) {
        event.preventDefault();
        $('.delivery-address').removeClass('delivery-address-map-hidden');
    });

    //------------------------------------------------------------------------//

});//document ready