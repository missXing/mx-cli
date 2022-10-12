'use strict';

const mxCliPluginBabel = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliPluginBabel(), 'Hello from mxCliPluginBabel');
console.info("mxCliPluginBabel tests passed");
