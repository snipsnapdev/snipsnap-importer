#!/usr/bin/env node
const logger = require('./logger');

if (process.argv.length === 3) {
  const command = process.argv[2];
  switch (command) {
    case 'import:diff':
      // eslint-disable-next-line global-require
      require('./importDiff');
      break;
    case 'import:all':
      // eslint-disable-next-line global-require
      require('./importAll');
      break;
    case 'validate':
      // eslint-disable-next-line global-require
      require('./validate');
      break;
    default:
      logger.error('Unsupported command');
      throw Error;
  }
} else {
  logger.error('The number of arguments is invalid');
  throw Error;
}
