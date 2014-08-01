var utils = require( './utils' );
(function(){
  'use strict';

  var spaces = {
    rgba: {
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
      mappers: {
        hex: function( matches ){
          var hexStr = matches[ 0 ];
          var rgb = utils.hexToRgb( hexStr );
          return [ hexStr, rgb.r, rgb.g, rgb.b, 1 ];
        }
      },        
      converters: {
        hsla: function( rgba ){
          var hsla = utils.rgbToHsl( rgba );
          hsla.a = rgba.a;
          return hsla;
        }
      },
      toString: function( rgba ){
        return 'rgba( ' + [ rgba.r, rgba.g, rgba.b, rgba.a ].join( ', ' ) + ' )';
      },
      formatters: {
        hex: function( rgba ){
          return utils.rgbToHex( rgba );
        },
        rgb: function( rgba ){
          return 'rgb( ' + [ rgba.r, rgba.g, rgba.b ].join( ', ' ) + ' )';
        }
      }        
    },
    hsla: {
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
        rgba: function( hsla ){
          var rgba = utils.hslToRgb( hsla );
          rgba.a = hsla.a;
          return rgba;
        }
      },
      toString: function( hsla ){
        return 'hsla( ' + [ hsla.h, hsla.s + '%', hsla.l + '%', hsla.a ].join( ', ' ) + ' )';
      },
      formatters: {
        hsl: function( hsla ){
          return 'hsla( ' + [ hsla.h, hsla.s + '%', hsla.l + '%', hsla.a ].join( ', ' ) + ' )';
        }
        
      }
    }
  };    

  module.exports = spaces;
})();