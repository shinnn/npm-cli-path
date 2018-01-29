'use strict';

const {join} = require('path');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() when npm is installed with `npm install -g npm` on Windows', async t => {
	const result = await npmCliPath();

	t.equal(
		result,
		join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
		'should resolve the `npm-cli.js` file path.'
	);

	t.equal(
		require(join(result, '..\\..\\package.json')).version,
		process.env.another_npm_version,
		'should resolve the path from where user-installed npm exists.'
	);

	t.end();
});
