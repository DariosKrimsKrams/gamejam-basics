define(['game/config/config', 'game/config/screen', 'game/config/fonts', 'system/geo/vector2'],
	function(config, screen, fonts, Vector2) {
		window.requestAnimFrame = (function(){
			return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback, element ){window.setTimeout(callback, 25);};
		})();

		return {
			frames: 0,
			fps: 25,
			drawCount: 0,
			drawCountLast: 0,

			scene: null,
			lastUpdate: 0,

			display: null,
			displayCtx: null,
			buffer: null,
			bufferCtx: null,

			scale: new Vector2(1, 1),
			scaleInternal: new Vector2(1, 1),
			currentlyPortrait: false,
			offset: new Vector2(0, 0),
			sceneScale: 1,

			resize: function() {

				if(screen.currentScaleType == ScaleType.TO_FULLSCREEN || screen.currentScaleType == ScaleType.WITH_ROTATION) {
					this.updateScale();
				}
				else if(screen.currentScaleType == ScaleType.SAME_ASPECT_RATIO) {

					var fw = window.innerWidth / screen.w;
					var fh = window.innerHeight / screen.h;
					var min = Math.min(fw, fh);
					this.scale.x = min;
					this.scale.y = min;

					this.scaleInternal.x = min;
					this.scaleInternal.y = min;

					this.display.width = screen.w * this.scale.x;
					this.display.height = screen.h * this.scale.y;
					this.buffer.width = screen.w * this.scale.x;
					this.buffer.height = screen.h * this.scale.y;

					this.onUpdateScreenSizes();
				}


				if(screen.currentScaleType == ScaleType.WITH_ROTATION && this.currentlyPortrait) {
					this.scale = new Vector2(1, 1);
				} else if(screen.currentScaleType == ScaleType.TO_FULLSCREEN || screen.currentScaleType == ScaleType.WITH_ROTATION) {

				}

			},

			init: function(scene) {

				screen.w = screen.wViewport;
				screen.h = screen.hViewport;
					
				this.display = document.getElementById('gameframe');
				this.displayCtx = this.display.getContext('2d');

				this.scene = scene;

				this.buffer = document.createElement('canvas');
				this.bufferCtx = this.buffer.getContext('2d');

				if(screen.currentScaleType != ScaleType.NONE) {
					this.resize();
				} else {
					this.onUpdateScreenSizes();
				}

				var self = this;
				if( config.debug )
					setInterval( function() { self.updateFramerate(); }, 1000 );
				if(screen.currentScaleType != ScaleType.NONE)
					window.onresize = function() { self.resize(); };

				this.lastUpdate = Date.now();
				this.loop();
			},

			updateFramerate: function() {
				this.fps = this.frames;
				this.frames = 0;
				this.drawCountLast = this.drawCount;
				this.drawCount = 0;
			},

			loop: function() {
				var now = Date.now();
				var delta = now - this.lastUpdate;

				if( delta < 250 && this.scene ) {	
					this.update( delta );
					this.draw();
				}

				this.lastUpdate = now;
				this.frames++;

				var self = this;
				requestAnimFrame( function() { self.loop(); });
			},

			update: function( delta ) {
				this.scene.update( delta );
			},

			draw: function() {

				this.bufferCtx.fillStyle="transparent";
				this.displayCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);
				this.bufferCtx.clearRect(0, 0, this.buffer.width, this.buffer.height);

				this.scene.draw( this.bufferCtx );

				this.displayCtx.drawImage( this.buffer, 0, 0, this.buffer.width, this.buffer.height );

				if( config.debug ) {
					fonts.frames.apply(this.displayCtx);
					this.displayCtx.fillText("FPS: " + this.fps, 65, 15);
					this.displayCtx.fillText("Draws/Sec: " + this.drawCountLast, 65, 35);
					this.displayCtx.fillText("Draws/Frame: " + Math.round(this.drawCountLast / this.fps), 65, 55);
				}
			},

			updateScale: function() {

				var width = window.innerWidth;
				var height = window.innerHeight;

				if(screen.currentScaleType == ScaleType.WITH_ROTATION && this.currentlyPortrait) {
					var tmpWidth = width;
					width = height;
					height = tmpWidth;
				}

				if(screen.w != width || screen.h != height)
				{
					// check ascept radio -> Portrait or Landscape
					if(screen.currentScaleType == ScaleType.WITH_ROTATION) {
						if(width < height && !this.currentlyPortrait) {

							this.currentlyPortrait = true;
							this.display.style.transform = "rotate(90deg)";
							var tmpWidth = width;
							width = height;
							height = tmpWidth;
						} else if(width <= height && this.currentlyPortrait) { // switched >= to <
							this.currentlyPortrait = false;
							this.display.style.transform = "rotate(0deg)";
							var tmpWidth = width;
							width = height;
							height = tmpWidth;
						}
					}

					if(this.currentlyPortrait) {
						var pivot = height / 2;
						this.display.style.transformOrigin = pivot + "px "+pivot+"px 0";
					}

					var fw = width / screen.w;
					var fh = height / screen.h;
					var min = Math.min(fw, fh);
					this.scale.x = min;
					this.scale.y = min;

					this.scaleInternal.x = fw;
					this.scaleInternal.y = fh;

					this.display.width = screen.w * fw;
					this.display.height = screen.h * fh;
					this.buffer.width = screen.w * fw;
					this.buffer.height = screen.h * fh;

					// if screen.w/h changed -> update screen
					this.onUpdateScreenSizes(width, height);

				}

			},

			onUpdateScreenSizes: function(min, height) {

				// update scene size
				if(this.scene != undefined)
					this.scene.setSize(screen.w, screen.h);

				// calculation
				var x = (screen.w - screen.wViewport) / 2;
				var y = (screen.h - screen.hViewport) / 2;
				var scaleX = this.scaleInternal.x;
				var scaleY = this.scaleInternal.y;
				var scale = Math.min(scaleX, scaleY);
				var addPosX = 0;
				var addPosY = 0;

				// get additional Position offset
				if(scaleY < scaleX) {
					addPosX = x + (screen.wViewport * scaleX - (screen.wViewport * scaleY)) / 2;
				} else {
					addPosY = y + (screen.hViewport * scaleY - (screen.hViewport * scaleX)) / 2;
				}

				// save variables
				this.offset.x = addPosX;
				this.offset.y = addPosY;
				this.sceneScale = scale;

				// set scene
				this.scene.resize();
				//this.scene.position = new Vector2(addPosX, addPosY);
				//this.scene.scale = new Vector2(scale, scale);

				// update background
				if(this.scene.background != undefined)
					this.scene.background.setToFullscreenCutOff();

			}



		};
});