const _ = require('lodash')
const config = require('config3')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.use('/chapter/', require('./routes/chapter'))

app.get('/', (req, res) => {
  res.json({ success: true })
})

// app.use('*', (req, res) => {
//   const message = { message: 'endpoint not found' }
//   res.respond(message, 404)
// })

app.listen(config.PORT, () => {
  console.log(`Application is running on port ${config.PORT}`)
})


module.exports = app
