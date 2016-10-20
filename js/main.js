define(
	['game/config/scenes', 'game/config/config', 'system/core/graphic', 'system/core/mouse', 'system/core/controls', 'system/core/sound', 'system/core/game', 'system/core/debug'],
	function (scenes, config, graphics, mouse, controls, sound, game, debug) {
		graphics.load(function() {
			document.getElementById('loading').style.display = 'none';

			controls.init();
			mouse.init();
			sound.load();
			scenes.init();

			var scene = scenes.default;

			if(config.debug) {
				var hash = location.hash.substr(1);
				if(hash && scenes[hash])
					scene = scenes[hash];
			}

			game.init(scene);

			if(config.debug) {
				debug.init();
			}
			
		});
	}
);