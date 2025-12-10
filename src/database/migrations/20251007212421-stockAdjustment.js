'use strict';

const { sequelize } = require('../../model/PaymentMethod');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_adjustments', {

      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
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

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      qty_change: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      reference_code: {
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

    await queryInterface.dropTable('stock_adjustments');

  }
};
