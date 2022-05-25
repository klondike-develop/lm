$(document).ready(function () {
	$(document).on("click", ".section-fav .catalog-product-favorite", function (event) {
		$(this).parents(".col").remove();
	});

	$.each($(".catalog-product-img-swiper"), function (index, val) {
		var cardProductSlider = new Swiper(val, {
			fadeEffect: { crossFade: true },
			speed: 0,
			virtualTranslate: true,
			slidersPerView: 1,
			effect: "fade",
			watchOverflow: true,
			pagination: {
				el: ".catalog-product-img-swiper .swiper-pagination",
			},
		});

		$.each($(val).find(".swiper-pagination-bullet"), function (i, el) {
			$(el).on("mouseenter", function () {
				cardProductSlider.slideTo(i);
			});
		});

		$(".catalog-product-img-link-wrapper").on("mouseleave", function () {
			cardProductSlider.slideTo(0);
		});
	});
});
