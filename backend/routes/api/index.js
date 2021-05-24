// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productRouter = require('./products.js');
const discussionRouter = require('./discussion.js');
const commentRouter = require('./comments.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productRouter);

router.use('/discussions', discussionRouter);

router.use('/comments', commentRouter);

module.exports = router;
