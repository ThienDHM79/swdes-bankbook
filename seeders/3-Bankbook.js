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
      "status": true,
      "customerId": 1,
      "savetypeId": 1
    },
    {
      "name": "b3-102",
      "savetype":"3-month",
      "amount": 4000000,
      "status": false,
      "customerId": 2,
      "savetypeId": 2
    },
    {
      "name": "b6-103",
      "savetype":"6-month",
      "amount": 10000000,
      "status": true,
      "customerId": 3,
      "savetypeId": 3
    },
    {
      "name": "bd-104",
      "savetype":"demand",
      "amount": 400000,
      "status": false,
      "customerId": 1,
      "savetypeId": 1
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
