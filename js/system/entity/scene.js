define([
	'system/lib/entity',
	'system/geo/vector2',
	'system/core/graphic',
	'system/core/game',
	'game/config/screen',
	'game/config/config',
	],
		function (
			Entity,
			Vector2,
			graphics,
			game,
			screen,
			config
			) {

		    function Scene() {
				Entity.call(this, Zero(), new Vector2(screen.wViewport, screen.hViewport));
				this.keyAware = [];
			    this.bgColor = "#DDD";
				this.EntityType = "Scene";
				this.background;
				this.positionMove = Zero();
			}

			Scene.prototype = new Entity();
			Scene.prototype.constructor = Scene;

			Scene.prototype.resize = function () {
				this.position = new Vector2(game.offset.x / game.sceneScale, game.offset.y / game.sceneScale);
				this.scale = new Vector2(game.sceneScale, game.sceneScale);

				// update background
				if(this.background != undefined)
					this.background.setToFullscreenCutOff();
			};

			Scene.prototype.onDraw = function (ctx) {
				if (config.debug) {
					ctx.fillStyle = this.bgColor;
				}
				ctx.fillRect(0, 0, this.size.x, this.size.y);

				ctx.translate(this.positionMove.x | 0, this.positionMove.y | 0);

			};

			Scene.prototype.up = function (key) {
				this.dispatch(this.keyAware, 'up', key);
			};

			Scene.prototype.down = function (key) {
				this.dispatch(this.keyAware, 'down', key);
			};

			Scene.prototype.sceneLoaded = function () {
			};

			return Scene;
		}
);
