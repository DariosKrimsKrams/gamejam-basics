define(['system/entity/scene', 'system/lib/entity', 'system/core/game', 'system/lib/morph', 'game/config/screen', 'system/core/game'],
		function(Scene, Entity, game, Morph, Screen, Game) {

			function TransitionScene(toScene, duration, easing) {
				Scene.call(this);

				if(toScene === undefined)
					return;
				
				if(game.scene) {
					this.add(this.fromScene = game.scene);
				}

				if(toScene) {
					this.add(this.toScene = toScene);
					this.toScene.resize();
				}

				this.size.x = window.innerWidth;
				this.size.y = window.innerHeight;

				// change size if portrait
				if(Game.currentlyPortrait) {
					var tmp = this.size.x;
					this.size.x = this.size.y;
					this.size.y = tmp;
				}
						
				this.fromBuffer = this.createBuffer();
				this.toBuffer = this.createBuffer();
				
				this.progress = 0;
				this.add(new Morph({progress: 1}, duration, easing, this.endTransition.bind(this)));
			}

			TransitionScene.prototype = new Scene();
			TransitionScene.prototype.constructor = TransitionScene;
			
			TransitionScene.prototype.createBuffer = function() {
				var buffer = document.createElement('canvas');
				buffer.width = this.size.x;
				buffer.height = this.size.y;
				var ctx = buffer.getContext('2d');
				return { buffer: buffer, ctx: ctx };
			};
			
			TransitionScene.prototype.draw = function (ctx) {
				ctx.save();
				
				this.fromScene.draw(this.fromBuffer.ctx);
				this.toScene.draw(this.toBuffer.ctx);
				this.performTransition(ctx);

				ctx.restore();
			};
			
			TransitionScene.prototype.endTransition = function() {
				game.setScene(this.toScene);
				this.toScene.sceneLoaded();
			};
			
			TransitionScene.prototype.performTransition = function(ctx) {
				// override in derived functions
				ctx.drawImage(this.toBuffer.buffer, 0, 0);
			};
						
			TransitionScene.prototype.click = function (pos) {
				this.toScene.click(pos);
			};

			TransitionScene.prototype.mousedown = function (pos) {
				this.toScene.mousedown(pos);
			};
		
			TransitionScene.prototype.mouseup = function (pos) {
				this.toScene.mouseup(pos);
			};
		
			TransitionScene.prototype.resize = function () {
				this.toScene.resize();
			};
			
			return TransitionScene;
			
		}
);