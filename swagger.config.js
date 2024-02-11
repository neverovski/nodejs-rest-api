const { author, description, version } = require('./package.json');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Auth - OpenAPI 3.0',
    version,
    description,
    contact: author,
  },
};
