'use strict';

const test = require('tape');

process.env.PATH = 'node_modules';

test('npmCliPath() when npm is not installed', t => {
  t.plan(1);

  require('..')().then(t.fail, err => {
    t.strictEqual(err.message, 'not found: npm', 'should be rejected.');
  })
  .catch(t.fail);
});
