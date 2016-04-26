'use strict';

const fecha = require( 'fecha' );

const AnyValidator = require( './any' );

class DateValidator extends AnyValidator {

    constructor() {

        super();

        this._format = 'YYYY-MM-DD';
    }

    convert( value ) {

        if( value && !(value instanceof Date) ) {

            if( Number.isInteger( value ) ) {

                value = new Date( value );
            }
            else {

                value = fecha.parse( value.toString(), this._format );

                if( value === false ) {

                    throw new Error( 'invalid date' );
                }
            }
        }

        return value;
    }

    format( dateFormat ) {

        if( !dateFormat ) {

            throw new Error( 'missing date format' );
        }

        this._format = dateFormat;

        return this;
    }
}

module.exports = DateValidator;
