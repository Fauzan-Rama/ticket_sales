'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class diskon extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  diskon.init({
    diskonID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    diskonname: DataTypes.STRING,
    nominal: DataTypes.INTEGER,
    tanggalberlaku: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'diskon',
    tableName: 'diskons' // memastikan nama tabel di database terhubung ke 'diskons'
  });
  return diskon;
};