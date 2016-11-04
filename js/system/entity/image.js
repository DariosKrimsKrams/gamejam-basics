define(['system/core/graphic', 'system/geo/vector2', 'system/lib/entity', 'system/lib/colorconverter'],
		function(graphics, Vector2, Entity, ColorConverter) {
			function ImageEntity(pos, src, scale) {
				this.img = graphics[src];
				Entity.call(this, pos, new Vector2(this.img.width, this.img.height));
				this.scale = scale || new Vector2(1, 1);

				this.recolor = false;
				this.recolorValue = 0;

			}

			ImageEntity.prototype = new Entity();
			ImageEntity.prototype.constructor = ImageEntity;

			ImageEntity.prototype.onDraw = function(ctx) {



				if(this.size.x >= 1 && this.size.y >= 1)
				{
					var x1 = -this.pivotPosition.x * this.size.x * this.scale.x;
					var y1 = -this.pivotPosition.y * this.size.y * this.scale.y;
					var x2 = this.size.x * this.scale.x | 0;
					var y2 = this.size.y * this.scale.y | 0;

					ctx.drawImage(
						this.img,
						0,
						0,
						this.size.x | 0,
						this.size.y | 0,
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
				}

				
			};

			ImageEntity.prototype.convertColor = function(recolorValue) {
				this.recolor = true;
				this.recolorValue = recolorValue;
			};

			return ImageEntity;
		}
);
