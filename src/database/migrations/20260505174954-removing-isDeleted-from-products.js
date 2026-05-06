/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'is_deleted');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'is_deleted',{ 
      type: Sequelize.BOOLEAN ,
      allowNull: true,
      defaultValue: false
    });
  }
};