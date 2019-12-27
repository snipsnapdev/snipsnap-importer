
const { join } = require('path');
const getDirectories = require('./helpers/getDirectories');
const { Snippet } = require('./models');
const modifySnippets = require('./helpers/modifySnippets');
const { WHITELISTED_LANGUAGES } = require('./constants');

const snippetsPath = join(process.cwd(), 'snippets');

const importAll = () => {
  const languages = getDirectories(snippetsPath);
  languages.forEach((language) => {
    if (!WHITELISTED_LANGUAGES.includes(language)) { return; }
    const packages = getDirectories(join(snippetsPath, language));
    packages.forEach(async (name) => {
      const packageSnippetsPath = join(snippetsPath, language, name, `${name}.json`);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const snippetsData = modifySnippets(require(packageSnippetsPath), language, name);
      const snippetsDefaults = {
        language,
        name,
        snippets: snippetsData,
      };
      // TODO add snippet validation logic

      const [snippet, created] = await Snippet.findOrCreate({
        where: {
          language,
          name,
        },
        defaults: {
          ...snippetsDefaults,
        },
      });
      if (!created && snippet) {
        await snippet.update({ snippets: snippetsData });
      }
    });
  });
};

module.exports = importAll();
