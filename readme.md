#colorspace kit

```javascript
var spaces = {
	'rgba' : {
		channels: {
			r: 255,
			g: 255,
			b: 255,
			a: 1
		}
		...
	},
	'hsla' : {
		channels: {
			h: 360,
			s: 100,
			l: 100,
			a: 1
		}
		...
	}
	...
};

var csk = new Csk( spaces );

var red = csk( '#f00' );
var green = csk( 'rgba( 0, 255, 0, 0.9 )' );
var blue = csk( 'hsla( 210, 100%, 50%, 0.9 )' ); 
```