define(['system/lib/entity', 'system/geo/poly', 'game/config/colors', 'system/geo/vector2', 'game/config/config'],
		function(Entity, Poly, colors, Vector2, config) {
			function PolyEntity(pos, vector_list, color) {
				this.color = color || colors.default;
				this.poly = new Poly(vector_list);
				this.isFill = true;
				this.isStroke = true;

				// Be careful that a rectangle of 0, 0, size.x, size.y does not surround the polygon!
				// See PolyEntity.clearOffset()
				Entity.call(this, pos, this.poly.getSize());
			}

			PolyEntity.prototype = new Entity();
			PolyEntity.prototype.constructor = PolyEntity;

			PolyEntity.prototype.onDraw = function(ctx) {
				this.color.apply(ctx, this.hover());

				ctx.beginPath();

				var first = true;
				for ( var i = 0; i < this.poly.points.length; i++ ) {
					var point = this.poly.points[i];
					if (first) {
						ctx.moveTo(point.x, point.y);
						first = false;
					} else {
						ctx.lineTo(point.x, point.y);
					}
				}

				ctx.closePath();

				if(this.isFill)
					ctx.fill();
				if(this.isStroke)
					ctx.stroke();

				// draws the surrounding rectangle of the polygon and the entity's position (red dot)
				if (config.debug) {
					var offset = this.poly.getOffset();
					ctx.strokeRect(offset.x, offset.y, this.size.x, this.size.y);
					ctx.fillStyle = '#ff0000';
					ctx.fillRect(-1, -1, 3, 3);
				}
			};

			PolyEntity.CreateRounded = function(pos, width, height, roundedLeftTop, roundedRightTop, roundedRightBottom, roundedLeftBottom, color) {
				var vectorList = [
									new Vector2(0, roundedLeftTop),
									new Vector2(roundedLeftTop, 0),
									new Vector2(width - roundedRightTop, 0),
									new Vector2(width, roundedRightTop),
									new Vector2(width, height - roundedRightBottom),
									new Vector2(width - roundedRightBottom, height),
									new Vector2(roundedLeftBottom, height),
									new Vector2(0, height - roundedLeftBottom)
								];
				return new PolyEntity(pos, vectorList, color);
			};

			PolyEntity.prototype.hover = function() {
				return this.poly.inside(this.relativeMouse());
			};

			// Ensures that the entity's 1st position is equal to the the polygon surrounding rectangle's upper left corner
			// ### Will move the entity!
			PolyEntity.prototype.clearOffset = function() {
				var offset = this.poly.getOffset();
				this.poly.move(offset.inverse());
				this.position.add(offset);
			};

			return PolyEntity;
		}
);