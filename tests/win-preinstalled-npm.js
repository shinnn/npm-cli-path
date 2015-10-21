'use strict';

var path = require('path');

var npmCliPath = require('..');
var PinkiePromise = require('pinkie-promise');
var test = require('tape');

test('npmCliPath() on Windows', function(t) {
  t.plan(3);

  t.strictEqual(npmCliPath.name, 'npmCliPath', 'should have a function name.');

  npmCliPath()
  .then(function(result) {
    t.strictEqual(
      result,
      path.join(process.env.APPDATA, 'npm\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` file path.'
    );

    return PinkiePromise.resolve(result);
  })
  .then(function(result) {
    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.npm_version,
      'should not resolve the path from where user-installed npm exists.'
    );
  })
  .catch(t.fail);
});
