define(['system/geo/vector2'],
function(Vector2) {
	return {
		between: function(min, max) {
			return function() {
				return Math.random() * (max-min) + min;
			};
		},

		vector: function(x, y) {
			return function() {
				return new Vector2(
						typeof x == 'function' ? x() : x,
						typeof y == 'function' ? y() : y
				);
			}
		}
	};
});