'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [{
      "name": "bd-101",
      "savetype":"demand",
      "amount": 1000000,
      "status": true
    },
    {
      "name": "b3-102",
      "savetype":"3-month",
      "amount": 4000000,
      "status": false
    },
    {
      "name": "b6-103",
      "savetype":"6-month",
      "amount": 10000000,
      "status": true
    },
    {
      "name": "bd-104",
      "savetype":"demand",
      "amount": 400000,
      "status": false
    }
    
    ];
    data.forEach(item => {
      item.openDate = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('Bankbooks', data, {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bankbooks', null, {});
  }
};
