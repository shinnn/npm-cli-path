'use strict';

var test = require('tape');

process.env.PATH = 'node_modules';

test('npmCliPath() when npm is not installed', function(t) {
  t.plan(1);

  require('..')().then(t.fail, function(err) {
    t.ok(/not found: npm|spawn ENOENT/.test(err.message), 'should be rejected.');
  })
  .catch(t.fail);
});
