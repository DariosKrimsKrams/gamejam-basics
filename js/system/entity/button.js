define(['system/lib/entity', 'system/geo/vector2', 'system/entity/text', 'system/entity/rect', 'system/entity/image', 'system/entity/poly'],
		function(Entity, Vector2, TextEntity, RectEntity, ImageEntity, PolyEntity) {
			function Button(pos, callback) {
				Entity.call(this, pos);
				this.onClick = function(p) {
					if(this.visible && this.clickable)
						callback(p);
					return this.visible;
				}
			}

			Button.prototype = new Entity();
			Button.prototype.constructor = Button;

			Button.prototype.onMouseDown = function() {
				return true;
			};

			Button.create = function(pos, callback) {
				return new Button(pos, callback);
			};

			Button.prototype.text = function(text, font, w, h, fontSize, offset) {
				this.size.x = Math.max(w||0, this.size.x);
				this.size.y = Math.max(h||0, this.size.y);

				var pos = new Vector2(this.size.x/2, this.size.y/2);
				if(offset !== undefined) {
					pos.x += offset.x;
					pos.y += offset.y;
				}
				var self = this;
				this.text = new TextEntity(pos, text, font, fontSize);

				this.text.hover = function() { return self.hover(); };
				this.setText = function(s) { this.text.text = s };

				this.add(this.text);
				return this;
			};

			Button.prototype.img = function(src, scale) {
				this.img = new ImageEntity(Zero(), src, scale);
				
				this.size.x = Math.max(this.img.size.x * this.img.scale.x, this.size.x * this.scale.x);
				this.size.y = Math.max(this.img.size.y * this.img.scale.y, this.size.y * this.scale.y);
				
				this.add(this.img);
				return this;
			};

			Button.prototype.rect = function(w, h, color) {
				var self = this;
				this.rect = new RectEntity(Zero(), new Vector2(w,h), color);

				this.rect.hover = function() { return self.hover(); };

				this.size.x = Math.max(w, this.size.x);
				this.size.y = Math.max(h, this.size.y);
				this.add(this.rect);
				return this;
			};

			Button.prototype.poly = function(vector_list, color) {
				var self = this;
				this.poly = new PolyEntity(Zero(), vector_list, color);

				this.poly.hover = function() { return self.hover(); };

				this.size.x = Math.max(this.poly.size.x, this.size.x);
				this.size.y = Math.max(this.poly.size.y, this.size.y);

				this.add(this.poly);
				return this;
			};

			Button.prototype.polyRounded = function(size, color, rounded) {
				var self = this;
				this.size = size;

				//this.poly = new PolyEntity(Zero(), vector_list, color);
				this.poly = PolyEntity.CreateRounded(Zero(), this.size, rounded, rounded, rounded, rounded, color);

				this.poly.hover = function() { return self.hover(); };

				this.size.x = Math.max(this.poly.size.x, this.size.x);
				this.size.y = Math.max(this.poly.size.y, this.size.y);

				this.add(this.poly);
				return this;
			};

			Button.prototype.setVisible = function(status) {
				this.visible = status;
				if(this.img !== undefined)
					this.img.visible = status;
				if(this.text !== undefined)
					this.text.visible = status;
				if(this.poly !== undefined)
					this.poly.visible = status;
				if(this.rect !== undefined)
					this.rect.visible = status;
			};

			return Button;
		}
);
