var events = function () {
	var exports = {};

	exports.taskKeypress = function (e) {
		if (e.keyCode === 13)
				$("#newItem").focus();
	};
	exports.taskRangeChange = function (e) {
		window.requestAnimationFrame(function () {
			clockwork.clear();
			clockwork.update();
		});
		if (e.target.value <= 2) {
			e.target.parentElement.style.width = "calc(25% - 18px)";
			e.target.parentElement.setAttribute("data-length", "1");
		} else if (e.target.value <= 3) {
			e.target.parentElement.style.width = "calc(50% - 18px)";
			e.target.parentElement.setAttribute("data-length", "2");
		} else if (e.target.value <= 4) {
			e.target.parentElement.style.width = "calc(75% - 18px)";
			e.target.parentElement.setAttribute("data-length", "3");
		} else {
			e.target.parentElement.style.width = "calc(100% - 18px)";
			e.target.parentElement.setAttribute("data-length", "4");
		}
	};

	exports.taskStickyToggle = function (e) {
		var sticky = e.target.hasAttribute("data-sticky");
		if (!sticky) {
			e.target.setAttribute("data-sticky", "true");
			e.target.parentElement.setAttribute("data-sticky", "true");
		} else {
			e.target.removeAttribute("data-sticky");
			e.target.parentElement.removeAttribute("data-sticky");
		}
	};
	return exports;
}();
