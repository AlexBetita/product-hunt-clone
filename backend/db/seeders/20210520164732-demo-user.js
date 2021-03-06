'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: 'demo',
        email: 'demo@user.io',
        username: 'demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'fakeuser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'fakeuser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'fakeuser3',
        hashedPassword: bcrypt.hashSync('fake3'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'fakeuser4',
        hashedPassword: bcrypt.hashSync('fake4'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: 'fakeuser5',
        hashedPassword: bcrypt.hashSync('fake5'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.imageUrl(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
      },
      {
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        username: faker.name.firstName().toLowerCase(),
        hashedPassword: bcrypt.hashSync('123456'),
        headline: faker.lorem.sentence(1, 10),
        website: faker.internet.url(),
        profileImage: faker.image.people(),
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
