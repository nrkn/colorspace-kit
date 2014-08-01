var _ = require( 'underscore' );
var csk = require( './csk' );

var Rgba = csk.Rgba;
var Hsla = csk.Hsla;

(function(){
  'use strict';
  
  var testGroups = {
    ctors: [
      new Rgba( 51, 150, 255, 0.75 ),
      new Hsla( 210, 100, 60, 0.75 ),
      new Rgba( '#39f' ),      
      new Rgba( 'rgb( 51, 150, 255 )' ),      
      new Rgba( 'rgba( 51, 150, 255, 0.75 )' ),      
      new Hsla( 'hsl( 210, 100%, 50% )' ),
      new Hsla( 'hsla( 210, 100%, 50%, 0.75 )' ),
    ],
    funcs: [
    ],
    converted: [
    ]
  };

  testGroups.ctors.push(new Rgba());
  testGroups.ctors.push(new Hsla());

  testGroups.funcs.push(csk());
  testGroups.funcs.push(csk(255, 192, 128, 0.75));
  testGroups.funcs.push(csk([255, 192, 128, 0.75]));
  testGroups.funcs.push(csk('#39f'));
  testGroups.funcs.push(csk('hsla( 210, 100%, 50%, 0.75 )'));
  testGroups.funcs.push(csk({ r: 51, g: 153, b: 255, a: 0.75 }));
  testGroups.funcs.push(csk({ h: 210, s: 100, l: 50, a: 0.75 }));

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
