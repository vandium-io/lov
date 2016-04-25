'use strict';

function validateNumber( value, min, max ) {

    if( value === undefined ) {

        throw new Error( 'missing value' );
    }

    value = Number( value );

    if( isNaN( value ) ) {

        throw new Error( 'not a number' );
    }

    if( min !== undefined && value < min ) {

        throw new Error( 'must be greater than or equal to ' + min );
    }

    if( max !== undefined && value > max ) {

        throw new Error( 'must be less than or equal to ' + max );
    }

    return value;
}

function isFunction( value ) {

    return (value && value.constructor === Function);
}

module.exports = {

    validateNumber,

    isFunction,
};
