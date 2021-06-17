const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { Upvote, Product, Discussion, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

let data;

const getData = async (table, id) => {
  return await table.findByPk(id, {
    include: [
      Upvote
    ]
  })
}

const getUpvoteData = async (type, id) => {
  return await Upvote.findOne({
    where: {
      upvoteableType: type,
      upvoteableId: id
    }
  })
}

// Upvote/Downvote a product
router.put(
  '/product/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    if(user){

      const {voted, result} = await Upvote.changeVote(userId, 'product', id);

      if(voted === 'wasVoted'){
        await Upvote.restore({
          where: {
            id: result.dataValues.id
          }
        });

        const upvote = await getUpvoteData('product', id)

        data = await getData(Product, id)
        return res.json({id, result: 'upvote', data, upvote})
      } else if(voted === 'true'){
        const downvote = await Upvote.destroy({
          where: {
            id: result.dataValues.id
          }
        })
        return res.json({id, result: 'downvote', data})
      } else {
        const product = await Product.getProductById(id);
        const upvote = await product.createUpvote({
          userId: userId
        })
        data = await getData(Product, id)
        return res.json({id, result: 'upvote', data, upvote})
      }

    } else res.json(err.errors = ['Please login to upvote'])
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


    if(user){
      const {voted, result} = await Upvote.changeVote(userId, 'comment', id);

      if(voted === 'wasVoted'){
        await Upvote.restore({
          where: {
            id: result.dataValues.id
          }
        });

        const upvote = await getUpvoteData('comment', id)

        data = await getData(Comment, id)
        return res.json({id, result: 'upvote', data, upvote})
      } else if(voted === 'true'){
        const downvote = await Upvote.destroy({
          where: {
            id: result.dataValues.id
          }
        })
        return res.json({id, result: 'downvote', data})
      } else {
        const comment = await Comment.getCommentById(id);
        const upvote = await comment.createUpvote({
          userId: userId
        })
        data = await getData(Comment, id)
        return res.json({id, result: 'upvote', data, upvote})
      }
    } else res.json(err.errors = ['Please login to upvote'])
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

    if(user){
      const {voted, result} = await Upvote.changeVote(userId, 'discussion', id);

      if(voted === 'wasVoted'){
        await Upvote.restore({
          where: {
            id: result.dataValues.id
          }
        });

        const upvote = await getUpvoteData('discussion', id)

        data = await getData(Discussion, id)
        return res.json({id, result: 'upvote', data, upvote})
      } else if(voted === 'true'){
        const downvote = await Upvote.destroy({
          where: {
            id: result.dataValues.id
          }
        })
        return res.json({id, result: 'downvote', data})
      } else {
        const discussion = await Discussion.getDiscussionById(id);
        const upvote = await discussion.createUpvote({
          userId: userId
        })
        data = await getData(Discussion, id)
        return res.json({id, result: 'upvote', data, upvote})
      }
    } else res.json(err.errors = ['Please login to upvote'])
  })
);


module.exports = router;
