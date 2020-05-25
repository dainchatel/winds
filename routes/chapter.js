const express = require('express')
const { chapters } = require('../controllers')
const router = express.Router()

router.get('/', chapters.get)
router.post('/', chapters.create)
router.patch('/:chapterId', chapters.update)
router.delete('/:chapterId', chapters.destroy)
router.get('/list', chapters.list)
router.get('/listAvailable', chapters.listAvailable)
module.exports = router
