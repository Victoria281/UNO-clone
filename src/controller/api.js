const router = require('express').Router();
const unoRouter = require('./routes');

router.use('/uno', unoRouter);

module.exports = router;
