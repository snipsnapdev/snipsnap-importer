const SHA256 = require('crypto-js/sha256');

const replaceKeyToUnique = (snippets, language, packageName) => {
  const newSnippets = snippets;
  Object.keys(snippets).forEach((snippetName) => {
    const digit = SHA256(language + packageName + snippetName).toString().slice(-7);
    const newSnippetName = `${snippetName}_${digit}`;
    newSnippets[newSnippetName] = newSnippets[snippetName];
    delete newSnippets[snippetName];
  });
  return newSnippets;
};

// Could be multiple chained modifications in future

module.exports = (snippets, language, packageName) => {
  const newSnippets = replaceKeyToUnique(snippets, language, packageName);
  return newSnippets;
};
