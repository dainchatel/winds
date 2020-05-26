const ENV = process.env
const secrets = require('./secrets')

module.exports = {
  ...secrets,
  ...ENV
}
