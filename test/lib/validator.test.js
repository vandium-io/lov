'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const sinon = require( 'sinon' );

const validate = require( '../../lib/validator' );

describe( 'lib/validate', function() {

    describe( 'validate', function() {

        it( 'normal operation', function() {

            let v1 = { validate: sinon.stub().returnsArg( 0 ) };

            let v2 = { validate: sinon.stub().returns( 42 ) };

            let schema = {

                name: v1,

                special: v2,
            };

            let data = {

                name: 'fred',

                special: 28
            };

            validate( data, schema );

            expect( data ).to.eql( { name: 'fred', special: 42 } );

            expect( v1.validate.calledOnce ).to.be.true;
            expect( v1.validate.withArgs( 'fred' ).calledOnce ).to.be.true;

            expect( v2.validate.calledOnce ).to.be.true;
            expect( v2.validate.withArgs( 28 ).calledOnce ).to.be.true;
        });

        it( 'empty values', function() {

            let v1 = { validate: sinon.stub().returnsArg( 0 ) };

            let v2 = { validate: sinon.stub().returns( 42 ) };

            let schema = {

                name: v1,

                special: v2
            };

            let data;

            validate( data, schema );

            expect( data ).to.not.exist;

            expect( v1.validate.calledOnce ).to.be.true;
            expect( v1.validate.withArgs().calledOnce ).to.be.true;

            expect( v2.validate.calledOnce ).to.be.true;
            expect( v2.validate.withArgs().calledOnce ).to.be.true;
        });

        it( 'normal operation', function() {

            let v1 = { validate: sinon.stub().returnsArg( 0 ) };

            let v2 = { validate: sinon.stub().throws( new Error( 'bad value') ) };

            let schema = {

                name: v1,

                special: v2
            };

            let data = {

                name: 'fred',

                special: 28
            };

            expect( validate.bind( null,  data, schema ) ).to.throw( 'special: bad value' );

            expect( v1.validate.calledOnce ).to.be.true;
            expect( v1.validate.withArgs( 'fred' ).calledOnce ).to.be.true;

            expect( v2.validate.calledOnce ).to.be.true;
            expect( v2.validate.withArgs( 28 ).calledOnce ).to.be.true;
        });
    });
});
