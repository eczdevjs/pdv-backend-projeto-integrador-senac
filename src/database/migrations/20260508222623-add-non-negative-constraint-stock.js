'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('stock', {
      fields: ['qty'],
      type: 'check',
      name: 'check_qty_non_negative', // Unique name for the constraint
      where: {
        qty: {
          [Sequelize.Op.gte]: 0
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('stock', 'check_qty_non_negative');
  }
};
