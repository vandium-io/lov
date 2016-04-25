'use strict';

class AnyValidator {

    convert( value ) {

        return value;
    }

    required() {

        this._required = true;

        return this;
    }

    valid() {

        if( arguments.length > 0 ) {

            if( !this._expected ) {

                this._expected = [];
            }

            for( let i = 0; i < arguments.length; i++ ) {

                this._expected.push( arguments[ i ] );
            }
        }

        return this;
    }

    default( defaultValue ) {

        this._defaultValue = defaultValue;

        return this;
    }

    validate( value ) {

        if( (value === undefined) && this._defaultValue ) {

            value = this._defaultValue;
        }

        value = this.convert( value );

        if( value ) {

            this._validate( value );

            if( this._expected ) {

                let match = false;

                for( let i = 0; i < this._expected.length; i++ ) {

                    if( (match = this._matchesExpected( value, this._expected[ i ] ) ) ) {

                        break;
                    }
                }

                if( !match ) {

                    throw new Error( 'does not match valid value(s)' );
                }
            }
        }
        else if( this._required ) {

            throw new Error( 'missing required value' );
        }

        return value;
    }

    _validate( /*value*/ ) {

        // does nothing
    }

    _matchesExpected( value, validValue ) {

        return (value === validValue);
    }
}

module.exports = AnyValidator;
