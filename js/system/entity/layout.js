define(['system/lib/entity'],
		function(Entity) {
			function Layout(pos, margin, spacing) {
				Entity.call(this, pos);
				this.margin = margin || 0;
				this.spacing = spacing || 0;
			}

			Layout.prototype = new Entity();
			Layout.prototype.constructor = Layout;

			Layout.prototype.adjustFixed = function(axis, entity) {
				entity.position[axis] = this.margin;
				var tmp;
				if(axis == "x")
					tmp = entity.size[axis] * entity.scale.x + (2 * this.margin);
				else
					tmp = entity.size[axis] * entity.scale.y + (2 * this.margin);
				if(this.size[axis] < tmp)
					this.size[axis] = tmp;
			};

			Layout.prototype.adjustFlexible = function(axis, entity) {
				var p = this.margin + this.entities.length * this.spacing;
				for(var i in this.entities )
				{
					if(axis == "x")
						p += this.entities[i].size[axis] * this.entities[i].scale.x || 0;
					else
						p += this.entities[i].size[axis] * this.entities[i].scale.y || 0;
				}
				entity.position[axis] = p;
				if(axis == "x")
					this.size[axis] = entity.position[axis] + entity.size[axis] * entity.scale.x + this.margin;
				else
					this.size[axis] = entity.position[axis] + entity.size[axis] * entity.scale.y + this.margin;
			};

			Layout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if(orientation == "center") {
						e.position.x = ( this.size.x - e.size.x ) / 2;
					} else if( orientation == "right") {
						e.position.x = this.size.x - e.size.x - this.margin;
					} else if( orientation == "middle") {
						e.position.y = ( this.size.y - e.size.y ) / 2;
					} else if( orientation == "bottom") {
						e.position.y = this.size.y - e.size.y - this.margin;
					}
				}
			};

			/*
			 * Vector2 pos
			 * int margin
			 * int spacing
			 */
			function VerticalLayout(pos, margin, spacing) {
				Layout.call(this, pos, margin, spacing);
			}

			VerticalLayout.prototype = new Layout();
			VerticalLayout.prototype.constructor = VerticalLayout;

			VerticalLayout.prototype.add = function(e) {
				this.adjustFixed('x', e);
				this.adjustFlexible('y', e);
				Entity.prototype.add.call(this, e);
			};

			VerticalLayout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if(orientation == "center") {
						e.position.x = ( this.size.x - e.size.x ) / 2;
					} else if( orientation == "right") {
						e.position.x = this.size.x - e.size.x - this.margin;
					}
				}
			};

			/*
			 * Vector2 pos
			 * int margin
			 * int spacing
			 */
			function HorizontalLayout(pos, margin, spacing) {
				Layout.call(this, pos, margin, spacing);
			}

			HorizontalLayout.prototype = new Layout();
			HorizontalLayout.prototype.constructor = HorizontalLayout;

			HorizontalLayout.prototype.add = function(e) {
				this.adjustFixed("y", e);
				this.adjustFlexible("x", e);
				Entity.prototype.add.call(this, e);
			};

			HorizontalLayout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if( orientation == "center") {
						e.position.y = ( this.size.y - e.size.y ) / 2;
					} else if( orientation == "bottom") {
						e.position.y = this.size.y - e.size.y - this.margin;
					}
				}
			};

			return {
				vertical: VerticalLayout,
				horizontal: HorizontalLayout
			};
		}
);
