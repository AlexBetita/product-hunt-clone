const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Discussion } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all discussions
router.get(
  '/',
  asyncHandler(async (req, res)=>{
    const results = await Discussion.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
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

    return res.json({
      discussions
    });
  })
);

// Create discussion
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    let {discussion} = req.body;

    if(user){
      discussion = await Discussion.create({
        discussion: discussion,
        userId: userId
      })

      return res.json({
        discussion
      })
    }

  })
);

// Update discussion
router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;
    const {discussion} = req.body;

    if(user){
      if(Discussion.exists(id)){
        if(Discussion.userOwnsDiscussion(id, userId)){
          const editedDiscussion = await Discussion.edit(discussion, id)
          return res.json({discussion: editedDiscussion})
        } return res.json({Error: 'User does not own this discussion'})
      } return res.json({Error: 'This discussion does not exists'})
    }
  })
);

// Delete discussion
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    const userId = user.id;
    const {id} = req.params;

    if(user){
      if(Discussion.exists(id)){
        if(Discussion.userOwnsDiscussion(id, userId)){
          await Discussion.destroy({
            where: {
              id: id
            }
          })
          const discussions = await Discussion.getDiscussionsByUserId(userId)
          return res.json({discussions})
        } return res.json({Error: 'User does not own this discussion'})
      } return res.json({Error: 'This discussion does not exists'})
    }
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
      if(Discussion.getSoftDeletedDiscussionById(id)){
        if(Discussion.userOwnsDiscussion(id, userId)){
          await Discussion.restore({
            where: {
              id: id
            }
          });
          const discussions = await Discussion.getDiscussionsByUserId(userId);
          return res.json({discussions})
        } return res.json({Error: 'User does not own this discussion'})
      } return res.json({Error: 'This discussion does not exists'})
    }

  })
);

module.exports = router;
