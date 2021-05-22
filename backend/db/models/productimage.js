'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    imageUrl: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});

  ProductImage.associate = function(models) {

    ProductImage.belongsTo(models.Product,{
      foreignKey: 'productId'
    })
    
  };
  return ProductImage;
};
