'use strict';

const test = require('tape');
const npmCliPath = require('..');

test('npmCliPath() inside an npm script', async t => {
	t.equal(
		await npmCliPath(),
		process.env.npm_execpath,
		'should resolve a path from `npm_execpath` environment variable.'
	);

	t.end();
});
