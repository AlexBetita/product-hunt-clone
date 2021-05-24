const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Comment, Product, Discussion } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const comment = require('../../db/models/comment');
const e = require('express');

const router = express.Router();

// Get all comments
router.get(
  '/',
  asyncHandler(async (req, res)=>{
    const results = await Comment.scope('comments').findAll({
      include: [Product, Discussion],
      order: [
        ['createdAt',  'DESC']
      ]
    });

    const comments = []
    let commentsObj = {}

    results.forEach((comment, i)=>{
      commentsObj['commentedOn'] = {[comment.commentableType]: comment.commentable}
      for(const key in results[i].dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          commentsObj[key] = moment(results[i].dataValues[key]).startOf('second').fromNow();
        } else {
          commentsObj[key] = results[i].dataValues[key]
        }
      }
      comments.push(commentsObj);
      commentsObj = {};
    })

    return res.json({comments})
  })
);

// Get comment by id
router.get(
  '/:id',
  asyncHandler(async (req, res)=>{
    const {id} = req.params;

    const exists = await Comment.exists(id)
    if(exists){
      const comment = await Comment.scope('commentsNoDates').findByPk(id,{
        include: [Product.scope('products'), Discussion]
      });

      return res.json({comment, commentedOn: comment.commentable})
    } else {
      res.json({Error: 'Comment does not exists'})
    }
  })
);

// Post comment on product
router.post(
  '/product/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;
    const {comment} = req.body;

    const exists = await Product.exists(id);

    if(user){
      if(exists){
        const product = await Product.findByPk(id);
        const commentRes = await product.createComment({
          comment: comment,
          userId: userId
        });
        return res.json({
          commentRes
        })
      } else res.json({Error: "This product does not exists"})
    }

  })
);

// Post comment on discussion
router.post(
  '/discussion/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;
    const {comment} = req.body;

    const exists = await Discussion.exists(id);

    if(user){
      if(exists){
        const discussion = await Discussion.findByPk(id);
        const commentRes = await discussion.createComment({
          comment: comment,
          userId: userId
        });
        return res.json({
          commentRes
        })
      } else res.json({Error: "This discussion does not exists"})
    }

  })
);



module.exports = router;
