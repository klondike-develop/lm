$(document).ready(function () {
	var newSimilarProductsSlider;
	var newSimilarProductsSliderLength = $(".new-similar-products-slider-container").length;

	if (newSimilarProductsSliderLength) {
		newSimilarProductsSlider = new Swiper(".new-similar-products-slider-container", {
			slidesPerView: 4,
			watchOverflow: true,
			spaceBetween: 16,
			speed: 500,

			navigation: {
				nextEl: ".new-similar-products-slider .swiper-button-next",
				prevEl: ".new-similar-products-slider .swiper-button-prev",
			},

			breakpoints: {
				1326: {
					slidesPerView: 4,
				},
			},

			on: {
				unlock(swiper) {
					this.$el[0].classList.remove("lock");
				},

				lock(swiper) {
					this.$el[0].classList.add("lock");
				},
			},
		});
	}
});
