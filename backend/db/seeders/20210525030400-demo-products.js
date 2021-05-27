'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
    {
      title: 'Potato',
      thumbnail: 'https://cdn.britannica.com/89/170689-131-D20F8F0A/Potatoes.jpg',
      description: 'coolpotato',
      userId: 1
    },
    {
      title: 'Bannana',
      thumbnail: 'https://api.time.com/wp-content/uploads/2019/11/gettyimages-459761948.jpg?quality=85&w=1024&h=512&crop=1',
      description: 'banana',
      userId: 1
    },
    {
      title: 'Carrot',
      thumbnail: 'https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg',
      description: 'carrot',
      userId: 1
    },
    {
      title: 'Cellphone',
      thumbnail: 'http://stopcellphonetrafficking.com/wp-content/themes/tracfone/images/home-phone.png',
      description: 'cellphone handy',
      userId: 2
    },
    {
      title: 'Cash',
      thumbnail: 'https://bloximages.chicago2.vip.townnews.com/qctimes.com/content/tncms/assets/v3/editorial/0/92/092f65cd-7478-5940-b8b1-1a6a1955b238/5b771f30d5f1c.image.jpg',
      description: 'money much wow',
      userId: 3
    },
    {
      title: 'Rabbit',
      thumbnail: 'https://api.time.com/wp-content/uploads/2019/03/us-movie-rabbits-meaning.jpg?quality=85&w=1200&h=628&crop=1',
      description: 'cute',
      userId: 4
    },
    {
      title: 'Mouse',
      thumbnail: 'https://images.theconversation.com/files/265294/original/file-20190322-36283-1me4pb6.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
      description: ':O',
      userId: 5
    },
    {
      title: 'Iron',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/81FmqmtvbiL._AC_SL1500_.jpg',
      description: 'silver',
      userId: 6
    },
    {
      title: 'Diamond',
      thumbnail: 'https://www.gia.edu/images/polished-diamond.png',
      description: 'master',
      userId: 6
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.business(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },
    {
      title: faker.name.title(),
      thumbnail: faker.image.fashion(),
      description: faker.lorem.text(3),
      userId: faker.datatype.number(34) + 1
    },

  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
