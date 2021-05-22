'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    comment: DataTypes.TEXT,
    edited: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    commentableId: DataTypes.INTEGER,
    commentableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};