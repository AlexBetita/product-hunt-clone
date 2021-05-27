'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DiscussionIndices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      discussion: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      discussionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Discussions'},
        onDelete: 'CASCADE'
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DiscussionIndices');
  }
};
