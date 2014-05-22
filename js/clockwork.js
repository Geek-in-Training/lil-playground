var clockwork = function () {
	var exports = {};
	var lines;
	var endHour = 22;
	var lastMinute = -1;
	exports.clear = function () {
		var tasks = $$(".task");
		Array.slice(tasks).forEach(function (task) {
			task.style.backgroundImage = null;
			$(".clock", task).textContent = "";
		});
	};

	exports.update = function () {
		var startHour = settings.get("startHour");
		var time = new Date();
		var hour = time.getHours();
		var minute = time.getMinutes();
		var second = time.getSeconds();
		var minutes = minute + (hour - startHour) * 60;
		second += minutes * 60;
		var tasks = $$("#today .task");
		var elapsed = (second / (60 * 60)) * 100;
		var hourCount = startHour;
		var lineTotal = 0;
		var minTotal = 0;
		Array.slice(tasks).forEach(function (task) {
			var taskTotal = parseInt(task.getAttribute("data-length")) * 25;
			var ampm = (hourCount > 12) ? 12 : 0;
			if (lineTotal > 0 && lineTotal < 4) {
				$(".clock", task).textContent = ":" + minTotal * 0.60;
			} else {
				$(".clock", task).textContent = (hourCount - ampm) + ":";
				++ hourCount;
			}

			var occupied = lineTotal;
			lineTotal += taskTotal / 25;

			if (lineTotal < 4) {
				minTotal += taskTotal;
			} else {
				lineTotal = 0;
				minTotal = 0;
			}

			var percent = Math.round((elapsed / taskTotal * 100) * 100 + 10) / 100;
			if (percent >= 100) {
				task.style.backgroundImage = "linear-gradient(to right, #2f2f60 0%, #2f2f60 100%)";
			} else if (percent > 0.1) {
				task.style.backgroundImage = "linear-gradient(to right, #3d3da0 0%, #9852a5 " + percent + "%, transparent "+ percent+1 +"%)";
				var timeRemaining = occupied * 15 + (taskTotal / 25) * 15 - minute;
				if (lastMinute !== minute) {
					switch(timeRemaining) {
						case 30:
							if (taskTotal === 50) {
								new Notification("Starting: " + $(".label", task).value, {body: "time: " + (taskTotal / 25) * 15 + "minutes"});
								break;
							}
							/* falls through */
						case 15:
							if (taskTotal === 25) {
								new Notification("Starting: " + $(".label", task).value, {body: "time: " + (taskTotal / 25) * 15 + "minutes"});
								break;
							}
							/* falls through */
						case 10:
						case 5:
						case 1:
							new Notification(timeRemaining + " Minutes left for " + $(".label", task).value, {
								body: "Up Next: " + $(".label", task.nextSibling).value
							});
						break;
					}
				}
				lastMinute = minute;
			}
			elapsed -= taskTotal;
		});
	};
	return exports;
}();
