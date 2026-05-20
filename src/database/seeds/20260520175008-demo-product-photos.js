'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_photos', [
      {
        original_name: "Pasted image (2).png",
        file_name: "177749530968911573.png",
        product_id: 1, // Smartphone Galaxy S24
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        original_name: "appleWatch.jpg",
        file_name: "1777562226107_12438.jpg",
        product_id: 10, // Smartwatch Watch Series 9
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        original_name: "mcbookm3table.png",
        file_name: "1777603637113_16280.png",
        product_id: 2, // MacBook Air M3
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        original_name: "mousemxmasterlogitec.png",
        file_name: "1777603773539_17637.png",
        product_id: 5, // Mouse MX Master 3S
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_photos', null, {});
  }
};