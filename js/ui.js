var ui = function () {
	var exports = {};

	var today = document.getElementById("today");
	var stickyPalette = document.getElementById("sticky-palette");
	var palette = document.getElementById("palette");
	var drape = document.getElementById("drape");
	var settings = document.getElementById("settings");
	exports.today = today;
	exports.stickyPalette = stickyPalette;
	exports.palette = palette;
	exports.settings = settings;

	function toggleView (view) {
		if (!view) {
			view = document.querySelector(".viewing");
			if (!view) {
				return;
			}
		}
		drape.classList.toggle("hidden");
		view.classList.toggle("viewing");
	}
	exports.toggleView = toggleView;

	/* templates */
	var tasks = [];
	function newTask (name, time, sticky) {
		var task = document.createElement("div");
		task.id = "task" + tasks.length;
		tasks.push(1);
		task.classList.add("task");
		task.setAttribute("draggable", "true");
		task.setAttribute("data-length", "4");
		var clock = document.createElement("span");
		clock.classList.add("clock");
		var label = document.createElement("input");
		label.classList.add("label");
		label.value = name || "";
		label.addEventListener("keypress", events.taskKeypress, false);
		var range = document.createElement("input");
		range.setAttribute("type", "range");
		range.setAttribute("min", "1");
		range.setAttribute("max", "5");
		range.value = time || 5;
		range.addEventListener("change", events.taskRangeChange, false);
		var sticker = document.createElement("button");
		sticker.classList.add("sticker");
		if (sticky) {
			sticker.setAttribute("data-sticky", sticky);
			task.setAttribute("data-sticky", sticky);
		}
		sticker.addEventListener("click", events.taskStickyToggle, false);
		var close = document.createElement("button");
		close.textContent = "X";
		close.classList.add("close");
		close.addEventListener("click", function (e) {
			e.target.parentElement.parentElement.removeChild(e.target.parentElement);
		}, false);
		var finished = document.createElement("input");
		finished.setAttribute("type", "checkbox");

		task.appendChild(clock);
		task.appendChild(label);
		task.appendChild(range);
		task.appendChild(sticker);
		task.appendChild(close);
		task.appendChild(finished);
		events.taskRangeChange({target: range});

		task.addEventListener("dragstart", dm.onDragStart, false);
		task.addEventListener("dragenter", dm.onDragInto, false);
		task.addEventListener("dragover", dm.onDragInto, false);
		task.addEventListener("dragend", dm.onDragEnd, false);
		task.addEventListener("drop", dm.onDragDrop, false);
		return task;
	}
	exports.newTask = newTask;

	return exports;
}();
