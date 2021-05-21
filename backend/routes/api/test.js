const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');
const router = express.Router();

const { setTokenCookie, requireAuth, restoreUser} = require('../../utils/auth');
const { User, Comment, Product, Upvote } = require('../../db/models');

router.get('/set-token-cookie', asyncHandler(async (req, res) => {
  const user = await User.scope('currentUser').findOne({
      where: {
        username: 'Demo-lition'
      },
    })
  setTokenCookie(res, user);
  return res.json({ user, date: moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a') });
}));

// GET /api/restore-user
router.get(
  '/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  '/comments', restoreUser, asyncHandler(async (req, res) => {
    const comment = await Comment.findOne({
        where: {
          user_id: req.user.id
        },
      })
    // console.log(await comments.getCommentsAssociatedWithUser())
    // const upvote = await comment.createUpvote({user_id: req.user.id})
    // console.log(upvote.upvoteableId === comment.id)
    const upvotes = await comment.getUpvotes()
    console.log(upvotes.length)
    return res.json({ comment });
}));

router.get(
  '/products', restoreUser, asyncHandler(async (req, res) => {
    const product = await Product.findOne({
        where: {
          user_id: 2
        },
      })
    // console.log(await comments.getCommentsAssociatedWithUser())
    const upvotes = await product.getUpvotes()
    console.log(upvotes.length)
    if (upvotes.length <= 0){
      const upvote = await product.createUpvote({user_id: req.user.id})
      console.log(upvote.upvoteableId === product.id)
    }
    return res.json({ product });
}));

router.get(
  '/delete', asyncHandler(async (req, res) => {
    await User.destroy({
        where: {
          id: 2
        },
      })
    return res.json({ deleted: true });
}));

router.get(
  '/restore', asyncHandler(async (req, res) => {
    await User.restore({
        where: {
          id: 2
        },
      })
    return res.json({ restored: true });
}));

module.exports = router;
