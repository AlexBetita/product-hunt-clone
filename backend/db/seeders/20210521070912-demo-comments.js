'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        comment: 'Hmm',
        user_id: 1
      },
      {
        comment: 'Not interesting',
        user_id: 2
      },
      {
        comment: 'Cool',
        user_id: 2
      },
      {
        comment: 'Already done',
        user_id: 1
      },
      {
        comment: 'Expensive',
        user_id: 3
      },
      {
        comment: 'Worth it',
        user_id: 3
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
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
