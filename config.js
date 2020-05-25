const ENV = process.env
const secrets = require('./secrets')

module.exports = {
  ...secrets,
  PORT: 6464,
  ...ENV
}
