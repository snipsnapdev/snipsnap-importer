const { join } = require('path');
const getDirectories = require('./helpers/getDirectories');

const snippetsPath = join(process.cwd(), 'snippets');
const WHITELISTED_LANGUAGES = ['javascript'];

const { Snippet } = require('./models');

const start = () => {
  const languages = getDirectories(snippetsPath);
  languages.forEach((language) => {
    if (!WHITELISTED_LANGUAGES.includes(language)) { return; }
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

start();
