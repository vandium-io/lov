'use strict';

const AnyValidator = require( './any' );

class BooleanValidator extends AnyValidator {

    convert( value ) {

        if( (value === true) || (value === false) ) {

            return value;
        }
        else if( value === 1 ) {

            return true;
        }
        else if( value === 0 ) {

            return false;
        }
        else if( value ) {

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
        else {

            return value;
        }
    }
}

module.exports = BooleanValidator;
