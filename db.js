const config = require('config3')

module.exports = {
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  host: config.DATABASE_HOST,
  port: config.DATABASE_PORT,
  dialect: 'postgres'
}