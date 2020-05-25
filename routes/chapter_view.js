const express = require('express')
const { chapterViews } = require('../controllers')
const router = express.Router()

router.post('/', chapterViews.create)

module.exports = router
