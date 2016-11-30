/* ========================================================================================= */
/* ================================== Small helper function ================================ */
/* ========================================================================================= */

function limit( v, m ) {
	return Math.min( m, Math.max( -m, v ));
}

function rad_to_deg( rad ) {
	return rad * ( 180 / Math.PI );
}

function arrayRemove( arr, element ) {
	arr.splice( arr.indexOf( element ), 1 );
}

/** Execute (if function) or return (if value) */
function eor( v ) {
	return typeof v == 'function' ? v() : v;
}

/* ========================================================================================= */
/* ===================================== Polygon stuff ===================================== */
// Given three vectors (Vector2) makes a right headed ray cast from a to line b/c
// Returns -1 if ray intersects b/c
// Returns  0 if a is on line b/c
// Returns +1 if no intersection
/* ========================================================================================= */

function intersect( a, b, c ) {
	if ( a.y == b.y && a.y == c.y ) { // a is on same y than b and c
		if ( (b.x < a.x && a.x < c.x) || (c.x < a.x && a.x < b.x) )
			return 0;
		else
			return 1;
	}
	if (b.y > c.y) { // switch b and c
		var d = c;
		c = b;
		b = d;
	}
	if ( a.x == b.x && a.y == b.y ) // a == b
		return 0;
	if ( a.y < b.y || a.y > c.y ) // a on different y
		return 1;

	var delta = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
	if (delta > 0)
		return -1;
	else if(delta < 0)
		return 1;
	return 0;
}

// Base64 encode / decode - http://www.webtoolkit.info/
var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

}

// min (inclusive), max (inclusive). example: 0, 4 => 0,1,2,3,4
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max) + 1;
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomAorB(value1, value2) {
	let random = getRandomInt(0, 1);
	return random == 0 ? value1 : value2;
}