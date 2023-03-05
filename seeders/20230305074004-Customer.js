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
    "name": "Wilton Castro1",
    "address": "177 Sugar Parkway",
    "cmnd": 111111111
  }, {
    "name": "Mickey Crossfield2",
    "address": "565 Sachs Terrace",
    "cmnd": 222222222
  }, {
    "name": "Nollie Loxton3",
    "address": "38018 Arizona Point",
    "cmnd": 333333333
  }, {
    "name": "Archibold Cammell4",
    "address": "336 Forest Junction",
    "cmnd": 444444444
  }, {
    "name": "Aldus Senechault5",
    "address": "16204 Bellgrove Place",
    "cmnd": 555555555
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
