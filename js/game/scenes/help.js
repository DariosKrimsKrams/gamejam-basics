define(['system/entity/scene', 'game/entity/back'],
		function(Scene, BackButton) {

			function HelpScene() {
				this.center(BackButton('menu'));
			}

			HelpScene.prototype = new Scene();
			HelpScene.prototype.constructor = HelpScene;

			return HelpScene;
		}
);