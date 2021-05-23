const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Product, ProductImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateCreateProduct = [
  check('title')
    .exists({ checkFalsy: true}),
  check('description')
    .exists({ checkFalsy: true})
];

const validateProductImages = [
  check('productImages')
    .exists({ checkFalsy: true})
    .isURL({ checkFalsy: true })
    .withMessage('Please provide a valid URL')
]

//Create product
router.post(
  '/',
  validateCreateProduct,
  asyncHandler(async (req, res)=>{
    const {userId, title, thumbnail, description} = req.body;
    const product = await Product.create({
      title, thumbnail, description, userId
    });

    return res.json({
      product
    });
  })
);

router.post(
  '/:id/productImages',
  // validateProductImages,
  asyncHandler(async (req, res)=>{
    const {productId} = req.params;
    const {...productImages} = req.body;
    console.log(productImages)

  })
)

module.exports = router;
