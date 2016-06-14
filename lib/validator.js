'use strict';

const utils = require( './utils' );

const AlternativesValidator = require( './alternatives' );

function handleSuccess( values, validated, options, callback ) {

    if( callback ) {

        callback( null, validated );
        return;
    }

    if( options.updateValues === true ) {

        Object.keys( validated ).forEach( function( key ) {

            values[ key ] = validated[ key ];
        });
    }

    let value;

    if( options.valueIsWrapped ) {

        // extract validated value
        value = validated.value;
    }
    else {

        value = Object.assign( {}, values, validated );
    }

    return { error: null, value };
}

function handleError( values, error, options, callback ) {

    if( callback ) {

        callback( error );
    }

    return { error, value: values };
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

    // we might modify the options
    let options = {};

    let callback;

    if( arguments.length === 3 ) {

        if( utils.isFunction( arguments[2] ) ) {

            callback = arguments[ 2 ];
        }
        else {

            options = Object.assign( options, arguments[ 2 ] );
        }
    }
    else if( arguments.length >= 4 ) {

        options = Object.assign( options, arguments[ 2 ] );

        callback = arguments[ 3 ];
    }

    let validated = {};

    // handle case where user is using short form ([]) for alternatives
    if( Array.isArray( schema ) ) {

        schema = new AlternativesValidator().try( schema );
    }

    let originalValues = values;

    if( utils.isFunction( schema.validate ) ) {

        // single value/validator case

        values = { value: values };
        schema = { value: schema };

        options.valueIsWrapped = true;
    }
    else {

        values = values || {};
    }

    let keys = Object.keys( schema );

    if( options.allowAdditional !== true ) {

        try {

            validateAgaintUnvalidatedKeys( values, schema, options, callback );
        }
        catch( err ) {

            return handleError( originalValues, err, options, callback );
        }
    }

    for( let i = 0; i < keys.length; i++ ) {

        let key = keys[i];

        let keyValidator = schema[ key ];

        if( Array.isArray( keyValidator ) ) {

            keyValidator = new AlternativesValidator().try( keyValidator );
        }

        let value = values[ key ];

        try {

            let validatedValue = keyValidator.validate( value );

            if( (validatedValue !== undefined) || values.hasOwnProperty( key ) ) {

                validated[ key ] = validatedValue;
            }
        }
        catch( err ) {

            let error = new Error( key + ': ' + err.message );

            return handleError( originalValues, error, options, callback );
        }
    }

    return handleSuccess( originalValues, validated, options, callback );
}

module.exports = validator;
