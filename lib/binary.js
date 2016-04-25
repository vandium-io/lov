'use strict';

const AnyValidator = require( './any' );

class BinaryValidator extends AnyValidator {

    constructor() {

        super();

        this._encoding = 'base64';
    }

    convert( value ) {

        if( value && !(value instanceof Buffer) ) {

            value = new Buffer( value.toString().trim(), this._encoding );
        }

        return value;
    }

    encoding( encodingScheme ) {

        if( !encodingScheme ) {

            encodingScheme = 'base64';
        }

        this._encoding = encodingScheme;

        return this;
    }
}

module.exports = BinaryValidator;
