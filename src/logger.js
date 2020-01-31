const { NODE_ENV } = process.env;

const prettierOptions = {
  translateTime: true,
}

const logger = require('pino')({
  enabled: NODE_ENV !== 'test',
  prettyPrint: prettierOptions,
});

module.exports = logger;
