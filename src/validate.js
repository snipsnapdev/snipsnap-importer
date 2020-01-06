
const { join } = require('path');
const yup = require('yup');
const getDirectories = require('./helpers/getDirectories');
const { WHITELISTED_LANGUAGES } = require('./constants');
const logger = require('./logger');

const snippetsPath = join(process.cwd(), 'snippets');

function testFirstPrefix(item) {
  const prefixRegExp = new RegExp(`${this.options.packageName}\\s.*`);
  return prefixRegExp.exec(item[0]);
}

const snippetSchema = yup.object().shape({
  scope: yup.string().required().lowercase(),
  body: yup.array().of(yup.string()).required(),
  prefix: yup.array().of(
    yup.string()
      .lowercase(),
  ).required()
    .test(
      null,
      'The first prefix should have the format `packageName trigger`. Example: `gatsby-image usestatisquery`',
      testFirstPrefix,
    ),
  description: yup.string(),
}).noUnknown();

// Validate for that Object key is in kebab-case
const snippetKeySchema = yup.string().lowercase().matches(/^[a-z-0-9]+$/, 'Object key should be in kebab-case');

const validate = () => {
  const languages = getDirectories(snippetsPath);
  languages.forEach((language) => {
    if (!WHITELISTED_LANGUAGES.includes(language)) {
      logger.error('Unsupported language folder detected');
      process.exit(1);
    }
    const packages = getDirectories(join(snippetsPath, language));
    packages.forEach(async (name) => {
      const snippetsFile = join(snippetsPath, language, name, `${name}.json`);
      let snippetsData = {};
      // Validate file location at the right place
      try {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        snippetsData = require(snippetsFile);
      } catch (err) {
        const msg = {
          errors: [
            {
              title: 'Invalid File',
              detail: `Can't find valid json object at ${snippetsFile}`,
            },
          ],
        };
        logger.error(msg);
        process.exit(1);
      }
      // Validate snippets object
      Object.keys(snippetsData).forEach(async (key) => {
        try {
          await snippetKeySchema.validate(key, { strict: true });
          await snippetSchema.validate(snippetsData[key], { strict: true, packageName: name });
        } catch (err) {
          const msg = {
            errors: [
              {
                title: err.name,
                detail: err.errors,
                source: {
                  language,
                  name,
                  value: err.value,
                },
              },
            ],
          };
          logger.error(msg);
          process.exit(1);
        }
      });
    });
  });
};


module.exports = validate();
