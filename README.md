[![Build Status](https://travis-ci.org/vandium-io/lov.svg?branch=master)](https://travis-ci.org/vandium-io/lov)
[![npm version](https://badge.fury.io/js/lov.svg)](https://badge.fury.io/js/lov)

# Lightweight Object Validator (lov)

Validates objects based on validation schemas. Originally designed as a lightweight replacement for the popular
[Joi](https://github.com/hapijs/joi) library (which is excellent but too heavy for use with smaller/lighter environments such as AWS Lambda).

## Features

* Programatic creation of validator objects using a fluent API
* Automatic conversion of values (strings to numbers, etc.)
* Lightweight with minimal dependencies
* Low startup overhead and quick execution
* Compatible with base Joi API
* Node.js 4.3.2 compatible

## Installation

Install via npm.

	npm install lov --save

## Getting Started

It's easy to start using Lov in your project:

```js
var lov = require( 'lov' );

let schema = {

    id: lov.string().uuid().trim().required(),

    name: lov.string().min( 1 ).max( 100 ).required(),

    age: lov.number().min( 0 ).max( 120 ),

    address: lov.object().keys( {

            street: lov.string().max( 60 ).required(),

            street2: lov.string().max( 60 ),

            city: lov.string.max( 40 ).required(),

            state: lov.string().max( 20 ).required(),

            postal: lov.string().max( 20 ).uppercase().required(),

            country: lov.string().max( 60 ).required()

        }).required(),

    email: lov.string().email()    
};

let value = {

    id: 'f09c9ea1-114f-483a-89ef-b37d34803a79',
    name: '   Fred Smith  ',
    age: '44',
    address: {
        street: '1 Yonge Street',
        city: 'Toronto',
        state: 'ON',
        postal: 'm5e 1W7',
        country: 'Canada'
    },
    email: 'feedback@vandium.io'
}

let result = lov.validate( value, schema );

// result.error = null
// result.value = {
//
//     id: 'f09c9ea1-114f-483a-89ef-b37d34803a79',
//     name: 'Fred Smith',                              // String trimmed
//     age: 44,                                         // '44' coverted to 44
//     address: {
//         street: '1 Yonge Street',
//         city: 'Toronto',
//         state: 'ON',
//         postal: 'M5E 1W7',                           // Uppercase letters
//         country: 'Canada'
//     },
//     email: 'feedback@vandium.io'
// }
```

## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact us at `feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
