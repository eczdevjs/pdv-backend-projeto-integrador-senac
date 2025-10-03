'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_transaction_type', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true

      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });

    await queryInterface.bulkInsert('stock_transaction_type', [
      { code: 'purchase', description: 'Stock coming from supplier', created_at: new Date(), updated_at: new Date() },

      { code: 'sale', description: 'Stock leaving due to customer sale', created_at: new Date(), updated_at: new Date() },

      { code: 'refund', description: 'Stock added back due to customer return', created_at: new Date(), updated_at: new Date() },

      { code: 'adjustment', description: 'Manual correction', created_at: new Date(), updated_at: new Date() },
      
      { code: 'transfer', description: 'Movement between warehouses', created_at: new Date(), updated_at: new Date() },
    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_transaction_type');
  }
};


