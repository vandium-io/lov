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

                date: index.date().format( 'YYYY-MM-DD' ),

                anything: [ index.number(), index.string() ],

                mustChoose: index.either( index.number(), index.string() ).required(),

                alt: index.alternatives().try( index.number(), index.string() ).required()
            };

            let data = {

                str: 'Hello',

                num: '42',

                choice: 'that',

                yes: 'yes',

                obj: {

                    c: true
                },

                date: '2000-01-01',

                anything: '44',

                mustChoose: 'forty-four',

                alt: 'forty-4'
            };


            let result = index.validate( data, schema );

            expect( result.error ).to.be.null;
            expect( result.value.str ).to.equal( 'Hello' );
            expect( result.value.num ).to.equal( 42 );
            expect( result.value.choice ).to.equal( 'that' );
            expect( result.value.yes ).to.be.true;
            expect( result.value.obj ).to.eql( { c: true } );
            expect( result.value.date.getUTCFullYear() ).to.equal( 2000 );
            expect( result.value.date.getUTCMonth() ).to.equal( 0 );
            expect( result.value.date.getUTCDate() ).to.equal( 1 );
            expect( result.value.anything ).to.equal( 44 );
            expect( result.value.mustChoose ).to.equal( 'forty-four' );
            expect( result.value.alt ).to.equal( 'forty-4' );
        });
    });
});
