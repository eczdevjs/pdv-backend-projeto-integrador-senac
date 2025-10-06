'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_transactions', {
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
      
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      qty_change: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      unity_cost: {
        type: Sequelize.DECIMAL,
        allowNull:true,
      },

      type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stock_transaction_type',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      reference_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stock_reference_type',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      reference_id: {
        type: Sequelize.INTEGER,
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
      
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_transactions');
  }
};