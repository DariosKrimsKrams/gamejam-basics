define(function() {
	return {
		load: function (isGET, url, callback, callbackError, postData, token) {
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
				var requestType = isGET ? 'GET' : 'POST';
				xmlHttp.open(requestType, url, true);

   				xmlHttp.addEventListener('load', function(event) {
      				if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
						callback(xmlHttp.responseText);
					} else if(callbackError !== undefined) {
						//res = xmlHttp.responseText;
						callbackError(xmlHttp);
					}
				});

				var data = null;
				if(isGET == false && postData != undefined) {
					data = JSON.stringify(postData);
					xmlHttp.setRequestHeader('Content-Type', 'application/json');
				}
				if(token !== undefined && token !== null)
					xmlHttp.setRequestHeader('X-CSRF-Token', token);
				xmlHttp.send(data);

			}

		},

		json: function (isGET, url, callback, callbackError, postData, token) {
			var callback2 = function (data) {
				callback(JSON.parse(data || "{}"));
			};
			this.load(isGET, url, callback2, callbackError, postData, token);
		}
	};
});


