var router = require('express').Router()

router.use('/auth', require('./google'))

module.exports = router
