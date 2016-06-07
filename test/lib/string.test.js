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

            it( 'nnumber value', function() {

                expect( new StringValidator().convert( 12345 ) ).to.equal( '12345' );
                expect( new StringValidator().convert( 12345.6789 ) ).to.equal( '12345.6789' );
            });

            it( 'boolean value', function() {

                expect( new StringValidator().convert( true ) ).to.equal( 'true' );
                expect( new StringValidator().convert( false ) ).to.equal( 'false' );
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

            it( 'with email()', function() {

                expect( new StringValidator().email().convert( 'info@vandium.io' ) ).to.equal( 'info@vandium.io' );
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

            it( 'fail: when when regex test fails', function() {

                let re = /[A-Z]+/;

                let validator = new StringValidator().regex( re );

                expect( validator.validate.bind( validator, 'str' ) ).to.throw( 'failed regex' );
            });

            it( 'fail: when regex is missing', function() {

                let validator = new StringValidator();

                expect( validator.regex.bind( validator ) ).to.throw( 'missing regex' );
            });
        });

        describe( '.uuid', function() {

            it( 'normal operation', function() {

                const uuid = '7cc56260-fa41-4043-a1fb-669ae8f9b216';

                let validator = new StringValidator();

                expect( validator.uuid() ).to.equal( validator );

                expect( validator.validate( uuid ) ).to.equal( uuid );
            });

            it( 'fail: when uuid is invalid', function() {

                const uuid = '7cc56260-fa41-4043-a1fb-669ae8f9b2166';   // extra '6'

                let validator = new StringValidator();

                expect( validator.uuid() ).to.equal( validator );

                expect( validator.validate.bind( validator, uuid ) ).to.throw( 'failed regex' );
            });
        });

        describe( '.guid', function() {

            it( 'normal operation', function() {

                const guid = '7cc56260-fa41-4043-a1fb-669ae8f9b216';

                let validator = new StringValidator();

                expect( validator.guid() ).to.equal( validator );

                expect( validator.validate( guid ) ).to.equal( guid );
            });

            it( 'fail: when uuid is invalid', function() {

                const guid = '7cc56260-fa41-4043-a1fb-669ae8f9b2166';   // extra '6'

                let validator = new StringValidator();

                expect( validator.guid() ).to.equal( validator );

                expect( validator.validate.bind( validator, guid ) ).to.throw( 'failed regex' );
            });
        });

        describe( '.insensitive', function() {

            it( 'without valid() values', function() {

                expect( new StringValidator().insensitive().validate( 'str' ) ).to.equal( 'str' );
            });

            it( 'with valid() values', function() {

                expect( new StringValidator().insensitive().valid( 'Str', 'num' ).validate( 'str' ) ).to.equal( 'str' );
            });
        });

        describe( '.lowercase', function() {

            it( 'normal operation', function() {

                expect( new StringValidator().lowercase().validate( 'Str' ) ).to.equal( 'str' );
            });

            it( 'used after uppercase()', function() {

                expect( new StringValidator().uppercase().lowercase().validate( 'Str' ) ).to.equal( 'str' );
            });
        });

        describe( '.uppercase', function() {

            it( 'normal operation', function() {

                expect( new StringValidator().uppercase().validate( 'Str' ) ).to.equal( 'STR' );
            });

            it( 'used after lowercase()', function() {

                expect( new StringValidator().lowercase().uppercase().validate( 'Str' ) ).to.equal( 'STR' );
            });
        });

        describe( '.email', function() {

            it( 'normal operation', function() {

                expect( new StringValidator().email().validate( 'info@vandium.io' ) ).to.equal( 'info@vandium.io' );
            });

            it( 'with uppercase() and trim()', function() {

                expect( new StringValidator().email().trim().uppercase().validate( '   info@vandium.io ' ) ).to.equal( 'INFO@VANDIUM.IO' );
            });
        });

        describe( '.valid', function() {

            it( 'case sensitive - matching', function() {

                expect( new StringValidator().valid( 'this', 'that' ).validate( 'this' ) ).to.equal( 'this' );
            });

            it( 'case sensitive - not matching', function() {

                let validator = new StringValidator();

                expect( validator.valid( 'this', 'that' ).validate.bind( validator, 'This' ) ).to.throw( 'does not match valid value(s)' );
            });

            it( 'with insensitive()', function() {

                expect( new StringValidator().valid( 'this', 'that' ).insensitive().validate( 'This' ) ).to.equal( 'This' );
            });
        });
    });
});
