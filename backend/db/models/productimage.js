'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProductImage = sequelize.define('ProductImage', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imageUrl: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {paranoid:true,
      scopes: {
        imageUrls: {
          attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt']}
        }
      }
  });

  ProductImage.prototype.getAllAssociatedProducts = async function(){
    const {productId} = this;
    const productImages = await ProductImage.findAll({
      where: {
        productId: productId
      }
    });
    return productImages
  }

  ProductImage.associate = function(models) {

    ProductImage.belongsTo(models.Product,{
      foreignKey: 'productId'
    })

  };

  ProductImage.addImages = async function (productImages, productId){
    await ProductImage.bulkCreate( productImages ,{ ignoreDuplicates: true});
    return await ProductImage.findAll({
      where: {
        productId: productId
      }
    });
  };

  ProductImage.getAllProductImagesOfProduct = async function(productId) {
    return await ProductImage.scope('imageUrls').findAll({
      where: {
        productId: productId
      }
    });
  };

  ProductImage.bulkUpdate = async function(productImages){
    return await ProductImage.bulkCreate(productImages, {updateOnDuplicate: ['id','imageUrl', 'productId']})
  }

  return ProductImage;
};
