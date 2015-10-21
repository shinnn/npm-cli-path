'use strict';

var pretendPlatform = require('pretend-platform');
var test = require('tape');

// HACK: Cache the dependency beforehand to avoid AppVeyor test failure
// https://ci.appveyor.com/project/ShinnosukeWatanabe/npm-cli-path/build/3/job/8udhhqrobqffxk2x#L108
require('real-executable-path');

test('npmCliPath() on POSIX', function(t) {
  t.plan(2);

  pretendPlatform('linux');
  process.env.PATH = 'node_modules';

  var npmCliPath = require('..');

  t.strictEqual(npmCliPath.name, 'npmCliPath', 'should have a function name.');

  npmCliPath()
  .then(t.fail, function(err) {
    t.ok(err instanceof Error, 'should return a Promise instance.');
  })
  .catch(t.fail);
});
