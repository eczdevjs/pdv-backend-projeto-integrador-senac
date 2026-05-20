'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('providers', [
      { name: 'MAX PC', created_at: new Date(), updated_at: new Date() },
      { name: 'MASTER COMPUTER', created_at: new Date(), updated_at: new Date() },
      { name: 'KING ELECTRONICS', created_at: new Date(), updated_at: new Date() },
      { name: 'HARDWARE HOUSE', created_at: new Date(), updated_at: new Date() },
      { name: 'TI SOLUTINOS', created_at: new Date(), updated_at: new Date() },
      { name: 'START INFORMATION', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove os produtos inseridos limpando a tabela
    await queryInterface.bulkDelete('providers', null, {});
  }
};