'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('shift_transactions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      shift_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shifts',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
//todo: em todo registro a referencia do registro na tabela original, sendo obrigatorio que um dos 5 campos que referenciam a tabela ser preenchido com o respectivo id
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

      transaction_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'shift_transaction_types',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'payment_methods',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      notes: {
        type: Sequelize.STRING,
        allowNull: true
      },

      opening_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'shifts',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      withdraw_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'shift_withdraws',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      deposit_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'shift_deposits',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      },

      return_id: {
        type: Sequelize.INTEGER,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shift_transactions');
  }
};



