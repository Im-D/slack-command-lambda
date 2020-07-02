const fetch = require('node-fetch');
const isUrl = require('is-url');
const articleTitle = require('article-title');

const getTitleFromUrl = (url) => {
  if (!isUrl(url)) {
    throw new Error('Invalid url');
  }

  return fetch(url)
    .then(res => res.text())
    .then(body => articleTitle(body));
};

module.exports = {
  getTitleFromUrl
}
