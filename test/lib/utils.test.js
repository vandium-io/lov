'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const utils = require( '../../lib/utils' );

describe( 'lib/utils', function() {

    describe( '.validateNumber', function() {

        it( 'valid number', function() {

            expect( utils.validateNumber( 42 ) ).to.equal( 42 );
        });

        it( 'valid number, min and max, value within range', function() {

            expect( utils.validateNumber( 42, 0, 100 ) ).to.equal( 42 );
        });

        it( 'valid number but as a string', function() {

            expect( utils.validateNumber( '42' ) ).to.equal( 42 );
        });

        it( 'valid number but as a string, with min and max, value within range', function() {

            expect( utils.validateNumber( '42', 0, 100 ) ).to.equal( 42 );
        });

        it( 'fail: value is missing', function() {

            expect( utils.validateNumber.bind() ).to.throw( 'missing value' );
        });

        it( 'fail: value cannot be parsed', function() {

            expect( utils.validateNumber.bind( null, 'abc' ) ).to.throw( 'not a number' );
        });

        it( 'fail: value is too small (min)', function() {

            expect( utils.validateNumber.bind( null, -1, 0 ) ).to.throw( 'must be greater than or equal to 0' );
        });

        it( 'fail: value is too large (max)', function() {

            expect( utils.validateNumber.bind( null, 11, 0, 10 ) ).to.throw( 'must be less than or equal to 10' );
        });
    });

    describe( '.isFunction', function() {

        function test() {}

        it( 'valid function', function() {

            expect( utils.isFunction( test ) ).to.be.true;
        });

        it( 'unnamed function', function() {

            expect( utils.isFunction( function() {} ) ).to.be.true;
        });

        it( 'arrow function', function() {

            expect( utils.isFunction( () => {} ) ).to.be.true;
        });

        it( 'not a function', function() {

            let x = {

                a: 1
            };

            expect( utils.isFunction( x.a ) ).to.be.false;
        });

    });
});
