const { join } = require('path');

const diffRegExp = new RegExp(/(M|A|D).*snippets\/(.*?)\/(.*?)\/(.*.json)/);

// Possible statuses https://stackoverflow.com/a/8691226
const typeConverter = (type) => {
  switch (type) {
    case 'A':
      return 'ADDED';
    case 'D':
      return 'DELETED';
    case 'M':
      return 'MODIFIED';
    default:
      process.exit(1);
  }
};
module.exports = (diff) => {
  // filter Boolean is a hack to remove empty string values
  const diffLines = diff.split(/\n/).filter(Boolean);
  const formattedDiff = [];

  diffLines.forEach((line) => {
    const result = diffRegExp.exec(line);
    if (result) {
      const [, type, language, name, fileName] = result;
      formattedDiff.push({
        type: typeConverter(type),
        language,
        name,
        fileName,
        filePath: join(process.cwd(), 'snippets', language, name, fileName),
      });
    }
  });
  return formattedDiff;
};
