function $ (query, element) {
	return (element || document).querySelector(query);
}

function $$ (query, element) {
	return (element || document).querySelectorAll(query);
}

$("#newItem").addEventListener("click", function (e) {
	tm.add();
}, false);

$("#openSettings").addEventListener("click", function (e) {
	ui.toggleView(ui.settings);
}, false);

$("#export").addEventListener("click", function(e) {
	var place = prompt("settings file:");
	alert(localStorage.getItem(place));
}, false);

$("#import").addEventListener("click", function (e) {
	var place = prompt("settings file:");
	if (place) {
		var areaStates = prompt("Paste Here:");
		if (areaStates) {
			localStorage.setItem(place, areaStates);
		}
	}
}, false);

$("#startHour").value = settings.get("startHour");
$("#startHour").addEventListener("change", function (e) {
	settings.set("startHour", e.target.value);
	clockwork.clear();
	clockwork.update();
}, false);

var dropListener = {
	beforeDrop: function (id) {
		var task = $("#" + id);
		if ( $(".sticker", task).hasAttribute("data-sticky") ) {
			var name = $(".label", task).value;
			var time = $("[type='range']", task).value;
			return ui.newTask(name, time);
		}
		return null;
	},
	afterDrop: function () {
		clockwork.clear();
		clockwork.update();
	}
};

dm.init({
	beforeClass: "dropbefore",
	afterClass: "dropafter",
	draggingClass: "dragging",
	listener: dropListener
});


Array.slice($$("[dropzone]")).forEach(function (dropzone) {
	dropzone.addEventListener("dragenter", dm.onDragInto, false);
	dropzone.addEventListener("dragover", dm.onDragInto, false);
	dropzone.addEventListener("drop", dm.onDragDrop, false);
});

var todayHeight = ui.today.getBoundingClientRect().height;
ui.today.style.maxHeight = todayHeight + "px";
tm.load();

clockwork.update();
setInterval(clockwork.update, 1000);
