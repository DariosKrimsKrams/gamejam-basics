define(['game/config/config'], function(Config) {
	return {
		
		sampels: [],
		urls: [],

		play: function( file, loop, volume ) {
			var self = this;

			if(!Config.isMusicOn)
				return;

			if(loop === undefined)
				loop = false;
			if(volume === undefined)
				volume = 1;

			if( !this.sampels[file] )
				this.sampels[file] = [];

			if( this.sampels[file].length ) {
				var sample = this.sampels[file].pop();
				if(loop === true) {
					sample.ontimeupdate = function(i) {
						if((this.currentTime / this.duration) > 0.6){
							this.currentTime = 0;
							this.play();
						}
					};
				}
				sample.volume = volume;
				sample.play();
				return sample;
			} else {
				var sample = new Audio( file );
				sample.onended = function() { self.sampels[file].push( this ); };
				if(loop === true) {
					sample.ontimeupdate = function(i) {
						if((this.currentTime / this.duration) > 0.6){
							this.currentTime = 0;
							this.play();
						}
					};
				}
				sample.volume = volume;
				sample.play();
				return sample;
			}
		},

		add: function(url) {
			if(typeof(iOS) == 'undefined')
				iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
			if(iOS)
				return;
			this.urls.push(url);
		},

		pause: function(sample) {
			sample.pause();
		},

		playAgain: function(sample) {
			if(!Config.isMusicOn)
				return;
			sample.play();
		},

		load: function( callback ) {
			var total = 0, loaded = 0;

			function complete() {
				if( ++loaded >= total && callback ) callback();
			}

			while( this.urls.length ) {
				var url = this.urls.shift();
				if( typeof this[url] == 'undefined' ) {
					total++;

					var sample = new Audio(url);
					sample.oncanplaythrough = complete;
					this.sampels[url] = [sample];
				}
			}

			if( total == 0 && callback ) callback();
		}
	}
});