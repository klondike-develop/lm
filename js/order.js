$(document).ready(function(){

    //order buy
    $('.order-buy-begin').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-buy-block').addClass('active');
    });

    //------------------------------------------------------------------------//

    //order delete
    $('.order-product-delete').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-product').addClass('deleted');
    });

    $('.order-product-return-link').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-product').removeClass('deleted');
    });

    //------------------------------------------------------------------------//

    //order set
    $('.order-product-set-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-product-set').toggleClass('open').find('.order-product-set-list').slideToggle(200);
    });

    //------------------------------------------------------------------------//

    //order change
    $('.order-product-change-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-product-change').toggleClass('open').find('.order-product-change-list').slideToggle(200);
    });

    $('.order-product-change-item-link').on('click', function(event) {
        event.preventDefault();
        $(this).parent('.order-product-change-item').addClass('active').siblings('.order-product-change-item').removeClass('active');
    });

    //------------------------------------------------------------------------//

    //product number
    $('.product-number-text').on('keypress', function(event) {
        event = event || window.event;
        if (event.charCode && event.charCode!=0 && event.charCode!=46 && (event.charCode < 48 || event.charCode > 57) ) return false;
    });

    $(document).on('click', '.product-number-minus', function(event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.product-number').find('.product-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if ( quantityValue < 0 ) { quantityValue = 0; }
        quantityInput.val(quantityValue);
    });

    $(document).on('click', '.product-number-plus', function(event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.product-number').find('.product-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
    });

    //------------------------------------------------------------------------//

    //order phone mask
    $('.order-phone-mask').mask('+7 (999) 999-99-99');

    //------------------------------------------------------------------------//

    //order map
    $('.order-delivery-map-toggle').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-delivery-map').addClass('open');
    });

    $('.order-delivery-map-hide').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.order-delivery-map').removeClass('open');
    });

    //------------------------------------------------------------------------//

    //datepicker
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
        'Июл','Авг','Сен','Окт','Ноя','Дек'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    var enableDays = ['03.07.2019', '04.07.2019'];

    function enableAllTheseDays(date) {
        var sdate = $.datepicker.formatDate( 'dd.mm.yy', date);
        if ( $.inArray(sdate, enableDays ) != -1) {
            return [true];
        }
        return [false];
    }

    $('.datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        // minDate: 1,
        // maxDate: +10
        // minDate: new Date(2019, 5, 3),
        // maxDate: new Date(2019, 11, 30)
        beforeShowDay: enableAllTheseDays
    });

    //------------------------------------------------------------------------//

    //order comment
    $('.order-comment-options li a').on('click', function(event) {
        event.preventDefault();
        var thisComment = $(this).text();
        $('.order-comment-textarea').focus().val(thisComment);
    });

    //------------------------------------------------------------------------//

    //order check
    function orderSet(thisElement) {
        var thisParent = thisElement.parents('.order-product-set'),
            thisParentProduct = thisParent.find('> .order-product'),
            thisSet = thisParent.find('.order-product-set-list'),
            thisSetCheckbox = thisSet.find('.order-product-assembly input[type="checkbox"]'),
            thisParentCheckbox = thisParentProduct.find('.order-product-assembly input[type="checkbox"]');

        if (thisElement.parents('.order-product-set-list').length) {
            var setTrue = true;
            thisSetCheckbox.each(function(index, el) {
                if ( $(this).prop('checked') == false ) {
                    setTrue = false;
                }
                if (setTrue) {
                    thisParentCheckbox.prop('checked', true);
                } else {
                    thisParentCheckbox.prop('checked', false);
                }
            });
        } else {
            if (thisParentCheckbox.is(':checked')) {
                thisSetCheckbox.prop('checked', true);
            } else {
                thisSetCheckbox.prop('checked', false);
            }
        }
    }

    $('.order-product-set input[type="checkbox"]').on('change', function(event) {
        orderSet($(this));
    });

    //------------------------------------------------------------------------//

});//document ready