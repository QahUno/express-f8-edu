const express = require('express')
const router = express.Router()
const newsController = require('../app/controllers/NewsController.js')

router.get('/:slug', newsController.slug)
router.get('/', newsController.index)

module.exports = router