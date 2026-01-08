'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('shift_transactions','opening_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'shifts',
        key: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('shift_transactions', 'opening_id');
  }
};
