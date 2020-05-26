const express = require('express')
const { chapters } = require('../controllers')
const { authWithToken } = require('../middleware')
const router = express.Router()

router.use('/', authWithToken)
router.get('/', chapters.list)
router.get('/available', chapters.listAvailable)
router.get('/:id', chapters.get)
router.post('/', chapters.create)
router.patch('/:id', chapters.update)
router.delete('/:id', chapters.destroy)

module.exports = router
