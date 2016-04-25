'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const NumberValidator = require( '../../lib/number' );

describe( 'lib/number', function() {

    describe( 'NumberValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                new NumberValidator();
            });
        });

        describe( '.convert', function() {

            it( 'value is an int', function() {

                expect( new NumberValidator().convert( 12345 ) ).to.equal( 12345 );
            });

            it( 'value is a float', function() {

                expect( new NumberValidator().convert( 12345.678 ) ).to.equal( 12345.678 );
            });

            it( 'value is a string [int]', function() {

                expect( new NumberValidator().convert( '12345' ) ).to.equal( 12345 );
            });

            it( 'value is a string [float]', function() {

                expect( new NumberValidator().convert( '12345.678' ) ).to.equal( 12345.678 );
            });

            it( 'with precision() [float]', function() {

                expect( new NumberValidator().precision( 2 ).convert( 12345.6789 ) ).to.equal( 12345.68 );
            });

            it( 'with precision() [int]', function() {

                expect( new NumberValidator().precision( 2 ).convert( 12345 ) ).to.equal( 12345.00 );
            });

            it( 'with precision() [string]', function() {

                expect( new NumberValidator().precision( 2 ).convert( '12345.678' ) ).to.equal( 12345.68 );
            });

            it( 'with integer()', function() {

                expect( new NumberValidator().integer().convert( '12345' ) ).to.equal( 12345 );
            });
        });

        describe( '.min', function() {

            [
                [ 2, 3 ],
                [ 2.1, 3 ],
                [ 2, 3.1 ],
                [ 2.1, 3.1 ]

            ].forEach( function( test ) {

                it( 'value = ' + test[1].toString() + ', min = ' + test[0], function() {

                    expect( new NumberValidator().min( test[0] ).validate( test[1] ) ).to.equal( test[1] );
                });
            })

            it( 'fail: when value is less than min', function() {

                let validator = new NumberValidator();

                expect( validator.min( 2 ).validate.bind( validator, 1 ) ).to.throw( 'must be greater than or equal to 2' );
            });
        });

        describe( '.max', function() {

            [
                [ 4, 3 ],
                [ 4.1, 3 ],
                [ 4, 3.1 ],
                [ 4.1, 3.1 ]

            ].forEach( function( test ) {

                it( 'value = ' + test[1].toString() + ', max = ' + test[0], function() {

                    expect( new NumberValidator().max( test[0] ).validate( test[1] ) ).to.equal( test[1] );
                });
            })

            it( 'fail: when value is greater than max', function() {

                let validator = new NumberValidator();

                expect( validator.max( 2 ).validate.bind( validator, 3 ) ).to.throw( 'must be less than or equal to 2' );
            });
        });

        describe( '.positive', function() {

            it( 'positive number', function() {

                expect( new NumberValidator().positive().validate( 3 ) ).to.equal( 3 );
            });

            it( 'zero', function() {

                expect( new NumberValidator().positive().validate( 0 ) ).to.equal( 0 );
            });

            it( 'fail: when negative', function() {

                let validator = new NumberValidator();

                expect( validator.positive().validate.bind( validator, -0.5 ) ).to.throw( 'must be greater than or equal to 0' );
            });
        });

        describe( '.negative', function() {

            it( 'negative number', function() {

                expect( new NumberValidator().negative().validate( -3 ) ).to.equal( -3 );
            });

            it( 'zero', function() {

                expect( new NumberValidator().negative().validate( 0 ) ).to.equal( 0 );
            });

            it( 'fail: when negative', function() {

                let validator = new NumberValidator();

                expect( validator.negative().validate.bind( validator, 0.5 ) ).to.throw( 'must be less than or equal to 0' );
            });
        });

        describe( '.integer', function() {

            it( 'int value', function() {

                expect( new NumberValidator().integer().validate( -3 ) ).to.equal( -3 );
                expect( new NumberValidator().integer().validate( 3 ) ).to.equal( 3 );
                expect( new NumberValidator().integer().validate( 0 ) ).to.equal( 0 );
            });

            it( 'fail: when using a float', function() {

                let validator = new NumberValidator();

                expect( validator.integer().validate.bind( validator, 0.5 ) ).to.throw( 'expecting integer' );
            });
        });

        describe( '.float', function() {

            it( 'normal operation', function() {

                expect( new NumberValidator().float().validate( 3.5 ) ).to.equal( 3.5 );
            });

            it( 'fail: when using integer', function() {

                let validator = new NumberValidator();

                expect( validator.float().validate.bind( validator, 5 ) ).to.throw( 'expecting floating point number' );
            });
        });
    });
});
