'use strict';
const fs = require('fs');
const path = require('path');

module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = fs.readFileSync(path.join(__dirname, '../ongkir.json'));
    const jsonData = JSON.parse(rawData);
    const subdistricts = jsonData.rajaongkir.results;

    const dataToInsert = subdistricts.map(item => ({
      subdistrict_id: item.subdistrict_id,
      province_id: item.province_id,
      province: item.province,
      city_id: item.city_id,
      city: item.city,
      type: item.type,
      subdistrict_name: item.subdistrict_name,
      created_at: new Date(),
      updated_at: new Date()
    }));

    await queryInterface.bulkInsert('ongkir', dataToInsert, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ongkir', null, {});
  }
};