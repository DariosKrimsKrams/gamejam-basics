define(['system/lib/scene', 'system/entity/button', 'system/core/game', 'system/geo/vector2', 'system/transitions/slideinright', 'system/lib/morph', 'system/definition/easing', 'system/entity/layout'],
	function(Scene, Button, game, Vector2, SlideInRightTransition, Morph, Easing, Layout) {
		function MenuScene() {

			var playButton = Button.create(new Vector2(0, 680), function() { game.scene = require('game/config/scenes').play; }).rect(280, 80).text("Play".toLocaleString());
			var creditsButton = Button.create(new Vector2(0, 680), function() { game.scene = new SlideInRightTransition(require('game/config/scenes').credits, 1000, Easing.OUTQUAD); }).rect(360, 80).text("Credits");
			var helpButton = Button.create(new Vector2(0, 680), function() { game.scene = require('game/config/scenes').help; }).rect(300, 80).text("Help");
			var particlesButton = Button.create(new Vector2(0, 680), function() { game.scene = require('game/config/scenes').particles; }).rect(300, 80).text("Particles");

			var vLayout = new Layout.vertical(new Vector2(0, 100), 20, 50);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.add(helpButton);
			vLayout.add(particlesButton);
			vLayout.align("center");
			this.center(vLayout);

			//var easing = Easing.OUTELASTIC;
			//var self = this;

			//playButton.add(new Morph({ position: { y: 100 } }, 1500, easing));
			//creditsButton.add(new Morph({ position: { y: 250 } }, 1500, easing));
			//helpButton.add(new Morph({ position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();
		MenuScene.prototype.constructor = MenuScene;

		return MenuScene;
	}
);
