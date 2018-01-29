'use strict';

const path = require('path');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() on Windows', async t => {
	const result = await npmCliPath();

	t.equal(
		result,
		path.join(process.env.APPDATA, 'npm\\node_modules\\npm\\bin\\npm-cli.js'),
		'should resolve the `npm-cli.js` file path.'
	);

	t.equal(
		require(path.join(result, '..\\..\\package.json')).version,
		process.env.npm_version,
		'should not resolve the path from where user-installed npm exists.'
	);

	t.end();
});
