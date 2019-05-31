'use strict';

const {rejects} = require('assert').strict;

const test = require('testit');

process.env.PATH = 'node_modules';
delete process.env.npm_execpath;

test('fail when npm CLI is not installed', async () => {
	const npmCliPath = require('..');

	await rejects(async () => npmCliPath(), {code: 'ENOENT'});
});
