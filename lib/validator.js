'use strict';

const utils = require( './utils' );

function copyBackValues( values, validated ) {

    Object.keys( validated ).forEach( function( key ) {

        values[ key ] = validated[ key ];
    });
}

function validator( values, schema /*, options, callback*/ ) {

    let options = {};

    let callback;

    if( arguments.length === 3 ) {

        if( utils.isFunction( arguments[2] ) ) {

            callback = arguments[ 2 ];
        }
        else {

            options = arguments[ 2 ];
        }
    }
    else if( arguments.length === 4 ) {

        options = arguments[ 2 ];

        callback = arguments[ 3 ];
    }

    let validated = {};

    values = values || {};

    let keys = Object.keys( schema );

    for( let i = 0; i < keys.length; i++ ) {

        let key = keys[i];

        let keyValidator = schema[ key ];

        let value = values[ key ];

        try {

            validated[ key ]  = keyValidator.validate( value );
        }
        catch( err ) {

            let error = new Error( key + ': ' + err.message );

            error.cause = err;

            if( callback ) {

                return callback( error );
            }
            else if( options.wantResults === true ) {

                return { err: error };
            }
            else {

                throw error;
            }
        }
    }

    if( callback ) {

        return callback( null, validated );
    }
    else if( options.wantResults === true ) {

        return { value: validated };
    }
    else {

        copyBackValues( values, validated );
    }
}

module.exports = validator;
