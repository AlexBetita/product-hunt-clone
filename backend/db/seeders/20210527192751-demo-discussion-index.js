'use strict';

// 17

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DiscussionIndices', [
    {
      discussion: 'how much is bit coin worth right now',
      discussionId: 1
    },
    {
      discussion: 'is worth to invest in bitcoin',
      discussionId: 2
    },
    {
      discussion: 'how you likin react',
      discussionId: 3
    },
    {
      discussion: 'css is easy fight me',
      discussionId: 4
    },
    {
      discussion: 'css is hard teach me',
      discussionId: 5
    },
    {
      discussion: 'have you seen the new apple glasses',
      discussionId: 6
    },
    {
      discussion: 'where can i edit my discussions',
      discussionId: 7
    },
    {
      discussion: '12345678910',
      discussionId: 8
    },
    {
      discussion: 'just a random wall of text here',
      discussionId: 9
    },
    {
      discussion: 'attention',
      discussionId: 10
    },
    {
      discussion: 'how to fly',
      discussionId: 11
    },
    {
      discussion: 'do you believe in ghosts',
      discussionId: 12
    },
    {
      discussion: 'challenger in lol here lol jk',
      discussionId: 13
    },
    {
      discussion: 'creating this fake data is hard men',
      discussionId: 14
    },
    {
      discussion: 'test test',
      discussionId: 15
    },
    {
      discussion: 'is this product hunt',
      discussionId: 16
    },
    {
      discussion: 'just starting a discussion',
      discussionId: 17
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DiscussionIndices', null, {});
  }
};
