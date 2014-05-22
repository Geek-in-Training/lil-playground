var tm = function () {
	var exports = {};

	function add (taskName, time) {
		var task = ui.newTask(taskName, time);
		ui.stickyPalette.appendChild(task);
		if (!taskName) {
			$(".label", task).focus();
		}
	}
	exports.add = add;

	exports.save = function (location) {
		location = location || "areaStates";
		var areaStates = {};
		Array.slice($$("[dropzone]")).forEach(function (area) {
			areaStates[area.id] = [];
			Array.slice($$("#" + area.id + " .task")).forEach(function (item) {
				var task = {
					name: $(".label", item).value,
					time: $("[type='range']", item).value,
					sticky: $(".sticker", item).getAttribute("data-sticky")
				};
				areaStates[area.id].push(task);
			});
		});
		settings.set(location, areaStates);
	};

	exports.load = function (location) {
		location = location || "areaStates";
		var areaStates = settings.get(location);
		Array.slice($$("[dropzone]")).forEach(function (area) {
			area.innerHTML = "";
			var state = areaStates[area.id];
			state.forEach(function (task) {
				var item = ui.newTask(task.name, task.time, task.sticky);
				area.appendChild(item);
			});
		});
	};

	return exports;
}();
