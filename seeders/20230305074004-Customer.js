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
    "name": "Wilton Castro",
    "address": "177 Sugar Parkway",
    "cmnd": 277592074
  }, {
    "name": "Mickey Crossfield",
    "address": "565 Sachs Terrace",
    "cmnd": 482656151
  }, {
    "name": "Nollie Loxton",
    "address": "38018 Arizona Point",
    "cmnd": 424770448
  }, {
    "name": "Archibold Cammell",
    "address": "336 Forest Junction",
    "cmnd": 281416007
  }, {
    "name": "Aldus Senechault",
    "address": "16204 Bellgrove Place",
    "cmnd": 488563942
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
