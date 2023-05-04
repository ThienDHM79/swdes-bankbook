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
    "name": "12Wilton Castro1",
    "address": "177 Sugar Parkway",
    "cmnd": 1234
  }, {
    "name": "24Mickey Crossfield2",
    "address": "565 Sachs Terrace",
    "cmnd": 2468
  }, {
    "name": "35Nollie Loxton3",
    "address": "38018 Arizona Point",
    "cmnd": 3579
  }, {
    "name": "98Archibold Cammell4",
    "address": "336 Forest Junction",
    "cmnd": 9876
  }, {
    "name": "Aldus Senechault5",
    "address": "16204 Bellgrove Place",
    "cmnd": 1997
  }];
   data.forEach(item => {
     item.createdAt = Sequelize.literal('NOW()');
     item.updatedAt = Sequelize.literal('NOW()');
   })
   await queryInterface.bulkInsert('Customers', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Customers', null, {});
  }
};
