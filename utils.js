(function(){
  'use strict';
  
  module.exports = {
    rgbToHsl: rgbToHsl,
    hslToRgb: hslToRgb,
    hexToRgb: hexToRgb,    
    rgbToHex: rgbToHex
  };  
  
  function rgbToHsl( rgb ){
    var r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255,   
        max = Math.max( r, g, b ),
        min = Math.min( r, g, b ),
        h, 
        s, 
        l = (max + min) / 2,
        d = max - min;
  
    if( max === min ){
      h = s = 0; // achromatic
    } else {
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    return { h: h * 360, s: s * 100, l: l * 100 };
  }  
  
  function hslToRgb( hsl ){
    var h = hsl.h / 360,
        s = hsl.s / 100,
        l = hsl.l / 100,
        r, 
        g, 
        b,
        hue2rgb = function( p, q, t ){
          if( t < 0 ){ t += 1; }
          if( t > 1 ){ t -= 1; }
          if( t < 1 / 6 ){ return p + ( q - p ) * 6 * t; }
          if( t < 1 / 2 ){ return q; }
          if( t < 2 / 3 ){ return p + ( q - p ) * ( 2 / 3 - t ) * 6; }
          return p;
        },
        q = l < 0.5 ? l * ( 1 + s ) : l + s - l * s,
        p = 2 * l - q;
  
    if( s === 0 ){
      r = g = b = l; // achromatic
    } else {
      r = hue2rgb( p, q, h + 1 / 3 );
      g = hue2rgb( p, q, h );
      b = hue2rgb( p, q, h - 1 / 3 );
    }
  
    return {
      r: r * 255,
      g: g * 255,
      b: b * 255
    };
  }
  
  function hexToRgb( hex ) {
    if( hex.substr( 0, 1 ) === '#' ){ hex = hex.substr( 1 ); }
    
    if( hex.length === 3 ) {
      return {
        r: parseInt( hex.substr( 0 , 1 ) + hex.substr( 0 , 1 ), 16 ),
        g: parseInt( hex.substr( 1 , 1 ) + hex.substr( 1 , 1 ), 16 ),
        b: parseInt( hex.substr( 2 , 1 ) + hex.substr( 2 , 1 ), 16 )
      };              
    }
    
    return {
      r: parseInt( hex.substr( 0 , 2 ), 16 ),
      g: parseInt( hex.substr( 2 , 2 ), 16 ),
      b: parseInt( hex.substr( 4 , 2 ), 16 )
    };                          
  }    
  
  function rgbToHex( rgb ) {
    var r = decToHex( rgb.r | 0 ),
        g = decToHex( rgb.g | 0 ),
        b = decToHex( rgb.b | 0 );
    
    return "#" + ( r.charAt( 0 ) === r.charAt( 1 ) && g.charAt( 0 ) === g.charAt( 1 ) && b.charAt( 0 ) === b.charAt( 1 ) ? r.charAt( 0 ) + g.charAt( 0 ) + b.charAt( 0 ) : r + g + b );
    
    function decToHex( d ) {
      var hex = d.toString( 16 );   
      return hex.length < 2 ? '0' + hex : hex;
    }    
  }  
})();