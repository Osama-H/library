'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'user',
      [
        {
          username: 'user1',
          email: 'user1@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          username: 'user1',
          email: 'user1@test.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users',null,{});



  }
};
