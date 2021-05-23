'use strict';

const product = require("./product");

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

  ProductImage.create = async function (productImages, productId){
    await ProductImage.bulkCreate([
      productImages
    ]);
    return await ProductImage.findAll({
      where: {
        productId: productId
      }
    });
  };

  return ProductImage;
};
