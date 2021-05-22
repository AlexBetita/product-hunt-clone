'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});

  Comment.prototype.getCommentable = function(options){
    if (!this.commentableType) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
    return this[mixinMethodName](options);
  }

  Comment.associate = function(models) {

    Comment.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Comment.belongsTo(models.Discussion,{
      foreignKey: 'commentableId',
      constraints: false
    })

    Comment.belongsTo(models.Product,{
      foreignKey: 'commentableId',
      constraints: false
    })

    //////////////////////////////////////

    Comment.belongsTo(models.Comment,{
      foreignKey: 'commentableId',
      as: 'Reply',
      constraints: false
    })

    Comment.hasMany(models.Comment,{
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'comment',
      },
      onDelete: 'cascade'
    })

    //////////////////////////////////////

    Comment.hasMany(models.Upvote,{
      foreignKey: 'upvoteableId',
      constraints: false,
      scope: {
        upvoteableType: 'comment'
      },
      onDelete: 'cascade'
    })

  };

  Comment.addHook("afterFind", findResult =>{
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.commentableType === "discussion" && instance.discussion !== undefined) {
        instance.commentable = instance.product;
      } else if (instance.commentableType === "comment" && instance.comment !== undefined) {
        instance.commentable = instance.comment;
      } else if (instance.commentableType === "product" && instance.product !== undefined) {
        instance.commentable = instance.comment;
      }
      delete instance.discussion;
      delete instance.dataValues.discussion;
      delete instance.comment;
      delete instance.dataValues.comment;
      delete instance.product;
      delete instance.dataValues.product;
    }
  });

  Comment.prototype.getCommentsAssociatedWithUser = async function(){
    const {userId} = this;
    const comments = await Comment.findAll({
      where: {
        userId: userId,
      }
    })
    return comments
  }

  return Comment;
};
