'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
    {
      title: 'Potato',
      thumbnail: 'potato.com',
      description: 'coolpotato',
      userId: 1
    },
    {
      title: 'Bannana',
      thumbnail: 'banana.com',
      description: 'banana',
      userId: 1
    },
    {
      title: 'Carrot',
      thumbnail: 'carrot.com',
      description: 'carrot',
      userId: 1
    },
    {
      title: 'Cellphone',
      thumbnail: 'ceullular.com',
      description: 'cellphone handy',
      userId: 2
    },
    {
      title: 'Cash',
      thumbnail: 'cash.com',
      description: 'coolpotato',
      userId: 3
    },
    {
      title: 'Rabbit',
      thumbnail: 'rabbit.com',
      description: 'coolpotato',
      userId: 4
    },
    {
      title: 'Mouse',
      thumbnail: 'mouse.com',
      description: 'coolpotato',
      userId: 5
    },
    {
      title: 'Iron',
      thumbnail: 'bronze.com',
      description: 'silver',
      userId: 6
    },
    {
      title: 'Diamond',
      thumbnail: 'challenger.com',
      description: 'master',
      userId: 6
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
