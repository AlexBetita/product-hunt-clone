'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      isNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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

  Product.prototype.getAllAssociatedUsers = async function(){
    const {userId} = this;
    const products = await Product.findAll({
      where: {
        userId: userId
      }
    });
    return products
  }

  Product.getAllProducts = async function(){
    const products = await Product.findAll()
    return products
  }

  Product.getProductById = async function(id){
    return await Product.findByPk(id);
  }

  Product.exists = async function(id){
    return await Product.findByPk(id) ? true : false
  }

  Product.userOwnsProduct = async function(productId, userId){
    const product = await Product.findOne({
      where: {
        id: productId,
        userId: userId
      }
    });
    return product ? true : false
  }

  Product.getUsersProducts = async function(userId){
    const products = await Product.findAll({
      where: {
        userId: userId
      }
    });
    return products
  }

  Product.incrementView = async function(productId){
    const product = await Product.findByPk(productId)
    if(product){
      product.views = product.views + 1;
      await product.save();
      return true
    } else return false
  }

  Product.edit = async function(title, thumbnail, description,  productId){
    const product = await Product.findByPk(productId)
    if(product){
      product.title = title;
      product.thumbnail = thumbnail;
      product.description = description
      await product.save();
      return product
    } else return false
  }

  Product.getSoftDeletedProductById = async function(productId){
    const product = await Product.findByPk(productId, {paranoid: false})
    return product ? true : false
  }
  return Product;
};
