'use strict';

const executingNpmPath = require('executing-npm-path');

if (executingNpmPath) {
	module.exports = async function npmCliPath() {
		return executingNpmPath;
	};
} else {
	const {promisify} = require('util');
	const {realpath} = require('fs');

	const which = require('which');

	const promisifiedRealpath = promisify(realpath);
	const promisifiedWhich = promisify(which);
	const getNpmCliPath = async () => promisifiedRealpath(await promisifiedWhich('npm'));

	if (process.platform !== 'win32') {
		module.exports = async function npmCliPath() {
			return getNpmCliPath();
		};
	} else {
		const {dirname, join} = require('path');

		const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

		module.exports = async function npmCliPath() {
			const [preinstalledCliPath, userInstalledCliPath] = await Promise.all([
				(async function getPreinstalledNpmCliPath() {
					return join(dirname(await getNpmCliPath()), 'node_modules\\npm\\bin\\npm-cli.js');
				})(),
				(async function getUserInstalledCliPath() {
					try {
						return await winUserInstalledNpmCliPath();
					} catch (err) {
						if (/lstat .*\\node_modules\\npm\\bin\\npm-cli\.js/u.test(err.message)) {
							return null;
						}

						throw err;
					}
				})()
			]);

			return userInstalledCliPath || preinstalledCliPath;
		};
	}
}
