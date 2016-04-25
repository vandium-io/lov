'use strict';

const AnyValidator = require( './lib/any' );

const BooleanValidator = require( './lib/boolean' );

const NumberValidator = require( './lib/number' );

const StringValidator = require( './lib/string' );

const ObjectValidator = require( './lib/object' );

module.exports = {

    any: function() {

            return new AnyValidator();
        },

    boolean: function() {

            return new BooleanValidator();
        },

    number: function() {

            return new NumberValidator();
        },

    string: function() {

            return new StringValidator();
        },

    object: function() {

            return new ObjectValidator();
        },


    validator: require( './lib/validator' )
};
