const logger = require('../logger');
const { Snippet } = require('../models');
const replaceKeyToUnique = require('../helpers/replaceKeyToUnique');

const processDeleted = async (type, language, name, filePath) => {
  const snippet = await Snippet.destroy({
    where: {
      language,
      name,
    },
  });
  if (snippet) {
    logger.info(`${language}:${name} snippets successfully deleted`);
  } else {
    logger.error(`${language}:${name} snippets were not deleted`);
  }
};


const processAdded = async (type, language, name, filePath) => {
  const snippets = replaceKeyToUnique(require(filePath), name);
  const [, created] = await Snippet.findOrCreate({
    where: {
      language,
      name,
    },
    defaults: {
      language,
      name,
      snippets,
    },
  });
  if (created) {
    logger.info(`${language}:${name} snippets successfully created`);
  } else {
    logger.error(`${language}:${name} snippets already exist`);
  }
};

const processModified = async (type, language, name, filePath) => {
  const snippets = replaceKeyToUnique(require(filePath), name);
  const [snippet] = await Snippet.update({
    snippets,
  }, {
    where: {
      language,
      name,
    },
  });
  if (snippet) {
    logger.info(`${language}:${name} snippets successfully updated`);
  } else {
    logger.error(`${language}:${name} snippets have not found`);
  }
};

module.exports = {
  processDeleted, processModified, processAdded,
};
