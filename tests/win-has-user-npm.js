'use strict';

const path = require('path');

const npmCliPath = require('..');
const test = require('tape');

test('npmCliPath() when npm is installed with `npm install -g npm` on Windows', t => {
  t.plan(2);

  npmCliPath()
  .then(result => {
    t.strictEqual(
      result,
      path.resolve(__dirname, '..\\tmp\\node_modules\\npm\\bin\\npm-cli.js'),
      'should resolve the `npm-cli.js` file path.'
    );

    return Promise.resolve(result);
  })
  .then(result => {
    t.strictEqual(
      require(path.join(result, '..\\..\\package.json')).version,
      process.env.another_npm_version,
      'should resolve the path from where user-installed npm exists.'
    );
  })
  .catch(t.fail);
});
