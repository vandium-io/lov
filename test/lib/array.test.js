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

            it( 'normal operation, single type', function() {

                let itemValidator = { validate: sinon.stub().returnsArg( 0 ) };

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().items( itemValidator ).validate( value ) ).to.equal( value );

                expect( itemValidator.validate.callCount ).to.equal( 3 );
                expect( itemValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'normal operation with multiple types', function() {

                let badValidator = { validate: sinon.stub().throws( new Error( 'no match') ) };
                let goodValidator = { validate: sinon.stub().returnsArg( 0 ) } ;

                let itemValidators = [ badValidator, goodValidator ];

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator().items( itemValidators[0], itemValidators[1] );

                expect( validator.validate( value ) ).to.equal( value );

                expect( badValidator.validate.callCount ).to.equal( 3 );
                expect( goodValidator.validate.callCount ).to.equal( 3 );

                expect( badValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;

                expect( badValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;

                expect( badValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'normal operation with multiple types as array', function() {

                let badValidator = { validate: sinon.stub().throws( new Error( 'no match') ) };
                let goodValidator = { validate: sinon.stub().returnsArg( 0 ) } ;

                let itemValidators = [ badValidator, goodValidator ];

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator().items( [ itemValidators[0], itemValidators[1] ] );

                expect( validator.validate( value ) ).to.equal( value );

                expect( badValidator.validate.callCount ).to.equal( 3 );
                expect( goodValidator.validate.callCount ).to.equal( 3 );

                expect( badValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;

                expect( badValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;

                expect( badValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
                expect( goodValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'fail: multiple validators but required one not called', function() {

                let firstValidator = { validate: sinon.stub().returnsArg( 0 ), _required: true };
                let secondValidator = { validate: sinon.stub().throws( new Error( 'missing value' ) ), _required: true } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator().items( itemValidators[0], itemValidators[1] );

                expect( validator.validate.bind( validator, value ) ).to.throw( 'missing value' );

                expect( firstValidator.validate.callCount ).to.equal( 3 );
                expect( secondValidator.validate.calledOnce ).to.be.true

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( firstValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( firstValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;

                expect( secondValidator.validate.withArgs().calledOnce ).to.be.true;
            });

            it( 'fail: multiple validators that do not accept the values', function() {

                let firstValidator = { validate: sinon.stub().throws( new Error( 'bad value' ) ), _required: true };
                let secondValidator = { validate: sinon.stub().throws( new Error( 'bad value' ) ), _required: true } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1, 2, 3 ];

                let validator = new ArrayValidator().items( itemValidators[0], itemValidators[1] );

                expect( validator.validate.bind( validator, value ) ).to.throw( 'cannot validate item: 1' );

                expect( firstValidator.validate.callCount ).to.equal( 1 );
                expect( secondValidator.validate.callCount ).to.equal( 1 );

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( secondValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
            });

            it( 'fail: when validators are missing', function() {

                let validator = new ArrayValidator();

                expect( validator.items.bind( validator, [] ) ).to.throw( 'missing type(s)' );
            });

            it( 'fail: when validator does not implement validate()', function() {

                let itemValidator = { };

                let validator = new ArrayValidator();

                expect( validator.items.bind( validator, itemValidator ) ).to.throw( 'validator at index [0] does not implement validate()' );
            });
        });

        describe( '.ordered', function() {

            it( 'normal operation, single type', function() {

                let itemValidator = { validate: sinon.stub().returnsArg( 0 ) };

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().ordered( itemValidator ).validate( value ) ).to.equal( value );

                expect( itemValidator.validate.callCount ).to.equal( 3 );
                expect( itemValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( itemValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'multiple validators', function() {

                let firstValidator = { validate: sinon.stub().returnsArg( 0 ), _required: true };
                let secondValidator = { validate: sinon.stub().returnsArg( 1 ), _required: true } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1, 2, 3 ];

                expect( new ArrayValidator().ordered( itemValidators ).validate( value ) ).to.equal( value );

                expect( firstValidator.validate.callCount ).to.equal( 1 );
                expect( secondValidator.validate.callCount ).to.equal( 2 );

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;

                expect( secondValidator.validate.withArgs( 2 ).calledOnce ).to.be.true;
                expect( secondValidator.validate.withArgs( 3 ).calledOnce ).to.be.true;
            });

            it( 'multiple validators, single item to validate', function() {

                let firstValidator = { validate: sinon.stub().returnsArg( 0 ), _required: true };
                let secondValidator = { validate: sinon.stub().returnsArg( 1 ), _required: false } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1 ];

                expect( new ArrayValidator().ordered( itemValidators ).validate( value ) ).to.equal( value );

                expect( firstValidator.validate.callCount ).to.equal( 1 );
                expect( secondValidator.validate.callCount ).to.equal( 1 );

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( firstValidator.validate.withArgs().calledOnce ).to.be.true;
            });

            it( 'fail: multiple validators, single item, both validators required', function() {

                let firstValidator = { validate: sinon.stub().returnsArg( 0 ), _required: true };
                let secondValidator = { validate: sinon.stub().throws( new Error( 'missing value' ) ), _required: true } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1 ];

                let validator = new ArrayValidator().ordered( itemValidators );

                expect( validator.validate.bind( validator, value ) ).to.throw( 'missing value' );

                expect( firstValidator.validate.callCount ).to.equal( 1 );
                expect( secondValidator.validate.callCount ).to.equal( 1 );

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
                expect( secondValidator.validate.withArgs().calledOnce ).to.be.true;
            });

            it( 'fail: multiple validators, single item, both validators required, first validator fails', function() {

                let firstValidator = { validate: sinon.stub().throws( new Error( 'missing value' ) ), _required: true };
                let secondValidator = { validate: sinon.stub().throws( new Error( 'missing value' ) ), _required: true } ;

                let itemValidators = [ firstValidator, secondValidator ];

                let value = [ 1 ];

                let validator = new ArrayValidator().ordered( itemValidators );

                expect( validator.validate.bind( validator, value ) ).to.throw( 'missing value' );

                expect( firstValidator.validate.callCount ).to.equal( 1 );
                expect( secondValidator.validate.callCount ).to.equal( 0 );

                expect( firstValidator.validate.withArgs( 1 ).calledOnce ).to.be.true;
            });

            it( 'fail: when validators are missing', function() {

                let validator = new ArrayValidator();

                expect( validator.ordered.bind( validator, [] ) ).to.throw( 'missing type(s)' );
            });

            it( 'fail: when validator does not implement validate()', function() {

                let itemValidator = { };

                let validator = new ArrayValidator();

                expect( validator.ordered.bind( validator, itemValidator ) ).to.throw( 'validator at index [0] does not implement validate()' );
            });
        });
    });
});
