// backend/routes/api/session.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];

// Log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json({
            user: user.toSafeObject(),
        });
    }),
);

// Restore session user
router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req;
        if (user) {
            console.log(user)
            const upvotes = await user.getUpvotes({
                attributes: {
                    exclude: ['deletedAt']
                  }
            })
            const products = await user.getProducts()
            const comments = await user.getComments({
                attributes: {
                  exclude: ['deletedAt']
                }
            })
            const discussions = await user.getDiscussions()

        return res.json({
            user: user.toSafeObject(),
            upvotes,
            products,
            comments,
            discussions
        });
        } else return res.json({});
    })
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
