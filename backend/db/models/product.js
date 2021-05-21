'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
  }, {paranoid: true,});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Product.hasMany(models.Upvote,{
      foreignKey: 'upvoteableId',
      constraints: false,
      scope: {
        upvoteableType: 'product'
      }
    })
  };
  return Product;
};
