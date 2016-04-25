'use strict';

const TYPE_INTEGER = 1;

const TYPE_FLOAT = 2;

const AnyValidator = require( './any' );

const validateNumber = require( './utils' ).validateNumber;

class NumberValidator extends AnyValidator {

    convert( value ) {

        if( value ) {

            value = validateNumber( value );

            if( this._places ) {

                value = Number.parseFloat( value.toFixed( this._places ) )
            }
        }

        return value;
    }

    _validate( value ) {

        validateNumber( value, this._min, this._max );

        if( this._type ) {

            if( this._type === TYPE_INTEGER ) {

                if( !Number.isInteger( value ) ) {

                    throw new Error( 'expecting integer' );
                }
            }
            else {  // tthis._type === TYPE_FLOAT

                if( (value % 1) === 0 ) {

                    throw new Error( 'expecting floating point number' );
                }
            }
        }
    }

    min( minValue ) {

        this._min = validateNumber( minValue );

        return this;
    }

    max( maxValue ) {

        this._max = validateNumber( maxValue );

        return this;
    }

    positive() {

        return this.min( 0 );
    }

    negative() {

        return this.max( 0 );
    }

    integer() {

        this._type = TYPE_INTEGER;

        // remove precision
        delete this._precision;

        return this;
    }

    float() {

        this._type = TYPE_FLOAT;

        return this;
    }

    precision( places ) {

        this.float();

        this._places = validateNumber( places );

        return this;
    }
}

module.exports = NumberValidator;
