// backend/routes/api/users.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Product, Comment, Upvote, ProductImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3.js')

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

const userObject = async (user) => {
  const userObj = {}

  const upvotes = await user.getUpvotes({
    attributes: {
        exclude: ['deletedAt']
      }
    })
    const products = await user.getProducts({
      attributes: {
        exclude: ['deletedAt']
      }, include: [
        {
          model: Comment,
          include: [Upvote, User.scope('userIcons')]
        },
        Upvote,
        User.scope('userIcons'),
        ProductImage.scope('imageUrls')
      ]
  })
    const comments = await user.getComments({
        attributes: {
          exclude: ['deletedAt']
        }
    })
    const discussions = await user.getDiscussions({
      attributes: {
        exclude: ['deletedAt']
      }
  })

  const upvotesObj = {}
  const productsObj = {}
  const commentsObj = {}
  const discussionsObj = {}

  upvotes.forEach((upvotes)=>{
    upvotesObj[upvotes.id] = upvotes
  });

  products.forEach((products)=>{
    productsObj[products.id] = products
  });

  comments.forEach((comments)=>{
    commentsObj[comments.id] = comments
  });

  discussions.forEach((discussions)=>{
    discussionsObj[discussions.id] = discussions
  });

  userObj['user'] = user.toSafeObject(),
  userObj['upvotes']= upvotesObj
  userObj['products'] = productsObj
  userObj['comments'] = commentsObj
  userObj['discussions'] = discussionsObj

  return userObj
}

const defaultProfileImage = `https://producthuntclone.s3.amazonaws.com/1623466906472.jpg`

// Sign up
router.post(
  '/',
  singleMulterUpload("image"),
  validateSignup,
  asyncHandler(async (req, res, next) => {
    const {
            fullName,
            email,
            password,
            username,
            headline,
            website
           } = req.body;

    let user;
    let profileImage;
    try {
      profileImage = await singlePublicFileUpload(req.file);
    }
    catch {
      profileImage = null
    }

    if (!profileImage){
        profileImage = defaultProfileImage
    }

    try {
      user = await User.signup({ fullName, email, username, password, headline, website, profileImage });
    }
    catch (e){
      const err = new Error(e.errors[0]);
      err.status = 401;
      err.title = 'Signup failed';
      err.errors = [e.errors[0]['message']]
      return next(err)
    }

    await setTokenCookie(res, user);

    return res.json(await userObject(user));
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
    const {fullName, headline, website} = req.body;

    if(user){
      user = await User.editNoProfileImage({fullName,  headline, website, userId})
      res.clearCookie('token');
      await setTokenCookie(res, user);
      return res.json(await userObject(user));
    }
  })
);

// Edit user profileImage
router.put(
  '/profileImage',
  singleMulterUpload("image"),
  requireAuth,
  asyncHandler(async (req, res) => {
    let {user} = req;

    const userId = user.id;

    let profileImage;
    try {
      profileImage = await singlePublicFileUpload(req.file);
    }
    catch {
      profileImage = null
    }

    if (!profileImage){
        profileImage = defaultProfileImage
    }

    if(user){
      user = await User.editProfileImage({profileImage, userId})
      res.clearCookie('token');
      await setTokenCookie(res, user);
      return res.json(await userObject(user));
    }
  })
);

// Get users products
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
      if(user) return res.json(await userObject(user));
      else res.json({Error: "Passwords don't match"})
    }
  })
);

// Get user
router.get(
  '/:username',
  asyncHandler(async (req, res, next)=>{
    const {username} = req.params;
    const user = await User.getByUsername(username);
    if(user){
      return res.json(await userObject(user));
    } else {
      const err = new Error('User does not exists');
      err.status = 401;
      err.title = 'User does not exists';
      err.errors = ['User does not exists.'];
      return next(err);
    }
  })
);

// // Check User
// router.get(
//   '/checkUser/:username',
//   asyncHandler(async (req, res) =>{
//     const {username} = req.params;
//     const user = await User.getByUsername(username);

//     if (user) {
//       return res.json({'exist' : true})
//     } else {
//       return res.json({'exist' : false})
//     }
//   })
// )

// //Check Email
// router.get(
//   '/checkEmail/:email',
//   asyncHandler(async (req, res) =>{
//     const {email} = req.params;
//     const user = await User.getByEmail(email);

//     if (user) {
//       return res.json({'exist' : true})
//     } else {
//       return res.json({'exist' : false})
//     }
//   })
// )

module.exports = router;
