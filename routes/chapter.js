const express = require('express')
const { chapters } = require('../controllers')
const { authWithToken, getIp, confirmOrigin } = require('../middleware')
const cors = require('cors')

const router = express.Router()

// all requests should have IP attached
router.use('/', getIp)

// this is the main route
// it doesn't need any auth

// these shouldn't be called
// router.get('/:id', chapters.get)
// router.get('/', chapters.list)
router.get('/available', confirmOrigin, chapters.listAvailable)

// adding and changing chapters
// these need token auth
router.post('/', authWithToken, chapters.create)
router.patch('/:id', authWithToken, chapters.update)
router.delete('/:id', authWithToken, chapters.destroy)

// this adds a new view
// these requests should only come from a specific host
router.post('/:id/chapter_view', chapters.createView)

module.exports = router
