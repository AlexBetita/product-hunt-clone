'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Upvotes', [
    {
      userId: 1,
      upvoteableId: 1,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 2,
      upvoteableType: 'product',
    },
     {
      userId: 1,
      upvoteableId: 3,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 4,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 5,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 6,
      upvoteableType: 'product',
    },
     {
      userId: 1,
      upvoteableId: 7,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 8,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 47,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 46,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 45,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 44,
      upvoteableType: 'product',
    },
     {
      userId: 1,
      upvoteableId: 43,
      upvoteableType: 'product',
    },
    {
      userId: 1,
      upvoteableId: 42,
      upvoteableType: 'product',
    },
    {
      userId: 2,
      upvoteableId: 47,
      upvoteableType: 'product',
    },
    {
      userId: 2,
      upvoteableId: 46,
      upvoteableType: 'product',
    },
    {
      userId: 2,
      upvoteableId: 45,
      upvoteableType: 'product',
    },
    {
      userId: 2,
      upvoteableId: 44,
      upvoteableType: 'product',
    },
     {
      userId: 2,
      upvoteableId: 43,
      upvoteableType: 'product',
    },
    {
      userId: 2,
      upvoteableId: 42,
      upvoteableType: 'product',
    },
    {
      userId: 3,
      upvoteableId: 47,
      upvoteableType: 'product',
    },
    {
      userId: 3,
      upvoteableId: 46,
      upvoteableType: 'product',
    },
    {
      userId: 3,
      upvoteableId: 45,
      upvoteableType: 'product',
    },
    {
      userId: 3,
      upvoteableId: 44,
      upvoteableType: 'product',
    },
     {
      userId: 3,
      upvoteableId: 43,
      upvoteableType: 'product',
    },
    {
      userId: 3,
      upvoteableId: 42,
      upvoteableType: 'product',
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Upvotes', null, {});
  }
};
