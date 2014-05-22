var settings = function () {
	var exports = {};

	exports.set = function (setting, value) {
		return localStorage.setItem(setting, JSON.stringify(value));
	};

	exports.get = function (setting) {
		return JSON.parse(localStorage.getItem(setting));
	};

	return exports;
}();
