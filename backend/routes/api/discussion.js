const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Discussion, DiscussionIndex, Comment, Upvote } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const discussionObjCleanUp = (results) =>{
  const discussions = []
  let discussionsObj = {}

  results.forEach((discussion, i)=>{
    for(const key in results[i].dataValues){
      if(key === 'createdAt' || key === 'updatedAt'){
        discussionsObj[key] = moment(results[i].dataValues[key]).startOf('second').fromNow();
      } else {
        discussionsObj[key] = results[i].dataValues[key]
      }
    }
    discussions.push(discussionsObj)
    discussionsObj = {}
  });

  return discussions
}

// Get all discussions
router.get(
  '/',
  asyncHandler(async (req, res)=>{
    const results = await Discussion.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      include: [
        Comment,
        Upvote
      ]
    })
    const discussions = discussionObjCleanUp(results)

    return res.json(discussions);
  })
);

// Create discussion
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const userId = user.id;

    let {discussion, message} = req.body;
    let discussionIndex = discussion.replace(/[^\w\s]/gi, ' ');
    discussionIndex = discussionIndex.replace(/^\s+|\s+$/g, "");
    discussion = discussion.replace(/ +(?= )/g, "");

    const exists = await DiscussionIndex.exists(discussionIndex)

    if(!exists){

      if(user){

        discussion = await Discussion.create({
          discussion: discussion,
          message: message,
          userId: userId
        })

        discussionIndex = await DiscussionIndex.create({
          discussion: discussionIndex,
          discussionId: discussion.id
        })

        return res.json({
          discussion
        })
      } else return next(err.errors=['Must be logged on to create comment'])
    } else return next(err.errors = ["The discussion doesn't exists."])
  })
);

// Get discussion by title
router.get(
  '/:discussion',
  asyncHandler(async (req, res, next)=>{
    let {discussion} = req.params;
    discussion = discussion.replace(/[^\w\s]/gi, ' ');
    discussion = discussion.replace(/^\s+|\s+$/g, "");
    discussion = discussion.replace(/ +(?= )/g, "");

    const discussionIndex = await DiscussionIndex.findByDiscussion(discussion);

    discussion = await Discussion.findByPk(discussionIndex.discussionId,{
      include: [
        Comment,
        Upvote
      ]
    });

    let discussionObj = {}

    if(discussionIndex){
      for(const key in discussion.dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          discussionObj[key] = moment(discussion.dataValues[key]).startOf('second').fromNow();
        } else {
          discussionObj[key] = discussion.dataValues[key];
        }
      }

      discussion = discussionObj;

      return res.json({
        discussion
      })
    } else {
      return next(err.errors = ["The discussion doesn't exists."])
    }
  })
);

// Get discussion by id
router.get(
  '/id/:id',
  asyncHandler(async (req, res, next)=>{
    let {id} = req.params;

    let discussion = await Discussion.findByPk(id,{
      include: [
        Comment,
        Upvote
      ]
    });

    let discussionObj = {}

    if(discussion){
      for(const key in discussion.dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          discussionObj[key] = moment(discussion.dataValues[key]).startOf('second').fromNow();
        } else {
          discussionObj[key] = discussion.dataValues[key];
        }
      }

      discussion = discussionObj;

      return res.json({
        discussion
      })
    } else {
      return next(err.errors = ["The discussion doesn't exists."])
    }

  })
);

// Update discussion
router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {id} = req.params;
    const {discussion, message} = req.body;

      if(Discussion.exists(id)){
        let editedDiscussion;
        try {
          const discussionIndex = await DiscussionIndex.findByDiscussionId(id)
          await DiscussionIndex.edit(discussion, discussionIndex.id)
          editedDiscussion = await Discussion.edit(
                                                      discussion, message, id,
                                                      Comment, Upvote
                                                      )
        }
        catch (e){
          const err = new Error('Updated discussion failed');
          err.status = 401;
          err.title = 'Updated discussion failed';
          err.errors = ['Updated discussion failed.'];
          return next(err);
        }
        return res.json({discussion: editedDiscussion})
    } return next(err.errors = ["The discussion doesn't exists."])
  })
);

// Delete discussion
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    if(user){
      try {
        await Discussion.destroy({
          where: {
            id: id
          }
        });
        await DiscussionIndex.destory({
          where:{
            discussionId: id
          }
        });
      }
      catch(e){
        const err = new Error('Deleted discussion failed');
        err.status = 401;
        err.title = 'Deleted discussion failed';
        err.errors = ['Deleted discussion failed.'];
        return next(err);
      }
      const discussions = await Discussion.getDiscussionsByUserId(userId)
      return res.json({discussions})
    } else return next(err.errors=['Must be logged on to delete discussion'])
  })
);

// Restore discussion
router.put(
  '/:id/restore',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    if(user){
      try{
        await Discussion.restore({
          where: {
            id: id
          }
        });
        await DiscussionIndex.restore({
          where:{
            discussionId: id
          }
        });
      }
      catch(e){
        const err = new Error('Restore discussion failed');
        err.status = 401;
        err.title = 'Restore discussion failed';
        err.errors = ['Restore discussion failed.'];
        return next(err);
      }
      const discussions = await Discussion.getDiscussionsByUserId(userId);
      return res.json({discussions})
    } else return next(err.errors=['Must be logged on to restore discussion'])
  })
);

module.exports = router;
