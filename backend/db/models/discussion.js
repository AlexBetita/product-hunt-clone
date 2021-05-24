'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discussion: DataTypes.TEXT,
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

  return Discussion;
};
