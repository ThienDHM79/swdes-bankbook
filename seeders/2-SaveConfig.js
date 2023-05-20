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
   // time period : day, minTimewithdraw: day
    let data = [{
      "savetype": "demand",
      "timeperiod": 30,
      "rate": 0.0015,
      "minTimeWdraw": 15,
      "minInput": 100000,
      "allowAdd": true
    },
    {
      "savetype": "3-month",
      "timeperiod": 90,
      "rate": 0.005,
      "minTimeWdraw": 90,
      "minInput": 100000,
      "allowAdd": false
    },
    {
      "savetype": "6-month",
      "timeperiod": 180,
      "rate": 0.0055,
      "minTimeWdraw": 180,
      "minInput": 100000,
      "allowAdd": false
    }
    ];
    data.forEach(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
    })
    await queryInterface.bulkInsert('SaveConfigs', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('SaveConfigs', null, {});
  }
};
