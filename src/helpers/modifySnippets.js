const SHA256 = require('crypto-js/sha256');
const { pipe } = require('../helpers/common');

const replaceKeyToUnique = (snippets, language, packageName) => {
  const newSnippets = { ...snippets };
  Object.keys(snippets).forEach((snippetName) => {
    const digit = SHA256(language + packageName + snippetName).toString().slice(-7);
    const newSnippetName = `${snippetName}-${digit}`;
    newSnippets[newSnippetName] = newSnippets[snippetName];
    delete newSnippets[snippetName];
  });
  return newSnippets;
};

// Add empty string description for better visual rendering in the popup
const addBlankDescription = (snippets) => {
  const newSnippets = { ...snippets };
  Object.keys(snippets).forEach((snippetName) => {
    const snippet = newSnippets[snippetName];
    if (snippet.description === undefined) {
      snippet.description = ' ';
    }
  });
  return newSnippets;
};

module.exports = (snippets, language, packageName) => pipe(
  replaceKeyToUnique,
  addBlankDescription,
)(snippets, language, packageName);
