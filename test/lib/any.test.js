'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const AnyValidator = require( '../../lib/any' );

describe( 'lib/any', function() {

    describe( 'AnyValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                expect( new AnyValidator().validate( '123' ) ).to.equal( '123' );
            });
        });

        describe( '.convert', function() {

            it( 'with value', function() {

                expect( new AnyValidator().convert( ' 1234 ' ) ).to.equal( ' 1234 ' );
            });

            it( 'without value', function() {

                expect( new AnyValidator().convert() ).to.equal( undefined );
            });
        });

        describe( '.required', function() {

            it( 'with value', function() {

                let validator = new AnyValidator();

                let convertSpy = sinon.spy( validator, 'convert' );

                expect( validator.required().validate( 'abc' ) ).to.equal( 'abc' );

                expect( convertSpy.calledOnce ).to.be.true;
                expect( convertSpy.withArgs( 'abc' ).calledOnce ).to.be.true;
            });

            it( 'fail: when value is missing', function() {

                let validator = new AnyValidator();

                let convertSpy = sinon.spy( validator, 'convert' );

                expect( validator.required().validate.bind( validator ) ).to.throw( 'missing required value' );

                expect( convertSpy.calledOnce ).to.be.true;
                expect( convertSpy.withArgs().calledOnce ).to.be.true;
            });
        });

        describe( '.valid', function() {

            it( 'with match', function() {

                let validator = new AnyValidator();

                let _matchesExpectedSpy = sinon.spy( validator, '_matchesExpected' );

                expect( validator.valid( '123', 'abc' ).validate( 'abc' ) ).to.equal( 'abc' );

                expect( _matchesExpectedSpy.calledTwice ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'abc', '123' ).calledOnce ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'abc', 'abc' ).calledOnce ).to.be.true;
            });

            it( 'with match, multiple calls to valid', function() {

                let validator = new AnyValidator();

                let _matchesExpectedSpy = sinon.spy( validator, '_matchesExpected' );

                expect( validator.valid().valid( '123' ).valid( 'abc' ).validate( 'abc' ) ).to.equal( 'abc' );

                expect( _matchesExpectedSpy.calledTwice ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'abc', '123' ).calledOnce ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'abc', 'abc' ).calledOnce ).to.be.true;
            });

            it( 'no match', function() {

                let validator = new AnyValidator();

                let _matchesExpectedSpy = sinon.spy( validator, '_matchesExpected' );

                expect( validator.valid( '123', 'abc' ).validate.bind( validator, 'efg' ) ).to.throw( 'does not match valid value(s)' );

                expect( _matchesExpectedSpy.calledTwice ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'efg', '123' ).calledOnce ).to.be.true;
                expect( _matchesExpectedSpy.withArgs( 'efg', 'abc' ).calledOnce ).to.be.true;
            });
        });

        describe( '.default', function() {

            it( 'when value is empty', function() {

                expect( new AnyValidator().default( '123' ).validate() ).to.equal( '123' );
            });

            it( 'ignored when value is present', function() {

                expect( new AnyValidator().default( '123' ).validate( 'abc' ) ).to.equal( 'abc' );
            });

        });
    });
});
