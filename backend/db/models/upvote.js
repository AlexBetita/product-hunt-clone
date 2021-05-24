'use strict';
module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: DataTypes.INTEGER,
    upvoteableId: DataTypes.INTEGER,
    upvoteableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {paranoid: true});

  Upvote.prototype.getUpvoteable = function(options){
    if (!this.upvoteableType) return Promise.resolve(null);
    const mixinMethodName = `get${uppercaseFirst(this.upvoteableType)}`;
    return this[mixinMethodName](options);
  }

  Upvote.associate = function(models) {
    Upvote.belongsTo(models.User,{
      foreignKey: 'userId'
    })

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
      try{
        if (instance.upvoteableType === "product" && instance.Product !== undefined) {
          instance.upvoteable = instance.Product;
        } else if (instance.upvoteableType === "comment" && instance.Comment !== undefined) {
          instance.upvoteable = instance.Comment;
        }
        delete instance.Product;
        delete instance.dataValues.Product;
        delete instance.Comment;
        delete instance.dataValues.Comment;
      } catch {
        continue
      }
    }
  });

  Upvote.changeVote = async function(userId, upvoteableType, upvoteableId){
    const vote = await Upvote.findOne({
      where: {
        userId: userId,
        upvoteableId: upvoteableId,
        upvoteableType: upvoteableType
      }
    })

    const wasVoted = await Upvote.findOne({
      paranoid: false,
      where: {
        userId: userId,
        upvoteableId: upvoteableId,
        upvoteableType: upvoteableType,
      }
    })
    if(vote) return {voted: 'true', result: vote}
    else if (wasVoted) return {voted: 'wasVoted', result: wasVoted}
    else return {voted: 'false', result: vote}
  };

  return Upvote;
};
