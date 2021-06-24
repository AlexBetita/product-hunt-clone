const express = require('express');
const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { requireAuth } = require('../../utils/auth');
const { Product, ProductImage, Upvote, Comment, User, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3.js')

const router = express.Router();
const defaultProductImage = 'https://producthuntclone.s3.amazonaws.com/1623467455869.jpg'

const checkThumbnail = async (req, id = null) => {
    let thumbnail
    try {
      thumbnail = await singlePublicFileUpload(req.file);
    }
    catch {
      thumbnail = null
    }
    if (!thumbnail){
      if (id){
        let product = await Product.findByPk(id);
        thumbnail = product.thumbnail
      }
      else {
        thumbnail = defaultProductImage
      }
    }
    return thumbnail
}

const productObjCleanUp = (result, multi = false) => {
  let productObj = {}

  if (result && !multi){
    for(const key in result.dataValues){
      if(key === 'createdAt' || key === 'updatedAt'){
        // productObj[key] = moment(result.dataValues[key]).startOf('second').fromNow();
        productObj[key] = moment(result.dataValues[key]).format('MMMM Do YYYY');
      } else if(key === 'Upvotes') {
        productObj['upvotes'] = result.dataValues[key].length
      } else if(key === 'Comments'){
        productObj['Comments'] = {}
        result.dataValues[key].forEach((comment, i)=>{
          productObj['Comments'][i+1] = {}
          for(const key2 in comment.dataValues){
            if(key2 === 'createdAt' || key2 === 'updatedAt'){
              // productObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).startOf('second').fromNow();
              productObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).format('MMMM Do YYYY');
            } else if (key2 === 'Upvotes'){
              productObj['Comments'][i+1]['upvotes'] = comment.dataValues[key2].length
            } else productObj['Comments'][i+1][key2] = comment.dataValues[key2]
          }
        })
      } else {
        productObj[key] = result.dataValues[key];
      }
    }
    product = productObj
    return product
  }

  if (result && multi){
    const products = []
    result.forEach((product, i)=>{
      for(const key in result[i].dataValues){
        if(key === 'createdAt' || key === 'updatedAt'){
          // productObj[key] = moment(result[i].dataValues[key]).startOf('second').fromNow();
          productObj[key] = moment(result[i].dataValues[key]).format('MMMM Do YYYY');
        } else if(key === 'Upvotes') {
          productObj['upvotes'] = result[i].dataValues[key].length
        } else if(key === 'Comments'){
          productObj['Comments'] = {}
          result[i].dataValues[key].forEach((comment, i)=>{
            productObj['Comments'][i+1] = {}
            for(const key2 in comment.dataValues){
              if(key2 === 'createdAt' || key2 === 'updatedAt'){
                // productObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).startOf('second').fromNow();
                productObj['Comments'][i+1][key2] = moment(comment.dataValues[key2]).format('MMMM Do YYYY');
              } else if (key2 === 'Upvotes'){
                productObj['Comments'][i+1]['upvotes'] = comment.dataValues[key2].length
              } else productObj['Comments'][i+1][key2] = comment.dataValues[key2]
            }
          })
        } else {
          productObj[key] = result[i].dataValues[key];
        }
      }
      products.push(productObj);
      productObj = {};
    });
    return products
  }
}

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
  '/page/:page',
  asyncHandler(async (req, res)=>{
    const {page} = req.params
    let offset = (15 * page) - 15
    let limit = 15
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
        ['id', 'DESC']
      ],
      offset: offset,
      limit: limit
    })

    products = productObjCleanUp(results, multi = true)
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

    if(results){

      const product = productObjCleanUp(results);

      return res.json({
        product
      })

    } else res.json(err.errors = ['This product does not exist'])
  })
);

// Create product
router.post(
  '/',
  singleMulterUpload("image"),
  validateCreateProduct,
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {title, tagline, description} = req.body;
    const {user} = req;
    const userId = user.id

    let thumbnail = await checkThumbnail(req)

    let product;

    if(user){
      let result = await Product.create({
        title, tagline, thumbnail, description, userId
      });

      result = await Product.findByPk(result.dataValues.id, {
        include: [
          {
            model: Comment,
            include: [Upvote, User.scope('userIcons')]
          },
          Upvote,
          User.scope('userIcons'),
          ProductImage.scope('imageUrls')
        ],
      })

      product = productObjCleanUp(result)

      return res.json(
        product
      );
    } else return next(err.errors=['Must be logged on to create product'])
  })
);

// Update product
router.put(
  '/:id',
  singleMulterUpload("image"),
  requireAuth,
  asyncHandler(async (req, res, next)=>{

    const {id} = req.params;
    const {user} = req;
    const {title, tagline, description } = req.body;

    let thumbnail = await checkThumbnail(req, id)

    let product;
    let result;

    if(user){

      try{
        result = await Product.edit(title, tagline, thumbnail,
                                          description, id,
                                          Comment, User, Upvote,
                                          ProductImage)
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Update failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }
      product = productObjCleanUp(result)

      return res.json(product)
    } else return next(err.errors=['Must be logged on to update product'])
  })
)

// Delete product
router.delete(
  '/:id',
  requireAuth,
  asyncHandler(async (req, res, next)=>{
    const {id} = req.params;
    const {user} = req;

    if(user){
      try{
        await Product.destroy({
          where: {
            id: id
          }
        })
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Delete product failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }
      return res.json({'message': 'success'})
    } else return next(err.errors=['Must be logged on to delete product'])
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

    if(user){
      try {
        await Product.restore({
          where: {
            id: id
          }
        });
      }
      catch (e){
        const err = new Error(e.errors[0]);
        err.status = 401;
        err.title = 'Restore product failed';
        err.errors = [e.errors[0]['message']]
        return next(err)
      }
      const products = await Product.getProductsByUserId(userId);
      return res.json({products});
    } else return next(err.errors=['Must be logged on to restore product'])
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

    if(user){
      try {
        productImages.forEach((object)=>{
          object['productId'] = id
        })
        const result = await ProductImage.addImages(productImages, id)
      }
      catch (e) {
        const err = new Error('Create product images failed');
        err.status = 401;
        err.title = 'Create product images failed';
        err.errors = ['Create product images failed.'];
        return next(err);
      }
      return res.json({ result })
    } else return next(err.errors=['Must be logged on to create product image'])
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
