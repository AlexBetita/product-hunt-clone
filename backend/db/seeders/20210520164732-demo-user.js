'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'demo',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        headline: faker.lorem.sentence(4, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        headline: faker.lorem.sentence(4, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        headline: faker.lorem.sentence(4, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
