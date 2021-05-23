// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productRouter = require('./products.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productRouter);

module.exports = router;
