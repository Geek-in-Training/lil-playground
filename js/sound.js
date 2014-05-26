var sound = function () {
	var exports = {};
	var context;
	var buffers = [];

	if (typeof AudioContext !== "undefined") {
		context = new AudioContext();
	}
	else if (typeof webkitAudioContext !== "undefined") {
		context = new webkitAudioContext();
	}
	else {
		try {
			var tagPlay = document.createElement("audio");
			tagPlay.id = "tagPlayer";
			tagPlay.preload = true;
			return {
				enabled: true,
				load: function (file) {
					tagPlay.src = file;
				},
				play: function (volume) {
					tagPlay.currentTime = 0;
//					tagPlay.volume = volume || 1;
					tagPlay.play();
				}
			};
		} catch (e) {
			return {enabled: false, play: function(){} };
		}
	}
	exports.enabled = true;

	function load (file, name) {
		var req = new XMLHttpRequest();
		req.open("GET", file, true);
		req.responseType = "arraybuffer";
		req.onload = function () {
			//decode the loaded data
			context.decodeAudioData(req.response, function (buf) {
				buffers[name] = buf;
			});
		};
		req.send();
	}
	exports.load = load;

	function play (name) {
		var source = context.createBufferSource();
		source.buffer = buffers[name];
		source.connect(context.destination);
		source.start(0);
	}
	exports.play = play;
	return exports;
}();
