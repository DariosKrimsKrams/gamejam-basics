define(['game/scenes/menu', 'game/scenes/credits', 'game/scenes/play', 'game/scenes/help', 'game/scenes/particles'],
		function (MenuScene, CreditsScene, PlayScene, HelpScene, ParticleScene) {
			return {
				init: function () {
					this.menu = new MenuScene();
					this.credits = new CreditsScene();
					this.play = new PlayScene();
					this.help = new HelpScene();
					this.particles = new ParticleScene();
					this.default = this.menu;
				}
			};
		}
);