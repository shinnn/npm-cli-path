'use strict';

const realExecutablePath = require('real-executable-path');

const getNpmCliPath = realExecutablePath('npm', {});

if (process.platform !== 'win32') {
	module.exports = function npmCliPath() {
		return getNpmCliPath;
	};
} else {
	const {dirname, join} = require('path');

	const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

	const getPreinstalledNpmCliPath = getNpmCliPath.then(cmdPath => join(dirname(cmdPath), 'node_modules\\npm\\bin\\npm-cli.js'));

	const getUserInstalledCliPath = winUserInstalledNpmCliPath()
	.then(Promise.resolve.bind(Promise), err => {
		if (/lstat .*\\node_modules\\npm\\bin\\npm-cli\.js/.test(err.message)) {
			return null;
		}

		return Promise.reject(err);
	});

	module.exports = function npmCliPath() {
		return Promise.all([
			getPreinstalledNpmCliPath,
			getUserInstalledCliPath
		]).then(([preinstalledCliPath, userInstalledCliPath]) => userInstalledCliPath || preinstalledCliPath);
	};
}
