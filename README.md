# mypromises6

  A [Promises/A+](http://promises-aplus.github.com/promises-spec/) implementation using ES6 features.

[![Build Status](https://travis-ci.org/kreeeeeeeees/mypromises6.png)](https://travis-ci.org/kreeeeeeeees/mypromises6)

## Installation

    $ npm install mypromises6

## Usage

```javascript
var Promise = require('mypromises6');

var promise = new Promise();
get('http://www.google.com', function (err, res) {
  if (err) promise.reject(err);
  else promise.resolve(res);
});

promise.then(
  console.log.bind(console, 'fulfilled:'),
  console.log.bind(console, 'rejected:')
);
```
