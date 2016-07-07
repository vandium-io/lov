'use strict';

const AnyValidator = require( './any' );

const utils = require( './utils' );

const emailValidator = require( 'email-validator' );

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const CASE_LOWER = 1;

const CASE_UPPER = 2;

class StringValidator extends AnyValidator {

    convert( value ) {

        if( (value !== undefined) && (value !== null) ) {

            switch( typeof value ) {

                case 'string':
                    break;

                case 'number':
                case 'boolean':
                    value = value.toString();
                    break;

                default:
                    throw new Error( 'must be a string' );
            }

            if( this._trim ) {

                value = value.trim();
            }

            if( this._case === CASE_UPPER ) {

                value = value.toUpperCase();
            }
            else if( this._case === CASE_LOWER ) {

                value = value.toLowerCase();
            }
        }

        return value;
    }

    _validate( value ) {

        if( this._minLength && value.length < this._minLength ) {

            throw new Error( 'must have length of at least: ' + this._minLength );
        }

        if( this._maxLength && value.length > this._maxLength ) {

            throw new Error( 'must have length less than or equal to ' + this._maxLength );
        }

        if( this._regexp && !this._regexp.test( value ) ) {

            throw new Error( 'failed regex' );
        }

        if( this._email && !emailValidator.validate( value ) ) {

            throw new Error( 'invalid email address' );
        }
    }

    min( minLength ) {

        this._minLength = utils.validateNumber( minLength, 0 );

        return this;
    }

    max( maxLength ) {

        this._maxLength = utils.validateNumber( maxLength, 0 );

        return this;
    }

    trim() {

        this._trim = true;

        return this;
    }

    regex( regexp ) {

        if( !regexp ) {

            throw new Error( 'missing regex' );
        }

        this._regexp = regexp;

        return this;
    }

    lowercase() {

        this._case = CASE_LOWER;

        return this;
    }

    uppercase() {

        this._case = CASE_UPPER;

        return this;
    }

    uuid() {

        return this.regex( UUID_REGEX, 'UUID' );
    }

    guid() {

        return this.uuid();
    }

    insensitive() {

        this._insensitive = true;

        return this;
    }

    email() {

        this._email = true;

        return this;
    }

    _matchesExpected( value, validValue ) {

        if( this._insensitive ) {

            return (value.toUpperCase() === validValue.toString().toUpperCase());
        }
        else {

            return (value === validValue);
        }
    }
}

module.exports = StringValidator;
