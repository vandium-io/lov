'use strict';

const AnyValidator = require( './any' );

const utils = require( './utils' );

function parseArgs() {

    let values = [];

    for( let i = 0; i < arguments.length; i++ ) {

        let v = arguments[ i ];

        if( Array.isArray( v ) ) {

            values = values.concat( v );
        }
        else {

            values.push( v );
        }
    }

    return values;
}

class ArrayValidator extends AnyValidator {

    convert( value ) {

        if( value && !Array.isArray( value ) ) {

            value = [ value ];
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

    items() {

        return this._setItemValidators( parseArgs.apply( null, arguments ), false );
    }

    ordered() {

        return this._setItemValidators( parseArgs.apply( null, arguments ), true );
    }

    _setItemValidators( validators, isOrdered ) {

        if( validators.length === 0 ) {

            throw new Error( 'missing type(s)' );
        }

        for( let i = 0; i < validators.length; i++ ) {

            if( !utils.isFunction( validators[i].validate ) ) {

                throw new Error( 'validator at index [' + i + '] does not implement validate()' );
            }
        }

        this._items = validators;
        this._ordered = isOrdered;

        return this;
    }

    _validate( value ) {

        if( this._minLength && (value.length < this._minLength) ) {

            throw new Error( 'expecting at least ' + this._minLength + ' items' );
        }

        if( this._maxLength && (value.length > this._maxLength ) ) {

            throw new Error( 'expecting ' + this._maxLength + ' items at most' );
        }

        if( this._items ) {

            if( this._ordered ) {

                this._validateOrdered( value );
            }
            else {

                this._validateUnordered( value );
            }
        }
    }

    _validateOrdered( values ) {

        for( let i = 0; i < values.length; i++ ) {

            let validator = this._items[ i ];

            if( !validator ) {

                validator = this._items[ this._items.length - 1 ];
            }

            values[ i ] = validator.validate( values[ i ] );
        }

        if( values.length < this._items.length ) {

            for( let i = values.length; i < this._items.length; i++ ) {

                // make sure they are not required
                this._items[i].validate();
            }
        }
    }

    _validateUnordered( values ) {

        let validatorsUsed = new Set();

        for( let i = 0; i < values.length; i++ ) {

            let success = false;

            for( let validator of this._items ) {

                try {

                    values[ i ] = validator.validate( values[ i ] );

                    validatorsUsed.add( validator );

                    success = true;
                    break;
                }
                catch( err ) {

                    // ignore
                }
            }

            if( !success ) {

                throw new Error( 'cannot validate item: ' + values[i] );
            }
        }

        for( let validator of this._items ) {

            if( (validator._required === true) && !validatorsUsed.has( validator ) ) {

                console.log( '*** here')

                // should throw exception
                validator.validate();
            }
        }
    }
}

module.exports = ArrayValidator;
