const express = require('express')
const { generateImage } = require('../controller/generateImage')
const router = express.Router()

router.post('/generateImage', generateImage)

module.exports = router
