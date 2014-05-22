var dm = function () {
	var exports = {};

	var beforeClass,
			afterClass,
			draggingClass,
			listener;

	exports.init = function (options) {
		beforeClass = options.beforeClass;
		afterClass = options.afterClass;
		draggingClass = options.draggingClass;
		listener = options.listener;
	};

	function getDropzoneFromTarget (target) {
		if (target.hasAttribute("draggable") || target.hasAttribute("dropzone")) {
			return target;
		} else {
			return getDropzoneFromTarget(target.parentElement);
		}
	}

	exports.onDragStart = function (e) {
		e.dataTransfer.setData("text/movable-item", e.target.id);
		setTimeout(function () {
			e.target.classList.add(draggingClass);
		}, 30);
		e.stopPropagation();
	};

	exports.onDragInto = function (e) {
		var data = e.dataTransfer.getData("text/movable-item");
		if (data) {
			e.stopPropagation();
			e.preventDefault();
			var item = getDropzoneFromTarget(e.target);
			var position = item.getBoundingClientRect();
			if ( !item.hasAttribute("dropzone") ||
					!item.querySelector("." + beforeClass + ",." + afterClass)) {
				var placeholder =
						document.querySelector("." + beforeClass);
				if (placeholder && placeholder.id !== item.id) {
					placeholder.classList.remove(beforeClass);
				}
				placeholder = document.querySelector("." + afterClass);
				if (placeholder && placeholder.id !== item.id) {
					placeholder.classList.remove(afterClass);
				}
			}
			if ( !item.hasAttribute("dropzone") && item.id !== data ) {
				if (e.pageY < position.top + position.height/2) {
					item.classList.add(beforeClass);
					item.classList.remove(afterClass);
				} else {
					item.classList.add(afterClass);
					item.classList.remove(beforeClass);
				}
			}
		}
	};

	exports.onDragEnd = function (e) {
		var data = e.dataTransfer.getData("text/movable-item");
		if (data) {
			var query = "." + beforeClass + ", ." + afterClass;
			Array.slice(document.querySelectorAll(query)).forEach(function (result) {
				result.classList.remove(beforeClass);
				result.classList.remove(afterClass);
			});
			var item = document.getElementById(data);
			item.classList.remove(draggingClass);
		}
	};

	exports.onDragDrop = function (e) {
		var data = e.dataTransfer.getData("text/movable-item");
		if (data) {
			e.preventDefault();
			e.stopPropagation();
			/* prevent transistions */
			var query = "." + beforeClass + ", ." + afterClass;
			var results = Array.slice(document.querySelectorAll(query));
			results.forEach(function (result) {
				var style = cssm.new("#" + result.id + ":not([notunique])");
				window.requestAnimationFrame(function () {
					style.style.transition = "none";
				});
			});

			var item = getDropzoneFromTarget(e.target);
			var customItem = (listener.beforeDrop || function () {})(data);
			var draggedItem = (customItem || document.getElementById(data));
			var placeholder = document.querySelector(query);
			if ( !placeholder && item.hasAttribute("dropzone") ) {
				item.appendChild(draggedItem);
			} else {
				item = placeholder || item;
				if ( item.classList.contains(beforeClass) ) {
					item.parentElement.insertBefore(draggedItem, item);
					item.classList.remove(beforeClass);
				} else {
					item.parentElement.insertBefore(draggedItem, item.nextSibling);
					item.classList.remove(afterClass);
				}
			}
			results.forEach(function (result) {
				var style = cssm.get("#" + result.id + ":not([notunique])");
				setTimeout(function () {
					cssm.delete(style.selectorText);
				}, 100);
			});
			(listener.afterDrop || function () {} )();
		}
	};
	return exports;
}();
