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

            expect( data.str ).to.equal( 'Hello' );
            expect( data.num ).to.equal( 42 );
            expect( data.choice ).to.equal( 'that' );
            expect( data.yes ).to.be.true;
            expect( data.obj ).to.eql( { c: true } );
            expect( data.date.getTime() ).to.equal( 946702800000 );
        });
    });
});
