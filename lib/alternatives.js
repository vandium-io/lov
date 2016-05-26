'use strict';

const AnyValidator = require( './any' );

const utils = require( './utils' );

function addValidator( validators, arg ) {

    if( Array.isArray( arg ) ) {

        for( let item of arg ) {

            addValidator( validators, item );
        }
    }
    else {

        if( utils.isFunction( arg ) ) {

            throw new Error( 'invalid validator: ' + arg );
        }

        validators.push( arg );
    }
}

class AlternativesValidator extends AnyValidator {

    constructor() {

        super();

        this._validators = [];
    }

    try() {

        for( let i = 0; i < arguments.length; i++ ) {

            addValidator( this._validators, arguments[i] );
        }

        return this;
    }

    _validate( value ) {

        for( let validator of this._validators ) {

            // return the first match
            try {

                return validator.validate( value );
            }
            catch( err ) {

                // ignore
            }
        }

        throw new Error( 'invalid value' );
    }
}

module.exports = AlternativesValidator;
