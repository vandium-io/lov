'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const index = require( '../../lib/index' );

describe( 'lib/index', function() {

    describe( '.any', function() {

        it( 'normal operation', function() {

            expect( index.any().constructor.name ).to.equal( 'AnyValidator' );
        });
    });

    describe( '.string', function() {

        it( 'normal operation', function() {

            expect( index.string().constructor.name ).to.equal( 'StringValidator' );
        });
    });

    describe( '.number', function() {

        it( 'normal operation', function() {

            expect( index.number().constructor.name ).to.equal( 'NumberValidator' );
        });
    });

    describe( '.boolean', function() {

        it( 'normal operation', function() {

            expect( index.boolean().constructor.name ).to.equal( 'BooleanValidator' );
        });
    });

    describe( '.date', function() {

        it( 'normal operation', function() {

            expect( index.date().constructor.name ).to.equal( 'DateValidator' );
        });
    });

    describe( '.binary', function() {

        it( 'normal operation', function() {

            expect( index.binary().constructor.name ).to.equal( 'BinaryValidator' );
        });
    });

    describe( '.object', function() {

        it( 'normal operation', function() {

            expect( index.object().constructor.name ).to.equal( 'ObjectValidator' );
        });
    });

    describe( '.array', function() {

        it( 'normal operation', function() {

            expect( index.array().constructor.name ).to.equal( 'ArrayValidator' );
        });
    });

    describe( '.validate', function() {

        it( 'normal operation', function() {

            const schema = {

                str: index.string().trim().min( 4 ).max( 20 ).required(),

                num: index.number().min( 0 ).max( 1000 ).required(),

                choice: index.any().valid( 'this', 'that' ).required(),

                yes: index.boolean().required(),

                obj: index.object().keys( {

                        a: index.string(),

                        b: index.number(),

                        c: index.boolean().required(),

                    }).required(),

                date: index.date().format( 'YYYY-MM-DD' )
            };

            let data = {

                str: 'Hello',

                num: '42',

                choice: 'that',

                yes: 'yes',

                obj: {

                    c: true
                },

                date: '2000-01-01'
            };

            index.validate( data, schema );

            expect( data ).to.eql( { str: 'Hello', num: 42, choice: 'that', yes: true, obj: { c: true }, date: new Date( '2000-01-01T05:00:00.000Z' ) } );
        });
    });
});