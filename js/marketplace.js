$(document).ready(function () {

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $(document).on('click', 'a[href="#"]', function (event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //marketplace document
    $(document).on('change', '.marketplace-document-upload input', function (event) {
        var thisValue = $(this).val(),
            thisParents = $(this).parents('.marketplace-document-upload');
        if (thisValue) {
            thisParents.addClass('active').find('.marketplace-document-upload-text').text('Загружен');
        }
    });

    //------------------------------------------------------------------------//

    //marketplace statistics
    $(document).on('click', '.marketplace-statistics-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.marketplace-statistics-row').toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //marketplace daterangepicker
    if ($("#marketplace-daterangepicker").length) {

        $("#marketplace-daterangepicker").daterangepicker(
            {
                "locale": {
                    "format": "dd, DD MMMM, YYYY",
                    "separator": " – ",
                    "applyLabel": "Применить",
                    "cancelLabel": "Отменить",
                    "fromLabel": "От",
                    "toLabel": "До",
                    "customRangeLabel": "Произвольный",
                    "weekLabel": "W",
                    "daysOfWeek": [
                        "Вс",
                        "Пн",
                        "Вт",
                        "Ср",
                        "Чт",
                        "Пт",
                        "Сб"
                    ],
                    "monthNames": [
                        "Январь",
                        "Февраль",
                        "Март",
                        "Апрель",
                        "Май",
                        "Июнь",
                        "Июль",
                        "Август",
                        "Сентябрь",
                        "Октябрь",
                        "Ноябрь",
                        "Декабрь"
                    ],
                    "firstDay": 1
                },
                "alwaysShowCalendars": true,
                "autoUpdateInput": true,
                "startDate": "Ср, 29 Ноябрь, 2020",
                "endDate": "Чт, 10 Декабрь, 2020",
                "template":
                    '<div class="daterangepicker marketplace-period-panel">' +
                    '<div class="marketplace-period-content">' +
                    '<div class="marketplace-period-calendar">' +
                    '<div class="ranges"></div>' +
                    '<div class="marketplace-period-columns">' +
                    '<div class="drp-calendar left">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                    '</div>' +
                    '<div class="drp-calendar right">' +
                    '<div class="calendar-table"></div>' +
                    '<div class="calendar-time"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="marketplace-period-menu">' +
                    '<ul>' +
                    '<li><a class="daterange-today" href="#">Сегодня</a></li>' +
                    '<li><a class="daterange-yesterday" href="#">Вчера</a></li>' +
                    '<li><a class="daterange-this-week" href="#">Эта неделя</a></li>' +
                    '<li><a class="daterange-this-month" href="#">Этот месяц</a></li>' +
                    '<li><a class="daterange-last-month" href="#">Прошлый месяц</a></li>' +
                    '<li><a class="daterange-custom" href="#">Произвольный диапазон</a></li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '<div class="marketplace-period-footer drp-buttons">' +
                    '<div class="marketplace-period-date"><span class="drp-selected"></span></div>' +
                    '<div class="marketplace-period-options">' +
                    '<button class="cancelBtn button secondary" type="button"></button>' +
                    '<button class="applyBtn button primary" disabled="disabled" type="button"></button> ' +
                    '</div>' +
                    '</div>' +
                    '</div>'
            },
            function (start, end, label) {
            }
        );

        var DateRangePicker = $('#marketplace-daterangepicker').data('daterangepicker');

        $(document).on('click', '.daterange-today', function (event) {
            event.preventDefault();
            DateRangePicker.setStartDate(moment());
            DateRangePicker.setEndDate(moment());
            DateRangePicker.updateView();
        });

        $(document).on('click', '.daterange-yesterday', function (event) {
            event.preventDefault();
            DateRangePicker.setStartDate(moment().subtract(1, 'days'));
            DateRangePicker.setEndDate(moment().subtract(1, 'days'));
            DateRangePicker.updateView();
        });

        $(document).on('click', '.daterange-this-week', function (event) {
            event.preventDefault();
            DateRangePicker.setStartDate(moment().startOf('isoWeek'));
            DateRangePicker.setEndDate(moment().endOf('isoWeek'));
            DateRangePicker.updateView();
        });

        $(document).on('click', '.daterange-this-month', function (event) {
            event.preventDefault();
            DateRangePicker.setStartDate(moment().startOf('month'));
            DateRangePicker.setEndDate(moment().endOf('month'));
            DateRangePicker.updateView();
        });

        $(document).on('click', '.daterange-last-month', function (event) {
            event.preventDefault();
            DateRangePicker.setStartDate(moment().subtract(1, 'month').startOf('month'));
            DateRangePicker.setEndDate(moment().subtract(1, 'month').endOf('month'));
            DateRangePicker.updateView();
        });

    }

    //------------------------------------------------------------------------//

    //page showroom registration phone mask
    if ($('.page-showroom-registration-phone-mask').length) {
        $('.page-showroom-registration-phone-mask').mask('+7 (999) 999 99 99');
    }

    //------------------------------------------------------------------------//

    //page showroom registration tabs orders
    $(document).on('click', '.page-showroom-registration-note-link', function (event) {
        event.preventDefault();
        var thisParent = $('.page-showroom-registration'),
            thisLi = thisParent.find('.page-showroom-registration-tabs-orders'),
            thisLiIndex = thisLi.index();
        thisLi.addClass('active').siblings('li').removeClass('active');
        thisParent.find('.box').hide();
        thisParent.find('.box').eq(thisLiIndex).fadeIn(250);
    });

    //------------------------------------------------------------------------//

    //page showroom registration order
    $(document).on('click', '.page-showroom-registration-order-toggle', function (event) {
        event.preventDefault();
        $(this).parents('.page-showroom-registration-orders-row').toggleClass('active');
    });

    //------------------------------------------------------------------------//

    //page showroom registration search
    $(document).on('focusin', '.page-showroom-registration-search-text-input', function (event) {
        $(this).parents('.page-showroom-registration-search-text').addClass('active');
    });

    $(document).on('focusout', '.page-showroom-registration-search-text-input', function (event) {
        $(this).parents('.page-showroom-registration-search-text').removeClass('active');
    });

    //------------------------------------------------------------------------//

    //page showroom registration product number
    $(document).on('keypress', '.page-showroom-registration-product-number-text', function (event) {
        event = event || window.event;
        if (event.charCode && event.charCode != 0 && event.charCode != 46 && (event.charCode < 48 || event.charCode > 57)) return false;
    });

    $(document).on('click', '.page-showroom-registration-product-number-minus', function (event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.page-showroom-registration-product-number').find('.page-showroom-registration-product-number-text');
        var quantityValue = quantityInput.val();
        quantityValue = --quantityValue;
        if (quantityValue < 0) { quantityValue = 0; }
        quantityInput.val(quantityValue);
    });

    $(document).on('click', '.page-showroom-registration-product-number-plus', function (event) {
        event.preventDefault();
        var quantityInput = $(this).parent('.page-showroom-registration-product-number').find('.page-showroom-registration-product-number-text');
        var quantityValue = quantityInput.val();
        quantityInput.val(++quantityValue);
    });

    //------------------------------------------------------------------------//

});//document ready
