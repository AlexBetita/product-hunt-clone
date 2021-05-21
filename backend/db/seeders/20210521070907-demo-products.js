'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        title: 'Ketchup',
        thumbnail: 'flavicon.jpeg',
        description: 'Sweet and savory',
        user_id: 1
      },
      {
        title: 'Banana',
        thumbnail: 'flavicon.jpeg',
        description: 'Delicious',
        user_id: 1
      },
      {
        title: 'Canoon',
        thumbnail: 'flavicon.jpeg',
        description: 'Strong and powerful',
        user_id: 2
      },
      {
        title: 'Skateboard',
        thumbnail: 'flavicon.jpeg',
        description: 'Swift and fast',
        user_id: 3
      },
      {
        title: 'Cellphone',
        thumbnail: 'flavicon.jpeg',
        description: 'Compact, smart and neccissity',
        user_id: 3
      },
      {
        title: 'Tv',
        thumbnail: 'flavicon.jpeg',
        description: '4k res',
        user_id: 2
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Products', null, {});
  }
};
