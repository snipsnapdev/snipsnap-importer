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

const addSearchablePrefix = (snippets, packageName) => {
  const newSnippets = snippets;
  Object.keys(snippets).forEach((snippetName) => {
    const prefixes = newSnippets[snippetName].prefix;
    if (Array.isArray(prefixes)) {
      newSnippets[snippetName].prefix.unshift(`${packageName} ${prefixes[0]}`);
    }
    if (typeof prefixes === 'string') {
      newSnippets[snippetName].prefix = [`${packageName} ${prefixes}`];
    }
  });
  return newSnippets;
};

module.exports = (snippets, language, packageName) => {
  let newSnippets = replaceKeyToUnique(snippets, language, packageName);
  newSnippets = addSearchablePrefix(snippets, packageName);
  return newSnippets;
};
