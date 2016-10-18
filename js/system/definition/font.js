define(function() {
	function FontStyle(size, color, type, hover) {
		this.size = size;
		this.color = color || 'black';
		this.type = type || 'sans-serif';
		this.hover = hover;

		this.align = 'center';
		this.base = 'middle';
	}

	FontStyle.prototype.apply = function(ctx, hover, fontSize) {
		ctx.textAlign = this.align;
		ctx.textBaseline = this.base;
		var size = fontSize || this.size;
		ctx.font = size + 'px ' + this.type;
		ctx.fillStyle = hover && this.hover ? this.hover : this.color;
	};

	return FontStyle;
});