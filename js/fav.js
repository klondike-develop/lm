$(document).ready(function () {
	$(document).on("click", ".section-fav .catalog-product-favorite", function (event) {
		$(this).parents(".col").remove();
	});
});
