'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    paranoid:true,
    scopes: {
      comments: {
        attributes: {
          exclude: ['commentableId', 'deletedAt', 'id']
        }
      },
      commentsNoDates:{
        attributes: {
          exclude: ['commentableId', 'deletedAt', 'id', 'createdAt', 'updatedAt']
        }
      }
    }
  });

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
      as: 'Comment',
      constraints: false
    })

    Comment.hasMany(models.Comment,{
      foreignKey: 'commentableId',
      as: 'Reply',
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
      if (instance.commentableType === "discussion" && instance.Discussion !== undefined) {
        instance.commentable = instance.Discussion;
      } else if (instance.commentableType === "comment" && instance.Comment !== undefined) {
        instance.commentable = instance.Comment;
      } else if (instance.commentableType === "product" && instance.Product !== undefined) {
        instance.commentable = instance.Product;
      }
      delete instance.Discussion;
      delete instance.dataValues.Discussion;
      delete instance.Comment;
      delete instance.dataValues.Comment;
      delete instance.Product;
      delete instance.dataValues.Product;
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
