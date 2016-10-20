define(['system/core/game'], function (game) {

	var debugFrame;
	var debugHtml;

	debug.init = function() {
		debugFrame = document.getElementById('debug');

		buildStructure();
		//console.log();

	}

	var buildStructure = function()
	{
		debugHtml = "";
		var entity = game.scene;
		log(entity);
		loopEntities(entity);
		debugHtml = "<div id=\"debugContainer\">" + debugHtml + "</div>";
		debugFrame.innerHTML = debugHtml;
	}

	var loopEntities = function(obj)
	{
		debugHtml += "<div class=\"layer\">";
		for (var i = 0; i < obj.entities.length; i++) {
			var entity = obj.entities[i];
			log(entity);
			loopEntities(entity);
		}
		debugHtml += "</div>";
	}

	var log = function(obj)
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

		debugHtml += html;
	}

	return debug;
});