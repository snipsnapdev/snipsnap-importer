const { readdirSync } = require('fs');

const getDirectories = (source) => readdirSync(source, { withFileTypes: true })
  .filter((item) => item.isDirectory())
  .map((dir) => dir.name);

module.exports = getDirectories;
