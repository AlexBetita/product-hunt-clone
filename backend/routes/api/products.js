const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Product, ProductImage, Upvote, Comment, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const existChecker = function(user, productId){

//   const exists = await Product.exists(productId)
//   const userId = user.id

//   if(user){
//     if(exists){
//       if(Product.userOwnsProduct(productId, userId)){
//         return userId
//       } else {
//         res.json({Error: "User does not own this product"})
//         return false
//       }
//     } else {
//       res.json({Error: "This product does not exists"})
//       return false
//     }
//   } else return false
// }

const validateCreateProduct = [
  check('title')
    .exists({ checkFalsy: true}),
  check('description')
    .exists({ checkFalsy: true}),
  handleValidationErrors
];

const validateProductImages = [
  check('productImages')
    .exists({ checkFalsy: true})
    .isURL({ checkFalsy: true })
    .withMessage('Please provide a valid URL'),
  handleValidationErrors
]

// Get all products
router.get(
  '/',
  asyncHandler(async (req, res)=>{
    const results = await Product.findAll({
      include: [
        {
          model: Comment,
          include: [Upvote, User.scope('userIcons')]
        },
        Upvote,
        User.scope('userIcons'),
        ProductImage.scope('imageUrls')
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    })

    // const results = await Product.findAll({
    //   attributes: [
    //     'User.*', 'Comment.*', 'ProductImage.*', 'Upvote.*',
    //     [Sequelize.fn('COUNT', Sequelize.col('Upvote.id')), 'PostCount']
    //   ],
    //   include: [
    //     {
    //       model: Comment,
    //       include: [Upvote]
    //     },
    //     Upvote,
    //     ProductImage.scope('imageUrls')
    //   ],
    //   order: [
    //     ['createdAt', 'DESC']
    //   ]
    // })

    const products = []
    let productsObj = {}

    results.forEach((product, i)=>{
      // for(const key in results[i].dataValues){
      //   if(key === 'createdAt' || key === 'updatedAt'){
      //     productsObj[key] = moment(results[i].dataValues[key]).format('MMMM Do YYYY, h:mm:ss a');
      //   } else {
      //     productsObj[key] = results[i].dataValues[key]
      //   }
      // }
      for(const key in results[i].dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          productsObj[key] = moment(results[i].dataValues[key]).startOf('second').fromNow();
        } else if(key === 'Upvotes') {
          productsObj['upvotes'] = results[i].dataValues[key].length
        } else if(key === 'Comments'){
          productsObj['Comments'] = {}
          results[i].dataValues[key].forEach((comment, i)=>{
            productsObj['Comments'][i+1] = {}
            for(const key2 in comment.dataValues){
              if(key2 === 'createdAt' || key2 === 'updatedAt'){
                productsObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).startOf('second').fromNow();
              } else if (key2 === 'Upvotes'){
                productsObj['Comments'][i+1]['upvotes'] = comment.dataValues[key2].length
              } else productsObj['Comments'][i+1][key2] = comment.dataValues[key2]
            }
          })
        } else {
          productsObj[key] = results[i].dataValues[key];
        }
      }
      products.push(productsObj);
      productsObj = {};
    });

    return res.json(products);
  })
);

// Get one product
router.get(
  '/:id',
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const results = await Product.findByPk(id,
      {
        include: [
          {
            model: Comment,
            include: [Upvote, User.scope('userIcons')]
          },
          User.scope('userIcons'),
          Upvote,
          ProductImage.scope('imageUrls')
        ]
      });

    let productObj = {}

    if(results){
      for(const key in results.dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          productObj[key] = moment(results.dataValues[key]).startOf('second').fromNow();
        } else if(key === 'Upvotes') {
          productObj['upvotes'] = results.dataValues[key].length
        } else if(key === 'Comments'){
          productObj['Comments'] = {}
          results.dataValues[key].forEach((comment, i)=>{
            productObj['Comments'][i+1] = {}
            for(const key2 in comment.dataValues){
              if(key2 === 'createdAt' || key2 === 'updatedAt'){
                productObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).startOf('second').fromNow();
              } else if (key2 === 'Upvotes'){
                productObj['Comments'][i+1]['upvotes'] = comment.dataValues[key2].length
              } else productObj['Comments'][i+1][key2] = comment.dataValues[key2]
            }
          })
        } else {
          productObj[key] = results.dataValues[key];
        }
      }

      const product = productObj;

      return res.json({
        product
      })

    } else res.json({Error: 'This product does not exist'})
  })
);

// Create product
router.post(
  '/',
  validateCreateProduct,
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {title, thumbnail, description} = req.body;
    const {user} = req;
    const userId = user.id

    if(user){
      const product = await Product.create({
        title, thumbnail, description, userId
      });
      return res.json({
        product
      });
    }
  })
);

// Update product
router.put(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {user} = req;
    const {title, thumbnail, description, productImages} = req.body;
    const userId = user.id;

    const exists = await Product.exists(id)

    if(user){
      if(exists){
        if(Product.userOwnsProduct(id, userId)){
          const product = await Product.edit(title, thumbnail, description, id)
          const productimgs = await ProductImage.bulkUpdate(productImages)
          return res.json({product, productimgs})
        } else {
          res.json({Error: "User does not own this product"})
        }
      } else {
        res.json({Error: "This product does not exists"})
      }
    }
  })
)

// Delete product
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {user} = req;
    const userId = user.id;

    const exists = await Product.exists(id)

    if(user){
      if(exists){
        if(Product.userOwnsProduct(id, userId)){
          await Product.destroy({
            where: {
              id: id
            }
          })
          const products = await Product.getProductsByUserId(userId)
          return res.json({products})
        } else {
          res.json({Error: "User does not own this product"})
        }
      } else {
        res.json({Error: "This product does not exists"})
      }
    }
  })
)

// Restore Deleted product
router.put(
  '/:id/restore',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {user} = req;
    const userId = user.id;

    const exists = await Product.getSoftDeletedProductById(id)

    if(user){
      if(exists){
        if(Product.userOwnsProduct(id, userId)){
          await Product.restore({
            where: {
              id: id
            }
          });
          const products = await Product.getProductsByUserId(userId);
          return res.json({products});
        } else {
          res.json({Error: "User does not own this product"})
        }
      } else {
        res.json({Error: "This product does not exists"})
      }
    }
  })
)

// Create product images
router.post(
  '/:id/productImages',
  // validateProductImages,
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {productImages} = req.body;
    const {user} = req;

    const exists = await Product.exists(id)

    if(user){
      if(exists){
        const userId = user.id
        if(Product.userOwnsProduct(id, userId)){
          productImages.forEach((object)=>{
            object['productId'] = id
          })
          const result = await ProductImage.addImages(productImages, id)
          return res.json({
            result
          })
        } else {
          res.json({Error: 'User does not own the product'})
        }
      } else {
        res.json({Error: 'Product does not exists'})
      }
    }
  })
)

// Get images of a product
router.get(
  '/:id/productImages',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {id} = req.params;
    const {user} = req;
    if(user){
      const productImages = await ProductImage.getAllProductImagesOfProduct(id)
      return res.json({
        productImages
      })
    }
  })
)

module.exports = router;
