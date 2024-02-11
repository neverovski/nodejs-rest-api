const { author, description, version } = require('./package.json');

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Node.js Rest API  - OpenAPI 3.0',
    version,
    description,
    contact: author,
  },
};
