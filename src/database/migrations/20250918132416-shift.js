'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('shifts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },

      opening_balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },

      end_time: {
        type: Sequelize.DATE,
        allowNull: true
      },

      closing_balance: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true

      },

      difference: {
        type: Sequelize.DECIMAL(10,2),
        allowNull:true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shifts');
  }
};


