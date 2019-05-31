'use strict';

const {equal} = require('assert').strict;
const {join} = require('path');

const npmCliPath = require('..');
const test = require('testit');

test('resolve the path from where a user-installed npm CLI exists on Windows', async () => {
	const result = await npmCliPath();

	equal(result, join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'));
	equal(require(join(result, '..\\..\\package.json')).version, process.env.another_npm_version);
});
