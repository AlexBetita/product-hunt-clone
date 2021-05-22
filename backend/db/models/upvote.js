'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: DataTypes.INTEGER,
    upvoteableId: DataTypes.INTEGER,
    upvoteableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {});
  Upvote.associate = function(models) {
    // associations can be defined here
  };
  return Upvote;
};