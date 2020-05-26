const express = require('express')
const { chapterViews } = require('../controllers')
const { authWithToken, getIp } = require('../middleware')
const router = express.Router()

router.use('/', authWithToken, getIp)
router.post('/', chapterViews.create)

module.exports = router
