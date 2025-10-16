'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_transfers_line', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      transfer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stock_transfers',
          key: 'id'
        }
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'products',
          key: 'id'
        }
      },

      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      unity_cost: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

      // further an address id among another fields to be added
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('stock_transfers_line');

  }
};
