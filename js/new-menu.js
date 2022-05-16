$(document).ready(function () {
	function substrNameCat(value, lengthText) {
		$.each($(value), function (index, val) {
			var valText = $(val).text();
			if (valText.length > lengthText) {
				$(val).text(valText.slice(0, lengthText) + "...");
			}
		});
	}

	substrNameCat(".menu-catalog-dropdown-category-name a", 115);
	substrNameCat(".menu-catalog-name > span", 27);

	$(".js-toggle-menu-catalog").on("click", function () {
		$(".menu-catalog-list > li").removeClass("hover");

		if (!$(".menu-catalog-dropdown").hasClass("hover")) {
			$(".menu-catalog-dropdown").eq(0).addClass("hover");
		}

		$(this).toggleClass("show");
		$(".menu-catalog-wrapper").fadeToggle();
	});

	$(document).on("click", function (e) {
		if ($(e.target).closest(".menu-catalog-wrapper").length === 0 && $(e.target).closest(".js-toggle-menu-catalog").length === 0) {
			$(".js-toggle-menu-catalog").removeClass("show");
			$(".menu-catalog-wrapper").fadeOut();
		}
	});

	var timer;

	$(".menu-catalog-list > li").mouseenter(function () {
		if (!$(this).hasClass("hover")) {
			clearTimeout(timer);

			if (!$("#" + $(this).attr("data-id-cat")).hasClass("hover")) {
				closeSubmenuCategory($(".menu-catalog-dropdown"));
			}

			closeSubmenuCategory($(".menu-catalog-list > li"));

			thisLi = $(this);
			timer = setTimeout(function () {
				openSubmenuCategory(thisLi);
			}, 150);
		}
	});

	$(".menu-catalog-list > li > ul").mouseenter(function (e) {
		e.stopPropagation();
	});

	function openSubmenuCategory(value) {
		var menuId = $(value).attr("data-id-cat");
		$(value).addClass("hover");
		$("#" + menuId).addClass("hover");
	}
	function closeSubmenuCategory(value) {
		$(value).removeClass("hover");
	}
});
