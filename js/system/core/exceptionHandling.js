define([
	'system/core/postMessage',
	], function(
		PostMessage
		) {

	return {

		init: function () {

			var self = this;
			window.addEventListener('error', function (e) {
				self.sendError(e.error, 'Crash');
			}, false);
		},

		throwError: function(message) {
			this.sendError(message, 'Ajax failed');
		},

		sendError: function(details, title, reloadGame) {
			if(details === undefined)
				details = "";
			if(title === undefined)
				title = "";
			if(reloadGame === undefined)
				reloadGame = false;

			console.warn("Error: " + details + " " + title)

			// send to iframe
			PostMessage.send({
				type: "urn:x-tipp24:remote-client-error",
				title: (title || "").toString(),
				details: (details || "").toString(),
				status: 503,
				reloadGame: reloadGame
			});
		}

	}
});
