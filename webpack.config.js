'use strict';

const devConfig = require('./build/webpack.dev');

module.exports = (function () {
  let config;

  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'develop':
    default:
      config = devConfig;
      break;
  }

  return config;
})();
