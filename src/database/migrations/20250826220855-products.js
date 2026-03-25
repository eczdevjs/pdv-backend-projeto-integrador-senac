'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      product_model: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
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

    await queryInterface.addConstraint('products', {
      fields: ['name', 'brand', 'product_model'],
      type: 'unique',
      name: 'unique_product_constraint'
    })
    
     // criar data mock
    await queryInterface.bulkInsert('products', [
      {
        name: "Smartphone Galaxy S24",
        brand: "Samsung",
        product_model: "SM-S921B",
        description: "Smartphone com IA avançada e tela de 6.2 polegadas.",
        price: 5499.00,
        size: "147 x 70.6 x 7.6 mm",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "MacBook Air M3",
        brand: "Apple",
        product_model: "A3113",
        description: "Laptop ultra-fino com chip M3 e 13 polegadas.",
        price: 12499.00,
        size: "13.6 polegadas",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Monitor Gamer Odyssey G5",
        brand: "Samsung",
        product_model: "LC32G55TQWLXZD",
        description: "Monitor curvo de 32 polegadas com 144Hz.",
        price: 2150.50,
        size: "32 polegadas",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Teclado Mecânico BlackWidow V4",
        brand: "Razer",
        product_model: "RZ03-0469",
        description: "Teclado RGB com switches mecânicos verdes.",
        price: 1399.90,
        size: "Full-size",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Mouse MX Master 3S",
        brand: "Logitech",
        product_model: "910-006557",
        description: "Mouse ergonômico sem fio para produtividade.",
        price: 599.00,
        size: "124.9 x 84.3 x 51 mm",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Headset QuietComfort 45",
        brand: "Bose",
        product_model: "866724-0100",
        description: "Fones de ouvido com cancelamento de ruído ativo.",
        price: 2800.00,
        size: "Ajustável",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Placa de Vídeo RTX 4070",
        brand: "NVIDIA",
        product_model: "Founders Edition",
        description: "GPU com arquitetura Ada Lovelace e 12GB GDDR6X.",
        price: 4890.00,
        size: "244 mm",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "SSD 990 Pro 2TB",
        brand: "Samsung",
        product_model: "MZ-V9P2T0BW",
        description: "SSD NVMe PCIe 4.0 ultra rápido.",
        price: 1250.00,
        size: "M.2 2280",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Kindle Paperwhite",
        brand: "Amazon",
        product_model: "B08N36X28S",
        description: "Leitor de e-books com tela de 6.8 polegadas e IPX8.",
        price: 799.00,
        size: "174 x 125 x 8.1 mm",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Smartwatch Watch Series 9",
        brand: "Apple",
        product_model: "MR9A3BE/A",
        description: "Relógio inteligente com sensor de oxigênio no sangue.",
        price: 3999.00,
        size: "45mm",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },
 
  async down(queryInterface) {
    await queryInterface.dropTable('products');
  }
};
