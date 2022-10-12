'use strict';

const mxCliPluginLinter = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliPluginLinter(), 'Hello from mxCliPluginLinter');
console.info("mxCliPluginLinter tests passed");
