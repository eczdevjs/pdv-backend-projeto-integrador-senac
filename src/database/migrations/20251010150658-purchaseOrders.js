'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('purchase_orders', {
      
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'users',
          key: 'id'
        }
      },

      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        }
      },
      // e o suficiente para identificar a nota, ou seria necessaria a chave de acesso da nota?
      invoice_number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('purchase_orders');

  }
};
