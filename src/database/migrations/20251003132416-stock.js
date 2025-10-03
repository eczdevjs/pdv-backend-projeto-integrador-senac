'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stock', {
      
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

      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      avg_cost: {
        type: Sequelize.DECIMAL,
        allowNull:true,
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
    await queryInterface.dropTable('stock');
  }
};