define(['system/lib/entity', 'game/config/colors'],
	function(Entity, colors) {
		function RectEntity(pos, size, color) {
			Entity.call(this, pos, size);
			this.color = color || colors.default;
			this.isFill = true;
			this.isStroke = true;
		}

		RectEntity.prototype = new Entity();
		RectEntity.prototype.constructor = RectEntity;

		RectEntity.prototype.onDraw = function(ctx) {
			this.color.apply(ctx, this.hover());
			if(this.isFill)
				ctx.fillRect(0, 0, this.size.x | 0, this.size.y | 0);
			if(this.isStroke)
				ctx.strokeRect(0, 0, this.size.x | 0, this.size.y | 0);
		};

		return RectEntity;
	}
);