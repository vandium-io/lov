'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const DateValidator = require( '../../lib/date' );

const fecha = require( 'fecha' );

describe( 'lib/date', function() {

    describe( 'DateValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let validator = new DateValidator();

                expect( validator._format ).to.equal( 'YYYY-MM-DD' );
            });
        });

        describe( '.convert', function() {

            it( 'empty value', function() {

                expect( new DateValidator().convert() ).to.equal( undefined );
            });

            it( 'date object', function() {

                let value = new Date();

                expect( new DateValidator().convert( value ) ).to.equal( value );
            });

            it( 'date string', function() {

                let value = "2001-12-25";

                let ref = fecha.parse( value, 'YYYY-MM-DD' );

                expect( new DateValidator().convert( value ) ).to.eql( ref );
            });

            it( 'fail: invalid date string', function() {

                let validator = new DateValidator();

                expect( validator.convert.bind( validator, 'hello new year' ) ).to.throw( 'invalid date' );
            });
        });

        describe( '.format', function() {

            it( 'new format', function() {

                let value = "2001-12-25 13:38:42";

                let format = 'YYYY-MM-DD HH:mm:ss';

                let ref = fecha.parse( value, format );

                expect( new DateValidator().format( format ).validate( value ) ).to.eql( ref );
            });

            it( 'fail: when format is missing', function() {

                let validator = new DateValidator();

                expect( validator.format.bind( validator ) ).to.throw( 'missing date format' );
            });
        });
    });
});
