define(['system/lib/entity', 'system/geo/vector2', 'system/entity/text', 'system/entity/rect', 'system/entity/image', 'system/entity/poly'],
		function(Entity, Vector2, TextEntity, RectEntity, ImageEntity, PolyEntity) {
			function Button(pos, callback) {
				Entity.call(this, pos);
				this.onClick = function(p) {
					if(this.visible)
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

			Button.prototype.text = function(text, font, w, h, fontSize) {
				this.size.x = Math.max(w||0, this.size.x);
				this.size.y = Math.max(h||0, this.size.y);

				var self = this;
				var txt = new TextEntity(new Vector2(this.size.x/2, this.size.y/2), text, font, fontSize);

				txt.hover = function() { return self.hover(); };
				this.setText = function(s) { txt.text = s };

				this.add(txt);
				return this;
			};

			Button.prototype.img = function(src, scale) {
				var img = new ImageEntity(Zero(), src, scale);
				this.size.x = Math.max(img.size.x, this.size.x);
				this.size.y = Math.max(img.size.y, this.size.y);
				this.add(img);
				return this;
			};

			Button.prototype.rect = function(w, h, color) {
				var self = this;
				var rect = new RectEntity(Zero(), new Vector2(w,h), color);

				rect.hover = function() { return self.hover(); };

				this.size.x = Math.max(w, this.size.x);
				this.size.y = Math.max(h, this.size.y);
				this.add(rect);
				return this;
			};

			Button.prototype.poly = function(vector_list, color) {
				var self = this;
				var poly = new PolyEntity(Zero(), vector_list, color);

				poly.hover = function() { return self.hover(); };

				this.size.x = Math.max(poly.size.x, this.size.x);
				this.size.y = Math.max(poly.size.y, this.size.y);

				this.add(poly);
				return this;
			};

			return Button;
		}
);
