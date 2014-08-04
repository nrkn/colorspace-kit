var _ = require( 'underscore' );
(function(){
  'use strict';
  
  var inits = {
    ctor: ctor,     
    test: test,
    map: map,
    converters: converters,
    toString: toString
  };
  
  module.exports = inits;
  
  function ctor( space, name ){
    space.ctor = function(){      
      var self = this;
      var args = arguments;

      if (_(args[0]).isArguments()) {
        args = args[0];
      }

      self.space = name;

      var mapName = space.ctor.test(args);

      if (!_(mapName).isUndefined()) {
        mapName = 'from' + makeName(mapName);
        return space.ctor[mapName](args, self);
      }

      setValues( space.channels, self, args, 0 );
      
      return self;
    }
  }
  
  function fromString( space, str, obj ) {
    var formatNames = _(space.formats).keys();

    var regexName = _(formatNames).find(function (formatName) {
      return space.formats[formatName].test(str);
    });

    if (!_(regexName).isUndefined()) {
      var regex = space.formats[regexName];
      var hasMapping = space.mappers && space.mappers[regexName];

      var values = hasMapping ?
        space.mappers[regexName](regex.exec(str)) :
        regex.exec(str);

      setValues(space.channels, obj, values, 1);
    }
    
    return obj; 
  }    
  
  function test( space ){
    var tests = {
      string: function( args ){
        return _( args[ 0 ] ).isString() && _( space.formats ).some( function( regex ){
          return regex.test( args[ 0 ] );
        });
      },
      array: function( args ){
        return _( args[ 0 ] ).isArray();
      },
      arguments: function( args ){
        return args.length > 1;
      },
      object: function( args ){
        if( _( args[ 0 ] ).isObject() ){
          var channelKeys = _( space.channels ).keys();
          var objKeys = _( args[ 0 ] ).keys();
          var common = _( channelKeys ).intersection( objKeys );
          //if common.length === 1 rgba matches hsla and vice versa due to the 'a' channel
          return common.length > 1;
        }
        return false;
      }        
    }

    space.ctor.test = function(args) {
      return _(tests).chain().keys().find(function(key) {
        return tests[key](args);
      }).value();
    };

    _( tests ).each( function( func, testName ){
      var name = 'is' + makeName( testName );
      space.ctor[ name ] = func;
    });
  }
  
  function map( space ){
    var maps = {
      string: function (args, obj) {
        return fromString(space, args[0], obj);
      },
      array: function( args, obj ){
        setValues(space.channels, obj, args[0], 0);
        return obj;
      },
      arguments: function( args, obj ){
        setValues(space.channels, obj, args, 0);
        return obj;
      },
      object: function( args, obj ){
        _(space.channels).each(function(max, channelName) {
          setValue(max, channelName, obj, args[ 0 ][channelName]);
        });
        return obj;
      }
    }

    _( maps ).each( function( func, mapName ){
      var name = 'from' + makeName( mapName );
      space.ctor[ name ] = function( args, obj ){
        if( _( obj ).isUndefined() ){
          obj = new space.ctor();
        }
        func( args, obj );
      };
    });
  }  
  
  function converters( space, name, spaces ){    
    _( space.converters ).each( function( converter, converterName ){
      space.ctor.prototype[ converterName ] = function() {
        var ctor = spaces[ converterName ].ctor;
        return new ctor(converter(this));
      };      
    });
  }    
    
  function toString( space ){
    space.ctor.prototype.toString = function(){
      var formatter = arguments[ 0 ];        
      if( formatter && space.formatters && space.formatters[ formatter ] ){
        return space.formatters[ formatter ]( this );
      }
      return space.toString( this );
    };
  } 

  function defaultValue( max ){
    return max > 1 ? 0 : 1;
  }
  
  function setValue( max, channelName, obj, value ){
    value = _( value ).isUndefined() ? defaultValue( max ) : value;
    if( max > 1 ){
      value = value | 0;
    }
    obj[ channelName ] = value;
  }
  
  function setValues( channels, obj, values, start ){
    var i = start;
    _( channels ).each( function( max, channelName ){
      setValue( max, channelName, obj, values[ i++ ] );
    });
  }
  
  function makeName( str ){
    return str.charAt( 0 ).toUpperCase() + str.substr( 1 );
  }   
})();