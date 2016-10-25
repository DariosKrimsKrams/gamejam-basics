define(function() {
	return {
		load: function (url, callback, callbackError) {
			var xmlHttp = null;

			try {
				xmlHttp = new XMLHttpRequest();
			} catch (e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
					try {
						xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (e) {
						xmlHttp = null;
					}
				}
			}

			if (xmlHttp) {
				xmlHttp.open('GET', url, true);

   				xmlHttp.addEventListener('load', function(event) {
      				if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
						callback(xmlHttp.responseText);
					} else if(callbackError !== undefined) {
							callbackError();
					}
				});

				xmlHttp.send(null);
			}
		},

		json: function (url, callback) {
			this.load(url, function (data) {
				callback(eval('(' + data + ')'));
			});
		}
	};
});


