define(['system/lib/entity', 'system/geo/circle', 'game/config/colors', 'system/geo/vector2', 'game/config/config'],
		function(Entity, Circle, colors, Vector2, config) {
			function CircleEntity(pos, radius, color) {
				this.color = color || colors.default;
				this.circle = new Circle(new Vector2(radius, radius), radius);
				this.isFill = true;
				this.isStroke = true;

				// Be careful that a rectangle of 0, 0, size.x, size.y does not surround the polygon!
				// See PolyEntity.clearOffset()
				Entity.call(this, pos, new Vector2(radius * 2, radius * 2));
			}

			CircleEntity.prototype = new Entity();
			CircleEntity.prototype.constructor = CircleEntity;

			CircleEntity.prototype.onDraw = function(ctx) {
				this.color.apply(ctx, this.hover());

				ctx.beginPath();


				ctx.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, 0, 2*Math.PI);
				//ctx.arc(100,75,50,0,2*Math.PI);

				//var first = true;
				/*for ( var i = 0; i < this.circle.points.length; i++ ) {
					var point = this.poly.points[i];
					if (first) {
						ctx.moveTo(point.x, point.y);
						first = false;
					} else {
						ctx.lineTo(point.x, point.y);
					}
				}*/
				//ctx.closePath();

				if(this.isFill)
					ctx.fill();
				if(this.isStroke)
					ctx.stroke();

				// draws the surrounding rectangle of the polygon and the entity's position (red dot)
				if (config.debug) {
					//var offset = this.poly.getOffset();
					ctx.strokeRect(this.center.x - this.radius, this.center.y - this.radius, this.size.x, this.size.y);
					ctx.fillStyle = '#ff0000';
					ctx.fillRect(-1, -1, 3, 3);
				}
			};

			CircleEntity.prototype.hover = function() {
				return this.circle.inside(this.relativeMouse());
			};

			// Ensures that the entity's 1st position is equal to the the polygon surrounding rectangle's upper left corner
			// ### Will move the entity!
			/*CircleEntity.prototype.clearOffset = function() {
				var offset = this.poly.getOffset();
				this.poly.move(offset.inverse());
				this.position.add(offset);
			};*/

			return CircleEntity;
		}
);