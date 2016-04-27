'use strict';

const lov = require( '../lib' );


const schema = {

    first: lov.string().trim().min( 1 ).max( 60 ),

    last: lov.string().trim().min( 1 ).max( 60 ).required(),

    dob: lov.date().format( 'YYYY-MM-DD' ).required(),

    favNumber: lov.number().min( 0 ).max( 150 ).required(),

    numbers: lov.array().items( lov.number() ),

    address: lov.object().keys( {

        street1: lov.string().trim().required(),

        street2: lov.string()
    })
};


let data = {

    first: '  Joe  ',

    last: 'Smith',

    dob: '1984-09-04',

    favNumber: '44',

    numbers: [ '3', 2, 24 ],

    address: {

        street1: '  1 Yonge Street'
    }
}

try {

    console.log( data );

    lov.validate( data, schema );

    console.log( data );
}
catch( err ) {

    console.log( err );
    console.log( err.cause );
}
