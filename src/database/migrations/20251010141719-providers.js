'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('providers', {
      // add address id further
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cnpj: {
        type: Sequelize.STRING,
        allowNull: true
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      notes: {
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

    });

    // database seeding exclude it further
    await queryInterface.bulkInsert('providers', [
      { name: 'MAX TITANIUM', created_at: new Date(), updated_at: new Date() },
      { name: 'GROWTH', created_at: new Date(), updated_at: new Date() },
      { name: 'MATRIX', created_at: new Date(), updated_at: new Date() },
      { name: 'KALENJI', created_at: new Date(), updated_at: new Date() },
      { name: 'NIKE', created_at: new Date(), updated_at: new Date() },
      { name: 'ADIDAS', created_at: new Date(), updated_at: new Date() }
    ]);
  },


  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('providers');

  }
};
