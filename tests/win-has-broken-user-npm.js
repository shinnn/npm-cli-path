'use strict';

const {join} = require('path');
const {mkdir, unlink} = require('fs');
const {promisify} = require('util');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() when a non-file entity exists in the expected path on Windows', async t => {
	const cliPath = join(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

	await promisify(unlink)(cliPath);
	await promisify(mkdir)(cliPath);

	try {
		await npmCliPath();
		t.fail('Unexpectedly succeeded.');
	} catch ({message}) {
		t.equal(
			message,
			`${cliPath} exists, but it's not a file.`,
			'should be rejected.'
		);
	}

	t.end();
});
