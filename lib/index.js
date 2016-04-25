'use strict';

const AnyValidator = require( './any' );

const BooleanValidator = require( './boolean' );

const NumberValidator = require( './number' );

const StringValidator = require( './string' );

const ObjectValidator = require( './object' );

const ArrayValidator = require( './array' );

const BinaryValidator = require( './binary' );

const DateValidator = require( './date' );

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

    array: function() {

            return new ArrayValidator();
        },

    binary: function() {

            return new BinaryValidator();
        },

    date: function() {

            return new DateValidator();
        },


    validate: require( './validator' )
};
