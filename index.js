'use strict';

const executingNpmPath = require('executing-npm-path');

if (executingNpmPath) {
	module.exports = async function npmCliPath() {
		return executingNpmPath;
	};
} else {
	const realExecutablePath = require('real-executable-path');

	const getNpmCliPath = realExecutablePath('npm');

	if (process.platform !== 'win32') {
		module.exports = async function npmCliPath() {
			return getNpmCliPath;
		};
	} else {
		const {dirname, join} = require('path');

		const winUserInstalledNpmCliPath = require('win-user-installed-npm-cli-path');

		const getPreinstalledNpmCliPath = (async () => join(dirname(await getNpmCliPath), 'node_modules\\npm\\bin\\npm-cli.js'))();
		const getUserInstalledCliPath = (async () => {
			try {
				return await winUserInstalledNpmCliPath();
			} catch (err) {
				if (/lstat .*\\node_modules\\npm\\bin\\npm-cli\.js/.test(err.message)) {
					return null;
				}

				throw err;
			}
		})();

		module.exports = async function npmCliPath() {
			const [preinstalledCliPath, userInstalledCliPath] = await Promise.all([
				getPreinstalledNpmCliPath,
				getUserInstalledCliPath
			]);

			return userInstalledCliPath || preinstalledCliPath;
		};
	}
}
