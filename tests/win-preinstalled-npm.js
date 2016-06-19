'use strict';

const path = require('path');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() on Windows', t => {
  t.plan(3);

  t.strictEqual(npmCliPath.name, 'npmCliPath', 'should have a function name.');

  npmCliPath()
  .then(result => {
    t.strictEqual(
      result,
      path.join(process.env.APPDATA, 'npm\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` file path.'
    );

    return Promise.resolve(result);
  })
  .then(result => {
    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.npm_version,
      'should not resolve the path from where user-installed npm exists.'
    );
  })
  .catch(t.fail);
});
