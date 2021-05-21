// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const testRouter = require('./test.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/test', testRouter);

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });


module.exports = router;
