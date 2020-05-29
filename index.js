require('dotenv').config()
const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const { ALLOWED_ORIGIN = '*' } = process.env

app.use(cors({
  origin: ALLOWED_ORIGIN
}))

app.use(bodyParser.json())

app.use('/chapter/', require('./routes/chapter'))

app.get('/', (req, res) => {
  res.send({ success: true })
})

app.listen(process.env.PORT, () => {
  console.log(`Application is running on port ${process.env.PORT}`)
})


module.exports = app
