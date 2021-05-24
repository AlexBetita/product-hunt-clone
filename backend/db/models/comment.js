'use strict';

const e = require("express");

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
      try{
        if (instance.commentableType === "discussion" && instance.Discussion !== undefined) {
          instance.commentable = instance.Discussion;
        } else if (instance.commentableType === "comment" && instance.Reply !== undefined) {
          instance.commentable = instance.Reply;
        } else if (instance.commentableType === "product" && instance.Product !== undefined) {
          instance.commentable = instance.Product;
        }
        delete instance.Discussion;
        delete instance.dataValues.Discussion;
        delete instance.Reply;
        delete instance.dataValues.Reply;
        delete instance.Product;
        delete instance.dataValues.Product;
      } catch {
        continue
      }
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
  };

  Comment.exists = async function(id){
    try{
      await Comment.findByPk(id)
      return true
    } catch (e){
      return false
    }
  };

  Comment.userOwnsComment = async function(id, userId){
    const comment = await Comment.findOne({
      where: {
        id: id,
        userId: userId
      }
    })
    return comment ? true : false
  };

  Comment.edit = async function(id, comment){
    const editedComment = await Comment.findByPk(id)
    editedComment.comment = comment
    await editedComment.save();
    return editedComment
  };

  Comment.getCommentsByUserId = async function(userId){
    try{
      const comments = await Comment.findAll({
        where: {
          userId: userId
        }
      })
      return comments
    } catch {
      return []
    }
  };

  Comment.getSoftDeletedCommentById = async function(id){
    try{
      await Comment.findByPk(id, {paranoid: false})
      return true
    } catch {
      return false
    }
  };

  return Comment;
};
