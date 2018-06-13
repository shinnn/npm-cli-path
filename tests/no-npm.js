'use strict';

const test = require('tape');

process.env.PATH = 'node_modules';
delete process.env.npm_execpath;

test('npmCliPath() when npm is not installed', async t => {
	const npmCliPath = require('..');

	try {
		await npmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch ({code}) {
		// If we drop Node.js 8 support, just: t.equal(code, 'ENOENT', 'should be rejected.');
		t.ok(/^(ENOENT|1)$/.test(String(code)), 'should be rejected.');
	}

	t.end();
});
