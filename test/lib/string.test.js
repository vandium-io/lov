'use strict';

/*jshint expr: true*/

const expect = require( 'chai' ).expect;

const StringValidator = require( '../../lib/string' );

describe( 'lib/string', function() {

    describe( 'StringValidator', function() {

        describe( 'constructor', function() {

            it( 'normal operation', function() {

                new StringValidator();
            });
        });

        describe( '.convert', function() {

            it( 'string value', function() {

                expect( new StringValidator().convert( ' str ' ) ).to.equal( ' str ' );
            });

            it( 'non-string value', function() {

                expect( new StringValidator().convert( 12345 ) ).to.equal( '12345' );
            });

            it( 'with trim()', function() {

                expect( new StringValidator().trim().convert( '  str  ' ) ).to.equal( 'str' );
            });

            it( 'with lowercase()', function() {

                expect( new StringValidator().lowercase().convert( 'Str' ) ).to.equal( 'str' );
            })

            it( 'with lowercase() and trim()', function() {

                expect( new StringValidator().lowercase().trim().convert( '  Str ' ) ).to.equal( 'str' );
            })

            it( 'with uppercase()', function() {

                expect( new StringValidator().uppercase().convert( 'Str' ) ).to.equal( 'STR' );
            })

            it( 'with uppercase() and trim()', function() {

                expect( new StringValidator().uppercase().trim().convert( ' Str ' ) ).to.equal( 'STR' );
            })

            it( 'empty value', function() {

                expect( new StringValidator().convert() ).to.equal( undefined );
            });
        });

        describe( '.min', function() {

            it( 'normal operation', function() {

                let validator = new StringValidator();

                // must chain
                expect( validator.min( 3 ) ).to.to.equal( validator );

                expect( validator.validate( 'str' ) ).to.equal( 'str' );
            });

            it( 'fail when string is too short', function() {

                let validator = new StringValidator().min( 4 );

                expect( validator.validate.bind( validator, 'str' ) ).to.throw( 'must have length of at least: 4' );
            });
        });

        describe( '.max', function() {

            it( 'normal operation', function() {

                let validator = new StringValidator();

                // must chain
                expect( validator.max( 3 ) ).to.to.equal( validator );

                expect( validator.validate( 'str' ) ).to.equal( 'str' );
            });

            it( 'fail when string is too long', function() {

                let validator = new StringValidator().max( 3 );

                expect( validator.validate.bind( validator, 'string' ) ).to.throw( 'must have length less than or equal to 3' );
            });
        });

        describe( '.regex', function() {

            it( 'normal operation', function() {

                let re = /[A-Z]+/;

                let validator = new StringValidator();

                // must chain
                expect( validator.regex( re ) ).to.to.equal( validator );

                expect( validator.validate( 'STR' ) ).to.equal( 'STR' );
            });

            it( 'fail when when regex test fails', function() {

                let re = /[A-Z]+/;

                let validator = new StringValidator().regex( re );

                expect( validator.validate.bind( validator, 'str' ) ).to.throw( 'failed regex' );
            });
        });
    });
});
