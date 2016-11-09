define(['system/core/game'], function(game) {
	return {

		init: function() {

			var self = this;
			this.debugHtml = "";
			this.debugFrame;

			var gameFrame = document.getElementById('gameframe');
			//debugFrame = gameFrame.parentNode.insertBefore(newNode, gameFrame.nextSibling);
			gameFrame.insertAdjacentHTML('afterEnd', "<div id=\"debug\"></div>")
			this.debugFrame = document.getElementById('debug');

			setInterval( function() { self.buildStructure(); }, 1000 );

		},

		buildStructure: function() {
			this.debugHtml = "";
			var entity = game.scene;
			this.log(entity);
			this.loopEntities(entity);
			this.debugHtml = "<div id=\"debugContainer\">" + this.debugHtml + "</div>";
			this.debugFrame.innerHTML = this.debugHtml;
		},

		loopEntities: function(obj)
		{
			this.debugHtml += "<div class=\"layer\">";
			for (var i = 0; i < obj.entities.length; i++) {
				var entity = obj.entities[i];
				this.log(entity);
				this.loopEntities(entity);
			}
			this.debugHtml += "</div>";
		},

		log: function(obj)
		{
			var html = ""
			html += "<span class=\"entry\">";
			html += "" + obj.constructor.name;
				html += "<div class=\"infos\"><ul><b>Properties:</b>";
				var infos = Object.getOwnPropertyNames(obj);
				for (var i = 0; i < infos.length; i++) {
					html += "<li>" + infos[i] + "</li>";
				}
				html += "</ul></div>";
			html += "</span>";

			this.debugHtml += html;
		}

	}

});