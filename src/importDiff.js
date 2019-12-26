const { join } = require('path');
const fs = require('fs');

const parseDiff = require('./helpers/parseDiff');

const diffPath = join(process.cwd(), 'diff.txt');
const logger = require('./logger');
const { processDeleted, processAdded, processModified } = require('./helpers/processDiff');

const importSnippets = () => {
  const diffFile = fs.readFileSync(diffPath, 'utf-8');

  const diff = parseDiff(diffFile);
  if (diff.length === 0) {
    logger.info('There are no changes in snippets');
  }
  diff.forEach(async ({
    type, language, name, filePath,
  }) => {
    if (type === 'DELETED') {
      processDeleted(type, language, name, filePath);
    }
    if (type === 'ADDED') {
      processAdded(type, language, name, filePath);
    }
    if (type === 'MODIFIED') {
      processModified(type, language, name, filePath);
    }
  });
};

module.exports = importSnippets();
