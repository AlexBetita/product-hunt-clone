const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Upvote, Product, Discussion, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Upvote/Downvote a product
router.put(
  '/product/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const exists = await Product.exists(id);

    if(user){
      if(exists){
        const {voted, result} = await Upvote.changeVote(userId, 'product', id);

        if(voted === 'wasVoted'){
          const upvote = await Upvote.restore({
            where: {
              id: result.dataValues.id
            }
          });
          return res.json({upvote})
        } else if(voted === 'true'){
          const downvote = await Upvote.destroy({
            where: {
              id: result.dataValues.id
            }
          })
          return res.json({downvote})
        } else {
          const product = await Product.getProductById(id);
          const upvote = await product.createUpvote({
            userId: userId
          })
          return res.json({upvote})
        }

      } else res.json({Error: 'Product does not exist'})
    }
  })
);

// Upvote/Downvote a comment
router.put(
  '/comment/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const exists = await Comment.exists(id);

    if(user){
      if(exists){
        const {voted, result} = await Upvote.changeVote(userId, 'comment', id);

        if(voted === 'wasVoted'){
          const upvote = await Upvote.restore({
            where: {
              id: result.dataValues.id
            }
          });
          return res.json({upvote})
        } else if(voted === 'true'){
          const downvote = await Upvote.destroy({
            where: {
              id: result.dataValues.id
            }
          })
          return res.json({downvote})
        } else {
          const comment = await Comment.getCommentById(id);
          const upvote = await comment.createUpvote({
            userId: userId
          })
          return res.json({upvote})
        }

      } else res.json({Error: 'Comment does not exist'})
    }
  })
);

// Upvote/Downvote a discussion
router.put(
  '/discussion/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const exists = await Discussion.exists(id);

    if(user){
      if(exists){
        const {voted, result} = await Upvote.changeVote(userId, 'discussion', id);

        if(voted === 'wasVoted'){
          const upvote = await Upvote.restore({
            where: {
              id: result.dataValues.id
            }
          });
          return res.json({upvote})
        } else if(voted === 'true'){
          const downvote = await Upvote.destroy({
            where: {
              id: result.dataValues.id
            }
          })
          return res.json({downvote})
        } else {
          const discussion = await Discussion.getDiscussionById(id);
          const upvote = await discussion.createUpvote({
            userId: userId
          })
          return res.json({upvote})
        }

      } else res.json({Error: 'Discussion does not exist'})
    }
  })
);


module.exports = router;
