$(document).ready(function () {

    //complaint phone mask
    $('.complaint-phone-mask').mask('+7 (999) 999-99-99');

    //------------------------------------------------------------------------//

    //complaint rating
    $('.complaint-rating-block label').hover(
        function () {
            $(this)
                .parents('.complaint-rating')
                .find('.complaint-rating-value')
                .text($(this).data('rating'));
        }, function () {
            var thisParent = $(this).parents('.complaint-rating'),
                thisChecked = thisParent.find(':checked');
            if (thisChecked.length) {
                var thisCheckedValue =
                    thisChecked
                        .next('label')
                        .data('rating');
                thisParent
                    .find('.complaint-rating-value')
                    .text(thisCheckedValue);
            } else {
                thisParent
                    .find('.complaint-rating-value')
                    .text('');
            }
        }
    );

    //------------------------------------------------------------------------//

});//document ready