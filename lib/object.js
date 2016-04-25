'use strict';

const AnyValidator = require( './any' );

class ObjectValidator extends AnyValidator {

    convert( value ) {

        if( value ) {

            if( ! (value instanceof Object) ) {

                throw new Error( 'expecting object' );
            }
        }

        return value;
    }

    _validate( value ) {

        if( this._keys ) {

            const self = this;

            Object.keys( this._keys ).forEach( function( key ) {

                let validator = self._keys[ key ];

                try {

                    let updated = validator.validate( value[ key ] );

                    if( updated !== undefined ) {

                        value[ key ] = updated;
                    }
                }
                catch( err ) {

                    // prefix error
                    throw new Error( key + ': ' + err.message );
                }
            });
        }
    }

    keys( validationKeys ) {

        if( !validationKeys ) {

            validationKeys = {};
        }

        Object.keys( validationKeys ).forEach( function( key ) {

            let validator = validationKeys[ key ];

            if( !validator || !validator.validate ) {

                throw new Error( 'missing validator for: ' + key );
            }
        });

        this._keys = validationKeys;

        return this;
    }
}

module.exports = ObjectValidator;
