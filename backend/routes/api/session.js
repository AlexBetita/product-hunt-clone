// backend/routes/api/session.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Comment, Upvote, ProductImage, Product, Sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors,
];

const userObject = async (user) => {
    const userObj = {}

    let upvotes = await user.getUpvotes({
      attributes: {
          exclude: ['deletedAt']
        }
      })

    let upvoteIds = []
    upvotes.forEach((upvotes)=>{
      if(upvotes.upvoteableType === 'product'){
        upvoteIds.push(upvotes.upvoteableId)
      }
    });
    
    upvotes = await Product.findAll({
      where:{
        id: upvoteIds
      },
      include: [
        Upvote,
      ]
    })

    // const upvotes = await Upvote.findAll({
    //   where: {
    //     upvoteableType: 'product',
    //     userId: user.id
    //   },
    //   include: [
    //     {
    //       model: Product,
    //       required: false
    //     },
    //   ],
    // })

    // const upvotes = await Product.findAll({
    //   where: {
    //     '$Upvotes.userId$': user.id,
    //     '$Upvotes.upvoteableType$': 'product'
    //   },
    //   include: [
    //     {
    //       model: Upvote
    //     },
    //   ],
    // })

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

    // const comments = await user.getComments({
    //     attributes: {
    //       exclude: ['deletedAt']
    //     },
    // })

    const comments = await Product.findAll({
      include: [
        {
          model: Comment,
          where: {
            userId: user.id
          }
        },
        Upvote,
      ],
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

// Log in
router.post(
    '/',
    validateLogin,
    asyncHandler(async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        await setTokenCookie(res, user);

        return res.json(await userObject(user));
    }),
);

// Restore session user
router.get(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const { user } = req;
        if (user) {

        return res.json(await userObject(user));
        } else return res.json({});
    })
);

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

module.exports = router;
