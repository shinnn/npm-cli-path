'use strict';

const path = require('path');

const fs = require('graceful-fs');
const npmCliPath = require('..');
const pify = require('pify');
const test = require('tape');

const fsP = pify(fs);

test('npmCliPath() when a non-file entity exists in the expected path on Windows', t => {
  t.plan(1);

  const cliPath = path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

  fsP.unlink(cliPath)
  .then(() => fsP.mkdir(cliPath))
  .then(() => npmCliPath())
  .then(t.fail, err => {
    t.strictEqual(
      err.message,
      `${cliPath} exists, but it's not a file.`,
      'should be rejected.'
    );
  })
  .catch(t.fail);
});
