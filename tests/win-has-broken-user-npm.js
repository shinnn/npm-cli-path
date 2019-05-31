'use strict';

const {join} = require('path');
const {mkdir, unlink} = require('fs').promises;
const {rejects} = require('assert').strict;

const npmCliPath = require('..');
const test = require('testit');

test('fail when a non-file entity exists in the expected path on Windows', async () => {
	const cliPath = join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

	await unlink(cliPath);
	await mkdir(cliPath);
	await rejects(async () => npmCliPath(), {message: `${cliPath} exists, but it's not a file.`});
});
