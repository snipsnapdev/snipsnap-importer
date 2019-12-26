const SHA256 = require('crypto-js/sha256');

module.exports = (snippets, packageName) => {
  const newSnippets = snippets;
  Object.keys(snippets).forEach((snippetName) => {
    const { language } = snippets[snippetName];
    const digit = SHA256(language + packageName + snippetName).toString().slice(-7);
    const newSnippetName = `${snippetName}_${digit}`;
    newSnippets[newSnippetName] = newSnippets[snippetName];
    delete newSnippets[snippetName];
  });
  return newSnippets;
};
