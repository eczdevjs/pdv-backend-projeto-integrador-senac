'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('stores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },

      cnpj: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
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

    await queryInterface.dropTable('stores');

  }
};
