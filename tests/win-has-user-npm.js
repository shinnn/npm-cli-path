'use strict';

var path = require('path');

var npmCliPath = require('..');
var PinkiePromise = require('pinkie-promise');
var test = require('tape');

test('npmCliPath() when npm is installed with `npm install -g npm` on Windows', function(t) {
  t.plan(2);

  npmCliPath()
  .then(function(result) {
    t.strictEqual(
      result,
      path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` file path.'
    );

    return PinkiePromise.resolve(result);
  })
  .then(function(result) {
    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.another_npm_version,
      'should resolve the path from where user-installed npm exists.'
    );
  })
  .catch(t.fail);
});
