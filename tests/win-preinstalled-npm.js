'use strict';

const {equal, ok} = require('assert').strict;
const {join, parse} = require('path');

const npmCliPath = require('..');
const test = require('testit');

test('resolve the `npm-cli.js` file path on Windows', async () => {
	const result = await npmCliPath();

	ok(result.startsWith(parse(__filename).root));
	ok(result.endsWith('\\node_modules\\npm\\bin\\npm-cli.js'));
	equal(require(join(result, '..\\..\\package.json')).version, process.env.npm_version);
});
