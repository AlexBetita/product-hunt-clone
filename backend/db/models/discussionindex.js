
'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiscussionIndex = sequelize.define('DiscussionIndex', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    discussion: DataTypes.STRING,
    discussionId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});
  DiscussionIndex.associate = function(models) {

    DiscussionIndex.belongsTo(models.User, {
      foreignKey: 'discussionId'
    })

  };

  DiscussionIndex.exists = async function(discussion){
    const discussionIndex = await DiscussionIndex.findOne({
      where: {
        discussion: {[sequelize.Op.like]: `%${discussion}%`}
      }
    })
    return discussionIndex ? true : false
  }

  return DiscussionIndex;
};
