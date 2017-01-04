define([
	'system/core/game',
	'game/config/gameplay',
	], function(
		Game,
		GameplayConfig
		) {


	var postOrigin = "";
	var gameName = "test";

	return {

		//postOrigin: '',
		//gameName: 'elferlifa',

		init: function () {
			this.setPostOrigin();
			window.addEventListener("message", this.receiveMessage, false);

			// send game loaded
			this.sendCommand('gameLoaded');

		},

		setPostOrigin: function() {
			var parentLoc = window.location;
			postOrigin = parentLoc.origin || parentLoc.protocol + "//" + parentLoc.hostname + (parentLoc.port ? (':' + parentLoc.port) : '');
		},

		receiveMessage: function(event)
		{

			//console.log("receiveMessage");
			//console.log(event);

			// dont trust all senders
			if (event.origin !== postOrigin)
				return;

			// do action
			//console.log(event.data);
    		var command = (event.data || "").command || event.data;
			console.log("receiveMessage -> " + command);
			
			switch(command) {
				case 'playGame':
					break;
				case 'playDemoGame':
					break;
				case 'updateNickname':
					break;
			}

		},

		sendCommand: function(command, extras) {

			var data = {
				command: command,
				game: this.gameName,
				element: '',
				action: ''
			};

			if(extras !== undefined) {
				for (var key in extras) {
					if (extras.hasOwnProperty(key)) {
						//console.log(key + " -> " + extras[key]);
						data[key] = extras[key];
					}
				}
			}

			this.send(data);
		},

		send: function(event) {
			var target = window.parent;
			target.postMessage(event, postOrigin);
		}

	}
});
