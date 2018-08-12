'use strict';

const pretendPlatform = require('pretend-platform');
const test = require('tape');

pretendPlatform('linux');
process.env.PATH = 'node_modules';
delete process.env.npm_execpath;

test('npmCliPath() on POSIX', async t => {
	const npmCliPath = require('..');

	try {
		await npmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch (err) {
		t.ok(err instanceof Error, 'should return a Promise instance.');
	}

	t.end();
});
