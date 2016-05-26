'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const AlternativesValidator = require( '../../lib/alternatives' );

const StringValidator = require( '../../lib/string' );

const NumberValidator = require( '../../lib/number' );

describe( 'lib/alternatives', function() {

    describe( 'AlternativesValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                let validator = new AlternativesValidator();

                expect( validator._validators ).to.exist;
                expect( validator._validators ).to.be.an.instanceof( Array );
                expect( validator._validators.length ).to.equal( 0 );
            });
        });

        describe( '.try', function() {

            it( 'single validator', function() {

                let validator = new AlternativesValidator();

                let stringValidator = new StringValidator();

                let result = validator.try( stringValidator );

                expect( result ).to.equal( validator );

                expect( validator._validators ).to.eql( [ stringValidator ] );
            });

            it( 'called smore than once sequentially', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();
                let stringValidator = new StringValidator();

                validator.try( numberValidator );
                validator.try( stringValidator );

                expect( validator._validators ).to.eql( [ numberValidator, stringValidator ] );
            });

            it( 'called with multiple validators', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();
                let stringValidator = new StringValidator();

                validator.try( numberValidator, stringValidator );

                expect( validator._validators ).to.eql( [ numberValidator, stringValidator ] );
            });

            it( 'called with array of validators', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();
                let stringValidator = new StringValidator();

                validator.try( [ numberValidator, stringValidator ] );

                expect( validator._validators ).to.eql( [ numberValidator, stringValidator ] );
            });

            it( 'fail: when invalid validator instance is passed', function() {

                let validator = new AlternativesValidator();

                expect( validator.try.bind( validator, { } ) ).to.throw( 'invalid validator:' );
            });
        });

        describe( '.validate', function() {

            it( 'with matching value', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();
                let stringValidator = new StringValidator();

                validator.try( numberValidator, stringValidator );

                let validated1 = validator.validate( '123' );
                expect( validated1 ).to.equal( 123 );

                let validated2 = validator.validate( 'fred' );
                expect( validated2 ).to.equal( 'fred' );
            });

            it( 'with empty value', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();
                let stringValidator = new StringValidator();

                validator.try( numberValidator, stringValidator );

                let validated1 = validator.validate();
                expect( validated1 ).to.be.undefined;

                let validated2 = validator.validate( null );
                expect( validated2 ).to.be.null;
            });

            it( 'fail: when value cannot be matched', function() {

                let validator = new AlternativesValidator();

                let numberValidator = new NumberValidator();

                validator.try( numberValidator );

                expect( validator.validate.bind( validator, 'one' ) ).to.throw( 'invalid value' );
            });
        });
    });
});
