/*!
 * npm-cli-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/npm-cli-path
*/
'use strict';

var realExecutablePath = require('real-executable-path');

var getNpmCliPath = realExecutablePath('npm');

if (process.platform !== 'win32') {
  module.exports = function npmCliPath() {
    return getNpmCliPath;
  };
} else {
  var path = require('path');

  var PinkiePromise = require('pinkie-promise');
  var winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

  var getPreinstalledNpmCliPath = getNpmCliPath.then(function(cmdPath) {
    return PinkiePromise.resolve(path.join(path.dirname(cmdPath), 'node_modules\\npm\\bin\\npm-cli.js'));
  });

  var getUserInstalledCliPath = winUserInstalledNpmCliPath()
  .then(PinkiePromise.resolve.bind(PinkiePromise), function(err) {
    if (/lstat .*\\node_modules\\npm\\bin\\npm-cli\.js/.test(err.message)) {
      return PinkiePromise.resolve(null);
    }

    return PinkiePromise.reject(err);
  });

  module.exports = function npmCliPath() {
    return PinkiePromise.all([
      getPreinstalledNpmCliPath,
      getUserInstalledCliPath
    ]).then(function(results) {
      var userInstalledCliPath = results[1];

      if (userInstalledCliPath) {
        return PinkiePromise.resolve(userInstalledCliPath);
      }

      return PinkiePromise.resolve(results[0]);
    });
  };
}
