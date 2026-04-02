'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('payment_methods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
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


    // criar mock dos dados
    await queryInterface.bulkInsert('payment_methods', [
      {
        name: "Cash",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Pix",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Credit Card",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
       name: "Debit Card",
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },



  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_methods');
  }
};

