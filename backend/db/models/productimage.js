'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    imageUrl: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {});
  ProductImage.associate = function(models) {
    // associations can be defined here
  };
  return ProductImage;
};