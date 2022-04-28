$(document).ready(function(){

    //scroll to
    $('.scroll-link, .faq-menu a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 400);
                return false;
            }
        }
    });

    //------------------------------------------------------------------------//

    //faq answer
    $('.faq-item-caption').on('click', function(event) {
        event.preventDefault();
        $(this).parents('.faq-item').toggleClass('open');
    });

    //------------------------------------------------------------------------//

    //faq phone mask
    $('.faq-phone-mask').mask('+7 (999) 999-99-99');

    //------------------------------------------------------------------------//

});//document ready