
const { join } = require('path');
const getDirectories = require('./helpers/getDirectories');

const WHITELISTED_LANGUAGES = ['javascript'];
const snippetsPath = join(process.cwd(), 'snippets');
const { Snippet } = require('./models');

const importAll = () => {
  const languages = getDirectories(snippetsPath);
  languages.forEach((language) => {
    if (!WHITELISTED_LANGUAGES.includes(language)) { return; }
    console.log('aaaaa');
    const packages = getDirectories(join(snippetsPath, language));
    packages.forEach(async (name) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require

      const snippetsData = require(join(snippetsPath, language, name, `${name}.json`));
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
