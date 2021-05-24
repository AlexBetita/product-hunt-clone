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

    Discussion.hasOne(models.DiscussionIndex, {
      foreignKey: 'discussionId'
    })

  };

  Discussion.exists = async function(id){
    return await Discussion.findByPk(id) ? true : false
  }

  Discussion.userOwnsDiscussion = async function(discussionId, userId){
    return await Discussion.findOne({
      where: {
        id: discussionId,
        userId: userId
      }
    }) ? true : false
  }

  Discussion.edit = async function(discussion, discussionId){
    const editedDiscussion = await Discussion.findOne({
      where: {
        id: discussionId
      }
    });

    editedDiscussion.discussion = discussion;
    await editedDiscussion.save();
    return editedDiscussion
  }

  Discussion.getSoftDeletedDiscussionById = async function(discussionId){
    const discussion = await Discussion.findByPk(discussionId, {paranoid: false})
    return discussion ? true : false
  }

  Discussion.getDiscussionsByUserId = async function(userId){
    const discussions = await Discussion.findAll({
      where: {
        userId : userId
      }
    })
    return discussions
  }

  return Discussion;
};
