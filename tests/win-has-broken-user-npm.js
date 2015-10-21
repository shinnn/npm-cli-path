'use strict';

var path = require('path');

var fs = require('graceful-fs');
var npmCliPath = require('..');
var pify = require('pify');
var PinkiePromise = require('pinkie-promise');
var test = require('tape');

var fsP = pify(fs, PinkiePromise);

test('npmCliPath() when a non-file entity exists in the expected path on Windows', function(t) {
  t.plan(1);

  var cliPath = path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js');

  fsP.unlink(cliPath)
  .then(function() {
    return fsP.mkdir(cliPath);
  })
  .then(function() {
    return npmCliPath();
  })
  .then(t.fail, function(err) {
    t.strictEqual(
      err.message,
      cliPath + ' exists, but it\'s not a file.',
      'should be rejected.'
    );
  })
  .catch(t.fail);
});
