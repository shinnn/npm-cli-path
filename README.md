# npm-cli-path

[![npm version](https://img.shields.io/npm/v/npm-cli-path.svg)](https://www.npmjs.com/package/npm-cli-path)
[![Build Status](https://travis-ci.com/shinnn/npm-cli-path.svg?branch=master)](https://travis-ci.com/shinnn/npm-cli-path)
[![codecov](https://codecov.io/gh/shinnn/npm-cli-path/branch/master/graph/badge.svg)](https://codecov.io/gh/shinnn/npm-cli-path)

Resolve the path of [`npm-cli.js`][npm-cli] included in the globally installed [npm](https://www.npmjs.com/) CLI

```javascript
const npmCliPath = require('npm-cli-path');

(async () => {
  const path = npmCliPath(); //=> '/usr/local/lib/node_modules/npm/bin/npm-cli.js'
})();
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install npm-cli-path
```

## API

```javascript
const npmCliPath = require('npm-cli-path');
```

### npmCliPath()

Return: `Promise<string>`

It resolves the path of [`npm-cli.js`][npm-cli] which is the entry point of [npm CLI](https://github.com/npm/cli).

## License

[ISC License](./LICENSE) © 2017 - 2019 Watanabe Shinnosuke

[npm-cli]: https://github.com/npm/cli/blob/latest/bin/npm-cli.js
