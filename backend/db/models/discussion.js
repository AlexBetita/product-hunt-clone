'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
    discussion: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Discussion.associate = function(models) {
    // associations can be defined here
  };
  return Discussion;
};