'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stock', [
      { product_id: 1, qty: 15, avg_cost: 5499.00, created_at: new Date(), updated_at: new Date() }, // Galaxy S24
      { product_id: 2, qty: 8,  avg_cost: 12499.00, created_at: new Date(), updated_at: new Date() }, // MacBook Air
      { product_id: 3, qty: 12, avg_cost: 2150.50,  created_at: new Date(), updated_at: new Date() }, // Monitor Odyssey
      { product_id: 4, qty: 20, avg_cost: 1399.90,  created_at: new Date(), updated_at: new Date() }, // Teclado Razer
      { product_id: 5, qty: 25, avg_cost: 599.00,   created_at: new Date(), updated_at: new Date() }  // Mouse Logitech
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stock', null, {});
  }
};