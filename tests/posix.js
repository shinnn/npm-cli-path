'use strict';

const pretendPlatform = require('pretend-platform');
const test = require('tape');

// HACK: Cache the dependency beforehand to avoid AppVeyor test failure
// https://ci.appveyor.com/project/ShinnosukeWatanabe/npm-cli-path/build/3/job/8udhhqrobqffxk2x#L108
require('real-executable-path');

test('npmCliPath() on POSIX', async t => {
	pretendPlatform('linux');
	process.env.PATH = 'node_modules';

	const npmCliPath = require('..');

	try {
		await npmCliPath();
	} catch (err) {
		t.ok(err instanceof Error, 'should return a Promise instance.');
	}

	t.end();
});
