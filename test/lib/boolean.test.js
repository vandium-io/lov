'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const BooleanValidator = require( '../../lib/boolean' );

describe( 'lib/boolean', function() {

    describe( 'BooleanValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                new BooleanValidator();
            });
        });

        describe( 'convert', function() {

            [ true, 'true', 'on', 'yes', '  true ' ].forEach( function( value ) {

                it( 'true when value = [' + value + '] (' + typeof value + ')', function() {

                    let validator = new BooleanValidator();

                    expect( validator.convert( value ) ).to.be.true;
                });
            });

            [ false, 'false', 'off', 'no', '  false ' ].forEach( function( value ) {

                it( 'true when value = [' + value + '] (' + typeof value + ')', function() {

                    let validator = new BooleanValidator();

                    expect( validator.convert( value ) ).to.be.false;
                });
            });

            it( 'empty value', function() {

                let validator = new BooleanValidator();

                expect( validator.convert() ).to.not.exist;
            });

            it( 'fail: when value is invalid', function() {

                let validator = new BooleanValidator();

                expect( validator.convert.bind( validator, '1' ) ).to.throw( 'not a boolean value' );
            });
        });
    });
});
