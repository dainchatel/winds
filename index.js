require('dotenv').config()
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

app.use('/chapter/', require('./routes/chapter'))

app.get('/', (req, res) => {
  res.json({ success: true })
})

app.listen(process.env.PORT, () => {
  console.log(`Application is running on port ${process.env.PORT}`)
})


module.exports = app
