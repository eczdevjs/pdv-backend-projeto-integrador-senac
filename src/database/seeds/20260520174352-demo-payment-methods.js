'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_methods', [
      {
        name: "Dinheiro",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pix",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Cartão de Crédito",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
       name: "Cartão de Débito",
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Remove os produtos inseridos limpando a tabela
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};