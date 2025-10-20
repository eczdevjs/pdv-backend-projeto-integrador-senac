'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_transaction_type', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      { code: 'in_purchase', description: 'Stock coming from supplier', created_at: new Date(), updated_at: new Date() },

      { code: 'out_sale', description: 'Stock going out from a customer sale', created_at: new Date(), updated_at: new Date() },

      { code: 'in_return', description: 'Stock returned by customer', created_at: new Date(), updated_at: new Date() },

      { code: 'out_damage', description: 'Stock removed due to spoilage', created_at: new Date(), updated_at: new Date() },

      { code: 'adj_up', description: 'Manual positive adjustment', created_at: new Date(), updated_at: new Date() },

      { code: 'adj_down', description: 'Manual negative adjustment', created_at: new Date(), updated_at: new Date() },


      { code: 'in_transfer', description: 'Stock coming from another store', created_at: new Date(), updated_at: new Date() },

      { code: 'out_transfer', description: 'Stock going out to another store', created_at: new Date(), updated_at: new Date() }
      
    ]);
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_transaction_type');
  }
};


