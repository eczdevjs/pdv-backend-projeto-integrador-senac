'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('suborders', {
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
       
        references: {
          model: 'products',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      product_price: {
        // Mudar o tipo na tabela produto
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },

      qtt : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      total: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
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

    await queryInterface.addConstraint('suborders',{
      fields: ['order_id', 'product_id'],
      type: 'primary key',
      name: 'suborders_pk'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('suborders');
  }
};

