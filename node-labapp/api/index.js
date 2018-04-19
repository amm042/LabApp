var router = require('express').Router();

router.use('/api', require('./routes'));

module.exports = router;
