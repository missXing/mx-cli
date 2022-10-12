'use strict';

const mxMonorepoCli = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxMonorepoCli(), 'Hello from mxMonorepoCli');
console.info("mxMonorepoCli tests passed");
