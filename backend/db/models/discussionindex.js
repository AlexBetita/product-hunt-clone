
'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Op } = require("sequelize");
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
        discussion: {[Op.iLike]: `%${discussion}%`}
      }
    })

    return discussionIndex ? true : false
  };

  DiscussionIndex.findByDiscussion = async function(discussion){

    const discussionIndex = await DiscussionIndex.findOne({
      where: {
        discussion: {[Op.iLike]: `%${discussion}%`}
      }
    })

    return discussionIndex ? discussionIndex : false;
  };

  DiscussionIndex.findByDiscussionId = async function(discussionId){
    const discussionIndex = await DiscussionIndex.findOne({
      where: {
        discussionId: discussionId
      }
    })
    return discussionIndex ? discussionIndex : false;
  };

  DiscussionIndex.edit = async function(discussion, id){
    const discussionIndex = await DiscussionIndex.findByPk(id)
    discussion = discussion.replace(/[^\w\s]/gi, ' ');
    discussion = discussion.replace(/^\s+|\s+$/g, "");
    discussion = discussion.replace(/ +(?= )/g, "");
    discussionIndex.discussion = discussion
    await discussionIndex.save()
    return discussionIndex
  };

  return DiscussionIndex;
};
