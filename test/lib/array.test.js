'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const ArrayValidator = require( '../../lib/array' );

describe( 'lib/array', function() {

    describe( 'ArrayValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                new ArrayValidator();
            });
        });

        describe( '.convert', function() {

            it( 'array value', function() {

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().convert( value ) ).to.equal( value );
            });

            it( 'array compatible value', function() {

                let value = 'hello'

                expect( new ArrayValidator().convert( value ) ).to.eql( [ 'hello' ] );
            });

            it( 'empty value', function() {

                expect( new ArrayValidator().convert() ).to.equal( undefined );
            });
        });

        describe( '.min', function() {

            it( 'normal operation', function() {

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().min( 3 ).validate( value ) ).to.equal( value );
            });

            it( 'empty values, not required', function() {

                expect( new ArrayValidator().min( 3 ).validate() ).to.equal( undefined );
            });

            it( 'fail: too small', function() {

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator();

                expect( validator.min( 4 ).validate.bind( validator, value ) ).to.throw( 'expecting at least 4 items' );
            });
        });

        describe( '.max', function() {

            it( 'normal operation', function() {

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().max( 3 ).validate( value ) ).to.equal( value );
            });

            it( 'empty values, not required', function() {

                expect( new ArrayValidator().max( 3 ).validate() ).to.equal( undefined );
            });

            it( 'fail: too many', function() {

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator();

                expect( validator.max( 2 ).validate.bind( validator, value ) ).to.throw( 'expecting 2 items at most' );
            });
        });


        describe( '.items', function() {

            it( 'normal operation', function() {

                let itemValidator = { validate: sinon.stub().returnsArg( 0 ) };

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().items( itemValidator ).validate( value ) ).to.equal( value );

                expect( itemValidator.validate.callCount ).to.equal( 3 );
                expect( itemValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'fail: when validator does not implement validate()', function() {

                let itemValidator = { };

                let validator = new ArrayValidator();

                expect( validator.items.bind( validator, itemValidator ) ).to.throw( 'validator does not implement validate()' );
            });
        });
    });
});
