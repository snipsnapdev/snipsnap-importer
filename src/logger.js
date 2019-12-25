const { NODE_ENV } = process.env;

const prettierOptions = NODE_ENV === 'development' ? {
  translateTime: true,
} : false;

const logger = require('pino')({
  enabled: NODE_ENV !== 'test',
  prettyPrint: prettierOptions,
});

module.exports = logger;
