'use strict';
const { Validator, Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    fullName:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 40]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 320],
        isNotEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error('Must be a valid email format')
          }
        }
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    headline: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 40]
      }
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        len:[0, 256],
        isUrl(value) {
          if(!Validator.isUrl(value) && value.length){
            throw new Error('Must be a valid url format')
          }
        }
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      validate: {
        len:[0, 256],
        isUrl(value) {
          if(!Validator.isUrl(value) && value.length){
            throw new Error('Must be a valid url format')
          }
        }
      }
    },
    productsViewed: {
      type: DataTypes.INTEGER
    },
    headerImage: {
      type: DataTypes.STRING,
      validate: {
        len:[0, 256],
        isUrl(value) {
          if(!Validator.isUrl(value) && value.length){
            throw new Error('Must be a valid url format')
          }
        }
      }
    },
    visits: {
      type: DataTypes.INTEGER
    },
    deletedAt: DataTypes.DATE
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt','headline','website',
                 'productsViewed', 'visits','deletedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
      userIcons: {
        attributes: { exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt', 'website', 'productsViewed',
                              'deletedAt', 'visits']}
      }
    },
  });

  User.associate = function(models) {

    User.hasMany(models.Comment,{
      foreignKey: "userId",
      onDelete: 'cascade',
    })

    User.hasMany(models.Product,{
      foreignKey: "userId",
      onDelete: 'cascade',
    })

    User.hasMany(models.Upvote,{
      foreignKey: "userId",
      onDelete: 'cascade',
    })

    User.hasMany(models.Discussion,{
      foreignKey: "userId",
      onDelete: 'cascade',
    })
  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email, headline, website, profileImage, fullName} = this;
     // context will be the User instance
    let {createdAt} = this;
    createdAt = moment(createdAt).format('MMMM Do');
    return { id, username, email, headline, website, profileImage, fullName, createdAt };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ fullName, username, email, password, headline, website, profileImage }) {
    const hashedPassword = bcrypt.hashSync(password);
    username = username.toLowerCase()
    const user = await User.create({
      fullName,
      username,
      email,
      hashedPassword,
      headline,
      website,
      profileImage
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  User.editNoProfileImage = async function ({ fullName, headline, website, userId }){
    const user = await User.findByPk(userId)

    user.fullName = fullName
    user.headline = headline
    user.website = website
    await user.save()
    return user
  };

  User.editProfileImage = async function ({profileImage, userId}){
    const user = await User.findByPk(userId)

    user.profileImage = profileImage
    await user.save()
    return user
  };

  User.changePassword = async function ({ password, changePassword, userId}){
    const user = await User.findByPk(userId);
    if(user && user.validatePassword(password)){
      const newHashedPassword = bcrypt.hashSync(changePassword);
      user.password = newHashedPassword
      await user.save()
      return user
    } else {
      return false
    }
  };

  User.getByUsername = async function (username){
    const user = await User.findOne({
      where: {
        username: {[Op.iLike]: `%${username}%`}
      }
    })
    return user
  };

  User.getByEmail= async function (email){
    const user = await User.findOne({
      where: {
        username: {[Op.iLike]: `%${email}%`}
      }
    })
    return user
  };

  return User;
};
