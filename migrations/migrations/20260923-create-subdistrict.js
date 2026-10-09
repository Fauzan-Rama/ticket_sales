'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('subdistricts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subdistrict_id: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      subdistrict_name: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('subdistricts');
  }
};