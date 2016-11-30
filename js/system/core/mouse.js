define(['system/geo/vector2', 'system/core/game', 'game/config/config', 'system/core/game'], function(Vector2, game, config, game) {
	var mouse = new Vector2( 0, 0 );

	mouse.init = function () {
		var self = this;
		var gameframe = document.getElementById('gameframe');
		var primaryTouchId = null;
		var showCursor = false;

		var getPrimaryTouch = function (touches) {
			for (var i = 0, j = touches.length; i < j; i++) {
				if (touches[i].identifier == primaryTouchId) {
					return touches[i];
				}
			}
			return null;
		};

		gameframe.onmousemove = function (ev) {

			var mouseX = ev.clientX;
			var mouseY = ev.clientY;
			var scale = 1;

			// check if portrait mode
			if(game.currentlyPortrait)
			{
				mouseX = ev.clientY;
				mouseY = gameframe.height - ev.clientX;
				scale = Math.min(game.scaleInternal.x, game.scaleInternal.y);
			}

			self.x = (mouseX - gameframe.offsetLeft ) / game.scale.x / scale;
			self.y = (mouseY - gameframe.offsetTop ) / game.scale.y / scale;

			var result = checkCursorPointer();
			setPointer(result);
		};

		// check for mouse over clickable object -> show cursor
		var checkCursorPointer = function()
		{
			var result = false;
			result = checkEntityVsMouse(game.scene);
			if(result)
				return true;
			return loopEntities(game.scene);
		}

		// (1) get currently visible objects and get their entities
		var loopEntities = function(obj)
		{
			var result = false;
			for (var i = 0; i < obj.entities.length; i++) {
				var entity = obj.entities[i];
				if(!entity.visible)
					continue;
				result = checkEntityVsMouse(entity);
				if(result)
					return true;
				result = loopEntities(entity);
				if(result)
					return true;
			}
			return result;
		}

		// (2) check entites has onClick method
		var checkEntityVsMouse = function(obj) {

			// check if obj has click method
			if(obj.onClick != undefined)
			{
				// check size inside
				if(obj.mouseInArea())
				{
					// flag as setPointer = true
					return true;
				}
			}
			return false;
		}

		gameframe.onclick = function (ev) {
			if(self.x == 0 && self.y == 0)
				this.onmousemove(ev);

			if (game.scene.click)
				game.scene.click(self);
		};

		gameframe.onmousedown = function (ev) {
			if (game.scene.mousedown)
				game.scene.mousedown(self);
		};

		gameframe.onmouseup = function (ev) {
			if (game.scene.mouseup)
				game.scene.mouseup(self);
		};

		/* Support for mobile devices */
		gameframe.ontouchstart = function (ev) {
			ev.preventDefault();
			if (primaryTouchId != null) return;

			this.onmousemove(ev.touches[0]);
			this.onmousedown(ev.touches[0]);
			primaryTouchId = ev.changedTouches[0].identifier;
		};

		gameframe.ontouchmove = function (ev) {
			var touch = getPrimaryTouch(ev.touches);
			ev.preventDefault();

			if (touch == null) return;
			this.onmousemove(touch);
		};

		gameframe.ontouchend = function (ev) {
			var touch = getPrimaryTouch(ev.changedTouches);
			ev.preventDefault();
			if (touch == null) return;

			this.onmouseup(touch);
			this.onclick(touch);
			primaryTouchId = null;

			self.x = -1;
			self.y = -1;
		};

		/* Support for mouse leaving the game */
		gameframe.onmouseout = function (ev) {
			gameframe.onmouseup(ev);
		};

		var setPointer = function(status) {
			if(showCursor == status)
				return;

			if (status && game.scene.mouseover)
				game.scene.mouseover(self);
			if (!status && game.scene.mouseout)
				game.scene.mouseout(self);
			
			var cursor = status ? "pointer" : "inherit";
			showCursor = status;
			this.gameframe.style.cursor = cursor;
		}

	};

	if (!config.debug) {
		document.addEventListener("contextmenu", function (e) {
			e.preventDefault();
		}, false);
	}

	return mouse;
});
