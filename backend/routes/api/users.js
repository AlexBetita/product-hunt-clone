// backend/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Product } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('fullName')
    .exists({ checkFalsy : true})
    .isLength({ min: 4})
    .withMessage('Please provide a name with at least 4 characters'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 3 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('headline')
    .optional({nullable: true, checkFalsy: true})
    .isLength({ max: 40}),
  check('website')
    .optional({nullable: true, checkFalsy: true})
    .isURL()
    .withMessage('Please provide a valid url.'),
  check('profileImage')
    .optional({nullable: true, checkFalsy: true})
    .isURL()
    .withMessage('Please provide a valid url.'),
  handleValidationErrors,
];

const validateEdit = [
  check('fullName')
    .exists({ checkFalsy : true})
    .isLength({ min: 4})
    .withMessage('Please provide a name with at least 4 characters'),
  check('headline')
    .optional({nullable: true, checkFalsy: true})
    .isLength({ max: 40}),
  check('website')
    .optional({nullable: true, checkFalsy: true})
    .isURL()
    .withMessage('Please provide a valid url.'),
  check('profileImage')
    .optional({nullable: true, checkFalsy: true})
    .isURL()
    .withMessage('Please provide a valid url.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const {
            fullName,
            email,
            password,
            username,
            headline,
            website,
            profileImage
           } = req.body;
    const user = await User.signup({ fullName, email, username, password, headline, website, profileImage });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Edit user
router.put(
  '/edit',
  validateEdit,
  requireAuth,
  asyncHandler(async (req, res) => {
    let {user} = req;
    const userId = user.id;
    const {fullName, headline, website, profileImage} = req.body;

    if(user){
      user = await User.edit({fullName,  headline, website, profileImage, userId})
      res.clearCookie('token');
      await setTokenCookie(res, user);
      return res.json({
        user,
      });
    }
  })
);

// Get users product
router.get(
  '/products',
  requireAuth,
  asyncHandler(async (req, res)=>{
    const {user} = req;
    if(user){
      const userId = user.id
      const products = await Product.getUsersProducts(userId)
      return res.json(products)
    }
  })
);

// Change password
router.put(
  '/changePassword',
  check('confirmPassword')
    .trim()
    .isLength({ min: 6})
    .withMessage('Password must be 6 characters or more.')
    .custom(async (confirmPassword, {req})=>{
      const password = req.body.password
      if(password !== confirmPassword){
        throw new Error('Passwords must be the same')
      }
    }),
  handleValidationErrors,
  requireAuth,
  asyncHandler(async (req, res)=>{
    let {user} = req;
    const {password, changePassword} = req.body;
    const userId = user.id;
    if(user){
      user = await User.changePassword({password, changePassword, userId});
      if(user) return user
      else res.json({Error: "Passwords don't match"})
    }
  })
);

module.exports = router;
