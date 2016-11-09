define(['system/core/graphic', 'system/core/game'],
	function(Graphics, game) {

		//var canvas = document.getElementById("gameframe");
		//var ctx = canvas.getContext("2d");
		//var img = undefined;
		//img.crossOrigin = "anonymous";
		//img.onload = start;
		//img.src = "https://dl.dropboxusercontent.com/u/139992952/multple/marioStanding.png";


		return {

			//function start() {
				//console.log(img);
			    // shift blueish colors to greenish colors
			    //recolor(-.33);
			//}

			recolor: function(ctx, pos, x1, y1, x2, y2, colorshift) {

				x1 += (pos.x + x1) * game.sceneScale - x1;
				y1 += (pos.y + y1) * game.sceneScale - y1;
				x1 += game.offset.x;
				y1 += game.offset.y;
				x2 *= game.sceneScale;
				y2 *= game.sceneScale;

			    var imgData = ctx.getImageData(x1, y1, x2, y2);
			    var data = imgData.data;

			    for (var i = 0; i < data.length; i += 4) {
			        red = data[i + 0];
			        green = data[i + 1];
			        blue = data[i + 2];
			        alpha = data[i + 3];

			        // skip transparent/semiTransparent pixels
			        if (alpha < 200) {
			            continue;
			        }

			        var hsl = this.rgbToHsl(red, green, blue);
			        var hue = hsl.h * 360;

			        // change blueish pixels to the new color
			        if (hue > 200 && hue < 300) {
			            var newRgb = this.hslToRgb(hsl.h + colorshift, hsl.s, hsl.l);
			            data[i + 0] = newRgb.r;
			            data[i + 1] = newRgb.g;
			            data[i + 2] = newRgb.b;
			            data[i + 3] = 255;
			        }
			    }
			    ctx.putImageData(imgData, x1, y1);

			},

			rgbToHsl: function(r, g, b) {
			    r /= 255, g /= 255, b /= 255;
			    var max = Math.max(r, g, b),
			        min = Math.min(r, g, b);
			    var h, s, l = (max + min) / 2;

			    if (max == min) {
			        h = s = 0; // achromatic
			    } else {
			        var d = max - min;
			        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			        switch (max) {
			            case r:
			                h = (g - b) / d + (g < b ? 6 : 0);
			                break;
			            case g:
			                h = (b - r) / d + 2;
			                break;
			            case b:
			                h = (r - g) / d + 4;
			                break;
			        }
			        h /= 6;
			    }

			    return ({
			        h: h,
			        s: s,
			        l: l,
			    });
			},

			hslToRgb: function(h, s, l) {
			    var r, g, b;

			    if (s == 0) {
			        r = g = b = l; // achromatic
			    } else {
			        function hue2rgb(p, q, t) {
			            if (t < 0) t += 1;
			            if (t > 1) t -= 1;
			            if (t < 1 / 6) return p + (q - p) * 6 * t;
			            if (t < 1 / 2) return q;
			            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			            return p;
			        }

			        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			        var p = 2 * l - q;
			        r = hue2rgb(p, q, h + 1 / 3);
			        g = hue2rgb(p, q, h);
			        b = hue2rgb(p, q, h - 1 / 3);
			    }

			    return ({
			        r: Math.round(r * 255),
			        g: Math.round(g * 255),
			        b: Math.round(b * 255),
			    });
			},

			blackAndWhite: function(ctx, pos, x1, y1, x2, y2) {
				x1 += (pos.x + x1) * game.sceneScale - x1;
				y1 += (pos.y + y1) * game.sceneScale - y1;
				x1 += game.offset.x;
				y1 += game.offset.y;
				x2 *= game.sceneScale;
				y2 *= game.sceneScale;
			    var imgData = ctx.getImageData(x1, y1, x2, y2);
			    var data = imgData.data;
				for(var y = 0; y < imgData.height; y++){
					for(var x = 0; x < imgData.width; x++){
						var i = (y * 4) * imgData.width + x * 4;
						var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
						data[i] = avg;
						data[i + 1] = avg;
						data[i + 2] = avg;
					}
				}
				ctx.putImageData(imgData, x1, y1);
			},

			/*
			TRYING to begin some desaturate functionality -> not finished yet!
			desaturate: function(ctx, pos, x1, y1, x2, y2) {


				x1 += (pos.x + x1) * game.sceneScale - x1;
				y1 += (pos.y + y1) * game.sceneScale - y1;
				x1 += game.offset.x;
				y1 += game.offset.y;
				x2 *= game.sceneScale;
				y2 *= game.sceneScale;

			    var imgData = ctx.getImageData(x1, y1, x2, y2);
			    var data = imgData.data;

			    for (var i = 0; i < data.length; i += 4) {

			        // skip transparent/semiTransparent pixels
					var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
			        if (avg > 200) {
			            continue;
			        }

					var val = 0.5;
					data[i] = data[i] * val;
					data[i+1] = data[i+1] * val;
					data[i+2] = data[i+2] * val;
				}

			    ctx.putImageData(imgData, x1, y1);
			},

			RGBtoGRAYSCALE: function (r, g, b) {
				// Returns single monochrome figure:
				return window.parseInt((0.2125 * r) + (0.7154 * g) + (0.0721 * b), 10);
			}*/


		};
});