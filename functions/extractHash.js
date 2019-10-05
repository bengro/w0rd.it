const url = require('url');

module.exports = function(requestUrl) {
  const url_parts = url.parse(requestUrl);
  return url_parts.pathname.replace('/', '');
};
