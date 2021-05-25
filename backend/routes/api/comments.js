const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Comment, Product, Discussion, Upvote } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all comments
router.get(
  '/',
  asyncHandler(async (req, res)=>{
    const results = await Comment.scope('comments').findAll({
      include: [
        {
          model:Product.scope('products'),
          include: [
            Upvote
          ]
        }, {
          model: Discussion,
          include: [
            Upvote
          ]
        },
        Upvote],
      // {
      //   model: Comment, as: 'Reply'
      // }],
      order: [
        ['createdAt',  'DESC']
      ]
    });


    const comments = {}

    let commentsArr = []
    let commentsObj = {}
    let commentedOnObj = {}

    results.forEach((comment, i)=>{
      commentedOnObj['type'] = comment.commentableType
      commentedOnObj['upvotes'] = comment.commentable.dataValues.Upvotes.length
      for(const key in comment.commentable.dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          commentedOnObj[key] = moment(comment.commentable.dataValues[key]).startOf('second').fromNow();
        } else if(key === 'Upvotes'){
          continue
        } else {
          commentedOnObj[key] = comment.commentable.dataValues[key]
        }
      }
      commentsObj['upvotes'] = results[i].dataValues.Upvotes.length
      for(const key in results[i].dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          commentsObj[key] = moment(results[i].dataValues[key]).startOf('second').fromNow();
        } else if(key === 'commentableType' || key === 'Upvotes'){
          continue
        } else {
          commentsObj[key] = results[i].dataValues[key]
        }
      }
      commentsArr.push({commentedOn: commentedOnObj});
      commentsArr.push({comment: commentsObj});
      commentsObj = {};
      commentedOnObj = {};
      comments[i+1] = commentsArr
      commentsArr = []
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

// Update a comment
router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const {comment} = req.body;

    const exists = await Comment.exists(id);

    if(user){
      if(exists){
        if(Comment.userOwnsComment(id, userId)){
          const editedComment = await Comment.edit(id, comment);
          return res.json({editedComment})
        } else res.json({Error: 'Not users comment'})
      } else res.json({Error: 'Comment does not exists'})
    }
  })
);

// Delete a comment
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const exists = await Comment.exists(id);

    if(user){
      if(exists){
        if(Comment.userOwnsComment(id, userId)){
          await Comment.destroy({
            where: {
              id: id
            }
          })

          const comments = await Comment.getCommentsByUserId(id);
          return res.json({comments})

        } else res.json({Error: 'Not users comment'})
      } else res.json({Error: 'Comment does not exists'})
    }
  })
);

// Restore a comment
router.put(
  '/:id/restore',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    const exists = await Comment.getSoftDeletedCommentById(id);

    if(user){
      if(exists){
        if(Comment.userOwnsComment(id, userId)){
          await Comment.restore({
            where: {
              id: id
            }
          })
          const comments = await Comment.getCommentsByUserId(userId);
          return res.json({comments})
        } else res.json({Error: 'Not users comment'})
      } else res.json({Error: 'Comment does not exists'})
    }
  })
);

// Reply to comment buggy
// router.post(
//   '/reply/:id',
//   requireAuth,
//   asyncHandler(async (req, res)=>{
//     const {user} = req;
//     const userId = user.id;
//     const {id} = req.params;
//     const {comment} = req.body;

//     const exists = await Comment.exists(id);

//     if(user){
//       if(exists){
//         const replyTo = await Comment.findByPk(id);
//         const reply = await replyTo.createComment({
//           comment: comment,
//           userId: userId,
//           commentableType: 'comment',
//           commentableId: id
//         });
//         return res.json({
//           reply
//         })
//       } else res.json({Error: "This comment does no exists"})
//     }

//   })
// );


module.exports = router;
