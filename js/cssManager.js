var cssm = function () {
	var exports = {};
	function getRule (name, deleteRule) {
		name = name.toLowerCase();

		for (var i = 0, l = document.styleSheets.length; i < l; ++i) {
			var styleSheet = document.styleSheets[i];
			for (var ii = 0, ll = styleSheet.cssRules.length; ii < ll; ++ii) {

				var cssRule = styleSheet.cssRules[ii];

				if ( cssRule.selectorText.toLowerCase() === name ) {
					if (deleteRule === true) {
						styleSheet.deleteRule(ii);
						return true;
					} else {
						return cssRule;
					}
				}
			}
		}
		exports.get = getRule;

		return false;
	}

	function addRule (name, initial) {
		initial = initial || "{ }";
		if ( ! getRule(name) ) {
			document.styleSheets[0].insertRule(name + ' ' + initial, 0);
		}
		return getRule(name);
	}
	exports.new = addRule;

	function deleteRule (name) {
		getRule(name, true);
	}
	exports.delete = deleteRule;

	return exports;
}();
