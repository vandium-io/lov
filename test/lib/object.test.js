'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const ObjectValidator = require( '../../lib/object' );

describe( 'lib/object', function() {

    describe( 'ObjectValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                new ObjectValidator();
            });
        });

        describe( '.convert', function() {

            it( 'value is an object', function() {

                let obj = {};

                expect( new ObjectValidator().convert( obj ) ).to.equal( obj );
            });

            it( 'value is not set', function() {

                expect( new ObjectValidator().convert() ).to.equal( undefined );
            });

            it( 'fail: when value is not an object', function() {

                let validator = new ObjectValidator();

                expect( validator.convert.bind( validator, 'hello' ) ).to.throw( 'expecting object' );
            });
        });

        describe( '.keys', function() {

            it( 'without calling keys', function() {

                let validator = new ObjectValidator();

                expect( validator._keys ).to.not.exist;
                
                let obj = {};

                expect( validator.validate( obj ) ).to.equal( obj );
            });

            it( 'empty keys', function() {

                let validator = new ObjectValidator().keys();

                expect( validator._keys ).to.eql( {} );

                let obj = {};

                expect( validator.validate( obj ) ).to.equal( obj );
            });

            it( 'with validators', function() {

                let v1 = { validate: function( v ) { return v; } };
                let v2 = { validate: function( v ) { return v; } };

                let validator = new ObjectValidator().keys( {

                    name: v1,

                    age: v2
                });

                expect( validator._keys ).to.eql( { name: v1, age: v2 } );

                expect( validator.validate( { name: 'n', age: 42 } ) ).to.eql( { name: 'n', age: 42 } );
            });

            it( 'fail when validation fails on validator', function() {

                let v1 = { validate: function( v ) { return v; } };
                let v2 = { validate: function() { throw new Error( 'bad value' ); } };

                let validator = new ObjectValidator().keys( {

                    name: v1,

                    age: v2
                });

                expect( validator._keys ).to.eql( { name: v1, age: v2 } );

                expect( validator.validate.bind( validator, { name: 'n', age: 42 } ) ).to.throw( 'age: bad value' );
            });

            it( 'fail: when validator do not implement validate()', function() {

                let v1 = { validate: function() {} };
                let v2 = { noValidate: function() {} };

                let validator = new ObjectValidator();


                expect( validator.keys.bind( validator, { name: v1, age: v2 } ) ).to.throw( 'missing validator for: age' );
            });
        });
    });
});
