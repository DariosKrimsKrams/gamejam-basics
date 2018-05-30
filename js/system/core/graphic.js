define(['system/lib/colorconverter', 'game/config/config', 'game/config/gameplay'], function(ColorConverter, Config, GameplayConfig) {
	return {
		urls: [],

		// recolorVal = 0=nothing, 1=blue, 2=red, 3=green, 4=auto
		add: function( url, recolorVal ) {
			if(recolorVal === undefined)
				recolorVal = 0;
			// TODO check urls not already contains url
			this.urls.push( url + recolorVal );
		},

		load: function( callback ) {
			var total = 0, loaded = 0;

			function complete() {
				//console.log("complete " + url);

				var recolorVal = this.recolorVal;
				if(recolorVal === 4) {
					// set recolorVal
					if(GameplayConfig.activePlayerIndex >= 1) // 1 or 2
						recolorVal = GameplayConfig.activePlayerIndex + 1;
					else
						recolorVal = 1;
				}

				if(recolorVal >= 2) {
					ColorConverter.init();
					var colorCode = recolorVal == 2 ? Config.colorConvert2Red : Config.colorConvert2Green;
					if(recolorVal == 2 && (this.url == 'img/hold_goalkeeper_idle.png4' || this.url == 'img/hold_goalkeeper_jump.png4' || this.url == 'img/hold_goalkeeper_block.png4'))
						colorCode = Config.colorConvert2RedHold;
					ColorConverter.doRecolorImage(this, colorCode);
				}

				if( ++loaded >= total ) {
					//console.log("all graphics loaded");
					callback();
				}
			}

			while( this.urls.length ) {
				var url = this.urls.shift();
				//console.log(url, this[url]);

				var recolorVal = parseInt(url.substr(url.length - 1));
				var url2 = url.substr(0, url.length - 1);
				if(recolorVal === 0) {
					url = url2;
				}

				if( this[url] === undefined ) {
					//console.log("load " + url);
					total++;
					this[url] = new Image();
					this[url].url = url;
					this[url].recolorVal = recolorVal;
					this[url].onload = complete;
					this[url].src = url2;
				}
			}

			if(total == 0)
				callback();
		}
	};
});
