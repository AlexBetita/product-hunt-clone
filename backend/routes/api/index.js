// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productRouter = require('./products.js');
const discussionRouter = require('./discussion.js');
const commentRouter = require('./comments.js');
const upvoteRouter = require('./upvote.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productRouter);

router.use('/discussions', discussionRouter);

router.use('/comments', commentRouter);

router.use('/upvote', upvoteRouter);

module.exports = router;
