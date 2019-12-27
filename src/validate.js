
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
  scope: yup.string().required(),
  body: yup.array().of(yup.string()).required(),
  prefix: yup.array().of(yup.string()).required().test(
    null,
    'The first prefix should have the format `packageName trigger`. Example: `gatsby-image useStatisQuery`',
    testFirstPrefix,
  ),
  description: yup.string(),
}).noUnknown();


const validate = () => {
  const languages = getDirectories(snippetsPath);
  languages.forEach((language) => {
    if (!WHITELISTED_LANGUAGES.includes(language)) {
      logger.error('Unsupported language folder detected');
      throw Error;
    }
    const packages = getDirectories(join(snippetsPath, language));
    packages.forEach(async (name) => {
      const snippetsFile = join(snippetsPath, language, name, `${name}.json`);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const snippetsData = require(snippetsFile);
      Object.keys(snippetsData).forEach(async (key) => {
        try {
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
                },
              },
            ],
          };
          logger.error(msg);
          throw Error;
        }
      });
    });
  });
};


module.exports = validate();
