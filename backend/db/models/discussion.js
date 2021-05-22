'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discussion = sequelize.define('Discussion', {
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
  return Discussion;
};
