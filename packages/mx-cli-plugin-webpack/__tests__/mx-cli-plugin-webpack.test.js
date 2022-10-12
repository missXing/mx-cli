'use strict';

const mxCliPluginWebpack = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliPluginWebpack(), 'Hello from mxCliPluginWebpack');
console.info("mxCliPluginWebpack tests passed");
