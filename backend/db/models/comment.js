'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.STRING,
    edited: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
  }, {paranoid: true});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Comment.hasMany(models.Upvote,{
      foreignKey: 'upvoteableId',
      constraints: false,
      scope: {
        upvoteableType: 'comment'
      }
    })
  };

  Comment.prototype.getCommentsAssociatedWithUser = async function(){
    const {user_id} = this;
    const comments = await Comment.findAll({
      where: {
        user_id: user_id,
      }
    })
    return comments
  }

  return Comment;
};
