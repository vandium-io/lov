'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const BinaryValidator = require( '../../lib/binary' );

describe( 'lib/binary', function() {

    describe( 'BinaryValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let validator = new BinaryValidator();

                expect( validator._encoding ).to.equal( 'base64' );
            });
        });

        describe( 'convert', function() {

            it( 'existing buffer', function() {

                let value = new Buffer( 'hello' );

                expect( new BinaryValidator().convert( value ) ).to.equal( value );
            });

            it( 'existing buffer', function() {

                let value = 'aGVsbG8='  // hello

                expect( new BinaryValidator().convert( value ).toString() ).to.equal( 'hello' );
            });

            it( 'empty value', function() {

                expect( new BinaryValidator().convert() ).to.equal( undefined );
            });
        });

        describe( '.encoding', function() {

            it( 'default encoding', function() {

                expect( new BinaryValidator().encoding()._encoding ).to.equal( 'base64' );
            });

            it( 'user specified', function() {

                expect( new BinaryValidator().encoding( 'utf8' )._encoding ).to.equal( 'utf8' );

                expect( new BinaryValidator().encoding( 'utf8' ).validate( 'hello' ).toString() ).to.equal( 'hello' );
            });
        });
    });
});
