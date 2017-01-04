define(['system/lib/transition'],
		function(TransitionScene) {

			function DarkfadeTransition(toScene, duration, easing) {
				TransitionScene.call(this, toScene, duration, easing);
			}

			DarkfadeTransition.prototype = new TransitionScene();
			DarkfadeTransition.prototype.constructor = DarkfadeTransition;
			
			DarkfadeTransition.prototype.performTransition = function(ctx) {
				// Dark base
				ctx.fillStyle = "#000000";
				ctx.fillRect(0, 0, this.size.x, this.size.y);
				
				// added delation of 1 frame
				var opacity = -0.3 + this.progress * 1.3;
				if(opacity < 0)
					opacity = 0;
				ctx.globalAlpha = opacity;
				ctx.drawImage(this.toBuffer.buffer, 0, 0);
			}
						
			return DarkfadeTransition;
			
		}
);