'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    description: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {paranoid:true});

  Product.associate = function(models) {

    Product.belongsTo(models.User, {
      foreignKey: 'userId'
    })

    Product.hasMany(models.Upvote,{
      foreignKey: 'upvoteableId',
      constraints: false,
      scope: {
        upvoteableType: 'product'
      },
      onDelete: 'cascade'
    })

    Product.hasMany(models.Comment,{
      foreignKey: 'commentableId',
      constraints: false,
      scope: {
        commentableType: 'product',
      },
      onDelete: 'cascade'
    })

    Product.hasMany(models.ProductImage,{
      foreignKey: "productId"
    })

  };

  Product.create = async function ({title, thumbnail, description, userId}) {
    const product = await Product.create({
      title,
      thumbnail,
      description,
      userId,
    });
    return await Product.findByPk(product.id);
  }

  return Product;
};
