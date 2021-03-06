'use strict';
module.exports = (sequelize, DataTypes) => {
  const Following = sequelize.define('Following', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    followableId: DataTypes.INTEGER,
    followableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});

  Following.prototype.getFollowable = function(options){
    if (!this.followableType) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.followableType)}`;
    return this[mixinMethodName](options);
  }

  Following.associate = function(models) {

    Following.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'userId'
    });

    Following.belongsTo(models.User, {
      as: 'Following',
      foreignKey: 'followableId',
      constraints: false
    })

    Following.addHook("afterFind", findResult =>{
      if (!Array.isArray(findResult)) findResult = [findResult];
      for (const instance of findResult) {
        try{
          if (instance.followableType === "user" && instance.User !== undefined) {
            instance.followable = instance.User;
          }
          delete instance.User;
          delete instance.dataValues.User;
        } catch {
          continue
        }
      }
    });
  };
  return Following;
};
