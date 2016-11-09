define(['system/lib/entity', 'system/core/graphic', 'system/geo/vector2', 'system/lib/colorconverter'],
		function (Entity, graphics, Vector2, ColorConverter) {
			function Animation( img, pos, frames, speed, loop, division, offset) {
				if(division == undefined)
				{
					this.frames = typeof frames == 'number' ? new Vector2(frames, 1) : frames;
					this.division = this.frames;
				}
				else 
				{
					this.frames = typeof frames == 'number' ? new Vector2(frames, 1) : frames;
					this.division = typeof division == 'number' ? new Vector2(division, 1) : division;
				}
				this.offset = (offset == undefined) ? new Vector2(0, 0) : (typeof offset == 'number') ? new Vector2(offset, 0) : offset;

				this.img = graphics[img];
				this.loop = loop;
				this.destroyAfterLoop = true;

				this.duration = speed;
				this.anitime = 0;
				this.frame = 0;
				this.state = 0;
				this.isAnimating = true;

				this.recolor = false;
				this.recolorValue = 0;

				Entity.call(this, pos, new Vector2(this.img.width / this.division.x, this.img.height / this.division.y ));
			}

			Animation.prototype = new Entity();
			Animation.prototype.constructor = Animation;

			Animation.prototype.onUpdate = function(delta) {
				if(!this.visible)
					return;
				if(!this.isAnimating)
					return;
			console.log(this);

				this.anitime += delta;
				var frameNew = Math.floor(this.anitime / this.duration);

				if(frameNew >= this.frames.x && !this.loop)
				{
					if(this.destroyAfterLoop)
						this.parent.remove(this);
					else
						this.isAnimating = false;
				}
				else 
				{
					this.frame = frameNew;
					this.frame %= this.frames.x;
					this.anitime %= this.frames.x*this.duration;
				}

			};

			Animation.prototype.onDraw = function(ctx) {

				var x1 = -this.pivotPosition.x * this.size.x * this.scale.x;
				var y1 = -this.pivotPosition.y * this.size.y * this.scale.y;
				var x2 = this.size.x * this.scale.x | 0;
				var y2 = this.size.y * this.scale.y | 0;

				ctx.drawImage(
					this.img,
					this.frame * this.size.x + this.offset.x * this.size.x,
					this.state * this.size.y + this.offset.y * this.size.y,
					this.size.x,
					this.size.y,
					x1,
					y1,
					x2,
					y2
				);

				if(this.recolor) 
				{
					var pos = this.getAbsolutePos();
					ColorConverter.recolor(ctx, pos, x1, y1, x2, y2, this.recolorValue);
				}
			};

			Animation.prototype.convertColor = function(recolorValue) {
				this.recolor = true;
				this.recolorValue = recolorValue;
			};

			return Animation;
		}
);