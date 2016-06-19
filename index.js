/*!
 * npm-cli-path | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/npm-cli-path
*/
'use strict';

const realExecutablePath = require('real-executable-path');

const getNpmCliPath = realExecutablePath('npm');

if (process.platform !== 'win32') {
  module.exports = function npmCliPath() {
    return getNpmCliPath;
  };
} else {
  const path = require('path');

  const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

  const getPreinstalledNpmCliPath = getNpmCliPath.then(cmdPath => {
    return Promise.resolve(path.join(path.dirname(cmdPath), 'node_modules\\npm\\bin\\npm-cli.js'));
  });

  const getUserInstalledCliPath = winUserInstalledNpmCliPath()
  .then(Promise.resolve.bind(Promise), err => {
    if (/lstat .*\\node_modules\\npm\\bin\\npm-cli\.js/.test(err.message)) {
      return Promise.resolve(null);
    }

    return Promise.reject(err);
  });

  module.exports = function npmCliPath() {
    return Promise.all([
      getPreinstalledNpmCliPath,
      getUserInstalledCliPath
    ]).then(results => {
      const userInstalledCliPath = results[1];

      if (userInstalledCliPath) {
        return Promise.resolve(userInstalledCliPath);
      }

      return Promise.resolve(results[0]);
    });
  };
}
