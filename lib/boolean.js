'use strict';

const AnyValidator = require( './any' );

class BooleanValidator extends AnyValidator {

    convert( value ) {

        if( value ) {

            if( (value === true) || (value === false) ) {

                return value;
            }

            switch( value.toString().toLowerCase().trim() ) {

                case 'true':
                case 'yes':
                case 'on':
                    return true;

                case 'false':
                case 'no':
                case 'off':
                    return false;

                default:
                    throw new Error( 'not a boolean value' );
            }
        }

        return value;
    }
}

module.exports = BooleanValidator;
