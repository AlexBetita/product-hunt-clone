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
  asyncHandler(async (req, res, next)=>{
    const {id} = req.params;

    let comment;
    try{
      comment = await Comment.scope('commentsNoDates').findByPk(id,{
        include: [Product.scope('products'), Discussion]
      });
    }
    catch (e){
      const err = new Error(e.errors[0]);
      err.status = 401;
      err.title = 'Comment failed';
      err.errors = [e.errors[0]['message']]
      return next(err)
    }

    return res.json({comment, commentedOn: comment.commentable})
    }
  )
);

// Post comment on product
router.post(
  '/product/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;
    const {comment} = req.body;

    if(user){

      try{
        const product = await Product.findByPk(id);
        comment = await product.createComment({
          comment: comment,
          userId: userId
        });
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Comment failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }

      return res.json({
        commentRes
      })
    } else return next(err.errors=['Must be logged on to post comment'])
  })
);

// Post comment on discussion
router.post(
  '/discussion/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;
    const {comment} = req.body;

    let commentRes;

    if(user){

      try{
        const discussion = await Discussion.findByPk(id);
        commentRes = await discussion.createComment({
          comment: comment,
          userId: userId
        });
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Comment failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }

      return res.json({
        commentRes
      })
    } else return next(err.errors=['Must be logged on to post comment'])
  })
);

// Update a comment
router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const {id} = req.params;

    const {comment} = req.body;


    let editedComment;

    if(user){
      try{
        editedComment = await Comment.edit(id, comment);
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Updating comment failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }
      return res.json({editedComment})
    } else return next(err.errors=['Must be logged on to update comment'])
  })
);

// Delete a comment
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const {id} = req.params;

    if(user){

      try{
        await Comment.destroy({
          where: {
            id: id
          }
        })
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Deleting comment failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }

      const comments = await Comment.getCommentsByUserId(id);
      return res.json({comments})
    } else return next(err.errors=['Must be logged on to delete comment'])
  })
);

// Restore a comment
router.put(
  '/:id/restore',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    let comments;

    if(user){
      try{
        await Comment.restore({
          where: {
            id: id
          }
        })
        comments = await Comment.getCommentsByUserId(userId);
      }
      catch(e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Restore comment failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }

      return res.json({comments})
    } else return next(err.errors=['Must be logged on to restore comment'])
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
