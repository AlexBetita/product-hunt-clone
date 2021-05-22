'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    description: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};