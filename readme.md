#colorspace kit

![under construction lol](http://i.imgur.com/jV4f9qR.png)

under construction lol

```javascript
var _ = require( 'underscore' );
var csk = require( './csk' );

var Rgba = csk.Rgba;
var Hsla = csk.Hsla;

(function(){
  'use strict';
  
  var testGroups = {
    funcs: [
      csk(),
      csk(255, 192, 128, 0.75),
      csk([255, 192, 128, 0.75]),
      csk('#39f'),
      csk('hsla( 210, 100%, 50%, 0.75 )'),
      csk({ r: 51, g: 153, b: 255, a: 0.75 }),
      csk({ h: 210, s: 100, l: 50, a: 0.75 })
    ],
    ctors: [
      new Rgba( 51, 150, 255, 0.75 ),
      new Hsla( 210, 100, 60, 0.75 ),
      new Rgba( '#39f' ),      
      new Rgba( 'rgb( 51, 150, 255 )' ),      
      new Rgba( 'rgba( 51, 150, 255, 0.75 )' ),      
      new Hsla( 'hsl( 210, 100%, 50% )' ),
      new Hsla( 'hsla( 210, 100%, 50%, 0.75 )' ),
      new Rgba(),
      new Hsla()
    ],
    converted: [
    ]
  };

  testGroups.converted.push( testGroups.ctors[ 0 ].hsla() );
  testGroups.converted.push( testGroups.ctors[ 1 ].rgba() );

  _( testGroups ).each( function( group, groupName ){
    console.log( ( new Array( 60 ) ).join( '=' ) );  
    console.log( groupName );  
    console.log( ( new Array( 60 ) ).join( '=' ) );  
    _( group ).each( logColor );    
  });
  
  function logColor( color ){
    if( color.space === 'rgba' && color.a === 1 ){
      console.log( '  ' + color.toString( 'hex' ) );
    } else {
      console.log( '  ' + color.toString() );
    }
    console.log( '  ' + ( new Array( 56 ) ).join( '.' ) );  
    console.log( '  ' + JSON.stringify( color ) );
    console.log( ( new Array( 60 ) ).join( '-' ) );  
  }  
})();
```