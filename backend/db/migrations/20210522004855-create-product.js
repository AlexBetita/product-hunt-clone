'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      thumbnail: {
        type: Sequelize.STRING(256)
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};