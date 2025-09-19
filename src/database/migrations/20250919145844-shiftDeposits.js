'use strict';

const { sequelize } = require('../../model/PaymentMethod');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.createTable('shift_deposits', {
      id: {
        type: Sequelize.INTEGER ,
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
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

      shift_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shifts',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },

      amount: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },

      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    
    });
    
  },

  async down (queryInterface, Sequelize) {
   
  await queryInterface.dropTable('shift_deposits');
    
  }
};
