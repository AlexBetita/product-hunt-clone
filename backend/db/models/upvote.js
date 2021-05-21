'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    user_id: DataTypes.INTEGER,
    upvoteableId: DataTypes.INTEGER,
    upvoteableType: DataTypes.STRING,
  }, {paranoid: true});

  Upvote.prototype.getUpvoteable = function(options){
    if (!this.upvoteableType) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.upvoteableType)}`;
    return this[mixinMethodName](options);
  }

  Upvote.associate = function(models) {
    // associations can be defined here
    Upvote.belongsTo(models.Product,{
      foreignKey: 'upvoteableId',
      constraints: false
    })
    Upvote.belongsTo(models.Comment,{
      foreignKey: 'upvoteableId',
      constraints: false
    })
  };

  Upvote.addHook("afterFind", findResult =>{
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.upvoteableType === "product" && instance.product !== undefined) {
        instance.upvoteable = instance.product;
      } else if (instance.upvoteableType === "comment" && instance.comment !== undefined) {
        instance.upvoteable = instance.comment;
      }
      // To prevent mistakes:
      delete instance.product;
      delete instance.dataValues.product;
      delete instance.comment;
      delete instance.dataValues.comment;
    }
  });

  return Upvote;
};
