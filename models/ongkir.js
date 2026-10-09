'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ongkir extends Model {
    static associate(models) {
      // relasi jika ada
    }
  }

  Ongkir.init({
    subdistrict_id: DataTypes.STRING,
    province_id: DataTypes.STRING,
    province: DataTypes.STRING,
    city_id: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    subdistrict_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ongkir',
    tableName: 'ongkir',
    underscored: true
  });

  return Ongkir;
};