'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_reference_type', {

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

      table_name: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.bulkInsert('stock_reference_type', [

      { code: 'sale', table_name:'orders', description: 'Reference to a sale record', created_at: new Date(), updated_at: new Date() },

      { code: 'purchase', table_name:'stock_purchase_orders',description: 'Reference to a purchase record', created_at: new Date(), updated_at: new Date() },

      { code: 'refund', table_name:'stock_refunds',description: 'Reference to a customer return record', created_at: new Date(), updated_at: new Date() },

      { code: 'adjustment',table_name:'stock_adjustments', description: 'Reference to a stock adjustment record', created_at: new Date(), updated_at: new Date() },

      { code: 'transfer', table_name:'stock_transfers',description: 'Reference to a stock transfer record', created_at: new Date(), updated_at: new Date() }

    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_reference_type');
  }
};


