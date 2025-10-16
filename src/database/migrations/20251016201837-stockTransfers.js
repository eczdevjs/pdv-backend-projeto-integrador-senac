'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock_transfers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      from_store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'stores',
          key: 'id'
        }
      },

      to_store_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'stores',
          key: 'id'
        }
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },

      reason: {
        type: Sequelize.STRING,
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

    await queryInterface.dropTable('stock_transfers');

  }
};
