#!/usr/bin/env node
const logger = require('./logger');

if (process.argv.length === 3) {
  const command = process.argv[2];
  switch (command) {
    case 'import:diff':
      require('./importDiff');
      break;
    case 'import:all':
      require('./importAll');
      break;
    default:
      logger.error('Unsupported command');
      throw Error;
      break;
  }
} else {
  logger.error('The number of arguments is invalid');
  throw Error;
}
