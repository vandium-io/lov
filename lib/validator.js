'use strict';

const utils = require( './utils' );

function handleSuccess( values, validated, options, callback ) {

    if( callback ) {

        callback( null, validated );
    }
    else if( options.wantResults === true ) {

        return { value: validated };
    }
    else {

        Object.keys( validated ).forEach( function( key ) {

            values[ key ] = validated[ key ];
        });
    }
}

function handleError( error, options, callback ) {

    if( callback ) {

        callback( error );
    }
    else if( options.wantResults === true ) {

        return { error };
    }
    else {

        throw error;
    }
}

function validateAgaintUnvalidatedKeys( value, schema ) {

    let unvalidated = [];

    Object.keys( value ).forEach( function( key ) {

        if( !schema[ key ] ) {

            unvalidated.push( key );
        }
    });

    if( unvalidated.length > 0 ) {

        let message;

        switch( unvalidated.length ) {

            case 1:
                message = '"' + unvalidated[0] + '"' + ' is not allowed';
                break;

            case 2:
                message =  '"' + unvalidated[0] + '" and "' + unvalidated[1] + '" are not allowed';
                break;

            default:
                message = '"' + unvalidated[0] + '"';

                let last = unvalidated.length - 1;

                for( let i = 1; i < unvalidated.length; i++ ) {

                    message+= ', ';

                    if( i === last ) {

                        message+= 'and ';
                    }

                    message+= '"' + unvalidated[i] + '"'
                }

                message+= ' are not allowed';
        }

        throw new Error( message );
    }
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

    if( options.allowAdditional !== true ) {

        try {

            validateAgaintUnvalidatedKeys( values, schema, options, callback );
        }
        catch( err ) {

            return handleError( err, options, callback );
        }
    }

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

            return handleError( error, options, callback );
        }
    }

    return handleSuccess( values, validated, options, callback );
}

module.exports = validator;
