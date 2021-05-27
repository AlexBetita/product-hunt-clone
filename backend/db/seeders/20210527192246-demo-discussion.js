'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Discussions', [
    {
      discussion: 'How much is bit coin worth right now??',
      message: faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Is worth to invest in bitcoin?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'How you likin react?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'CSS is easy! Fight me.',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'CSS is hard! Teach me',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Have you seen the new apple glasses?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Where can I edit my discussions?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: '12345678910',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Just a random wall of text here!',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: '@@@@@ Attention @@@@@',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'How to fly?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Do you believe in ghosts?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Challenger in LoL here, lol jk',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Creating this fake data is hard men',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Test test',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Is this product hunt?',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    {
      discussion: 'Just starting a discussion',
      message:faker.lorem.paragraph(),
      userId: faker.datatype.number(34) + 1,
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Discussions', null, {});
  }
};
