'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    userId: DataTypes.INTEGER,
    followableId: DataTypes.INTEGER,
    followableType: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Following.associate = function(models) {
    // associations can be defined here
  };
  return Following;
};