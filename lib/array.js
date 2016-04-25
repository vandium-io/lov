'use strict';

const AnyValidator = require( './any' );

const utils = require( './utils' );

class ArrayValidator extends AnyValidator {

    convert( value ) {

        if( !Array.isArray( value ) ) {

            value = Array.from( value );
        }

        return value;
    }

    min( minLength ) {

        this._minLength = utils.validateNumber( minLength, 0 );

        return this;
    }

    max( maxLength ) {

        this._maxLength = utils.validateNumber( maxLength, 0 );

        return this;
    }

    items( validator ) {

        if( !utils.isFunction( validator.validate ) ) {

            throw new Error( 'validator does not implement validate()' );
        }

        this._validator = validator;

        return this;
    }

    _validate( value ) {

        if( this._minLength && (value.length < this._minLength) ) {

            throw new Error( 'expecting at least ' + this._minLength + ' items' );
        }

        if( this._maxLength && (value.length > this._maxLength ) ) {

            throw new Error( 'expecting ' + this._maxLength + ' items at most' );
        }

        if( this._validator ) {

            for( let i = 0; i < value.length; i++ ) {

                value[ i ] = this._validator.validate( value[ i ] );
            }
        }
    }
}

module.exports = ArrayValidator;
