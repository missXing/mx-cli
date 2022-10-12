'use strict';

const mxCliPluginVue = require('..');
const assert = require('assert').strict;

assert.strictEqual(mxCliPluginVue(), 'Hello from mxCliPluginVue');
console.info("mxCliPluginVue tests passed");
