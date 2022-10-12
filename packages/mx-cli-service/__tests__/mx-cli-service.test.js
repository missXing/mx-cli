'use strict';

const mxCliService = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliService(), 'Hello from mxCliService');
console.info("mxCliService tests passed");
