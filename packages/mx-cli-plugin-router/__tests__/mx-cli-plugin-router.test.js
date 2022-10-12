'use strict';

const mxCliPluginRouter = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliPluginRouter(), 'Hello from mxCliPluginRouter');
console.info("mxCliPluginRouter tests passed");
