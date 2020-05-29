const express = require('express')
const { chapters } = require('../controllers')
const { authWithToken, getIp, defense } = require('../middleware')

const router = express.Router()

// all requests should have IP attached
router.use('/', getIp)

// this is the main route, it doesn't need any auth
router.get('/available', chapters.listAvailable)

// adding and changing chapters, these need token auth
router.post('/', authWithToken, chapters.create)
router.patch('/:id', authWithToken, chapters.update)
router.delete('/:id', authWithToken, chapters.destroy)

// this adds a new chapter view, these should be defended
router.post('/:id/chapter_view', defense, chapters.createView)

module.exports = router
