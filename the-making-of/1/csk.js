var _ = require( 'underscore' );
var utils = require( './utils' );
var spaces = require( './spaces' );
var inits = require( './inits' );

(function(){
  'use strict';

  function csk() {
    var args = arguments;
    var ctor;
    
    _( csk.spaces ).each( function( space ){
      if( !_( ctor ).isUndefined() ) return;

      var testName = space.ctor.test(args);
      
      if (!_(testName).isUndefined()) {
        ctor = space.ctor;
      }
    });

    if (_(ctor).isUndefined()) {
      ctor = csk.Rgba;
    }

    return new ctor( args );
  }

  module.exports = csk;

  csk.utils = utils;
  csk.spaces = spaces;
  csk.inits = inits;

  _(csk.spaces).each(function (space, spaceName) {
    _(csk.inits).each(function (func) {
      func(space, spaceName, csk.spaces);
    });
  });
  
  _( spaces ).each( function( space, spaceName ){
    var ctorName = makeCtorName( spaceName );
    csk[ ctorName ] = space.ctor;
  });   
  
  function makeCtorName( str ){
    return str.charAt( 0 ).toUpperCase() + str.substr( 1 );
  }    
})();