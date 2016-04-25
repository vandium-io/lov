'use strict';

function validator( values, schema ) {

    values = values || {};

    Object.keys( schema ).forEach( function( key ) {

        let keyValidator = schema[ key ];

        let value = values[ key ];

        try {

            values[ key ] = keyValidator.validate( value );
        }
        catch( err ) {

            let error = new Error( key + ': ' + err.message );

            error.cause = err;

            throw error;
        }
    });
}

module.exports = validator;
