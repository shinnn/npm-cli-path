'use strict';

const {join, parse} = require('path');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() on Windows', async t => {
	const result = await npmCliPath();

	t.ok(
		result.startsWith(parse(__filename).root),
		'should resolve an absolute path.'
	);

	t.ok(
		result.endsWith('\\node_modules\\npm\\bin\\npm-cli.js'),
		'should resolve the `npm-cli.js` file path.'
	);

	t.equal(
		require(join(result, '..\\..\\package.json')).version,
		process.env.npm_version,
		'should not resolve the path from where user-installed npm exists.'
	);

	t.end();
});
