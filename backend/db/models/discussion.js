'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discussion: DataTypes.STRING,
    message: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});

  Discussion.associate = function(models) {

    Discussion.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Discussion.hasMany(models.Comment,{
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'discussion'
      },
      onDelete: 'cascade'
    })

    Discussion.hasMany(models.Upvote,{
      foreignKey: 'upvoteableId',
      constraints: false,
      scope: {
        upvoteableType: 'discussion'
      },
      onDelete: 'cascade'
    })

    Discussion.hasOne(models.DiscussionIndex, {
      foreignKey: 'discussionId'
    })

  };

  Discussion.exists = async function(id){
    return await Discussion.findByPk(id) ? true : false
  };

  Discussion.userOwnsDiscussion = async function(discussionId, userId){
    return await Discussion.findOne({
      where: {
        id: discussionId,
        userId: userId
      },
      include: [
        Comment,
        Upvote
      ]
    }) ? true : false
  };

  Discussion.edit = async function(
                                  discussion, message, discussionId,
                                  Comment, Upvote
                                  ){
    const editedDiscussion = await Discussion.findByPk(discussionId,
      {
        include: [
          Comment,
          Upvote
      ]
    });

    editedDiscussion.discussion = discussion;
    editedDiscussion.message = message
    await editedDiscussion.save();
    return editedDiscussion
  };

  Discussion.getSoftDeletedDiscussionById = async function(discussionId){
    const discussion = await Discussion.findByPk(discussionId, {paranoid: false})
    return discussion ? true : false
  };

  Discussion.getDiscussionsByUserId = async function(userId){
    const discussion = await Discussion.findAll({
      where: {
        userId : userId
      },
      include: [
        Comment,
        Upvote
      ]
    })
    return discussion
  };

  Discussion.getDiscussionById = async function(discussionId){
    const discussion = await Discussion.findByPk(discussionId)
    return discussion
  };

  return Discussion;
};
