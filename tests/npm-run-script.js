'use strict';

const {equal} = require('assert').strict;

const test = require('testit');
const npmCliPath = require('..');

test('resolve a path from thw `npm_execpath` environment variable inside an npm script', async () => {
	equal(await npmCliPath(), process.env.npm_execpath);
});
