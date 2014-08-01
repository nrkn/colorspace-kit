#colorspace kit

```javascript
var spaces = {
	'rgba' : {
		channels: {
			r: 255,
			g: 255,
			b: 255,
			a: 1
		},
    formats: {
      hex: /^#(?:[0-9a-f]{3,6})\b$/i,
      rgba: /^\s*rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]+|[0-9]*\.[0-9]+)\s*\)\s*$/i,
      rgb: /^\s*rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i
    },
    converters: 
      toHsla: function( rgba ){
        var hsl = rgbToHsl( rgba );
        return new Csk.Hsla( hsl.h, hsl.s, hsl.l, rgba.a );
      }
    },
    toString: function( rgba ){
      return 'rgba( ' + [ rgba.r, rgba.g, rgba.b, rgba.a ].join( ', ' ) + ' )';
    }
	},
	'hsla' : {
		channels: {
			h: 360,
			s: 100,
			l: 100,
			a: 1
		},
    formats: {
      hsla: /^\s*hsla\s*\(\s*(\d+)\s*,\s*([0-9]+|[0-9]*\.[0-9]+)%\s*,\s*([0-9]+|[0-9]*\.[0-9]+)%\s*,\s*([0-9]+|[0-9]*\.[0-9]+)\s*\)\s*$/i,
      hsl: /^\s*hsl\s*\(\s*(\d+)\s*,\s*([0-9]+|[0-9]*\.[0-9]+)%\s*,\s*([0-9]+|[0-9]*\.[0-9]+)%\s*\)$\s*/i        
    },
    converters: {
      toRgba: function( hsla ){
        var rgb = Csk.hslToRgb( hsla );
        return new Csk.Rgba( rgb.r, rgb.g, rgb.b, hsla.a );
      }
    },
    toString: function( hsla ){
      return 'hsla( ' + [ hsla.h, hsla.s + '%', hsla.l + '%', hsla.a ].join( ', ' ) + ' )';
    }      
	}
};

var csk = new Csk( spaces );

var red = csk( '#f00' );
var green = csk( 'rgba( 0, 255, 0, 0.9 )' );
var blue = csk( 'hsla( 210, 100%, 50%, 0.9 )' ); 
```