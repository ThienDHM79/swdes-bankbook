'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaveConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SaveConfig.init({
    savetype: DataTypes.STRING,
    timeperiod: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    minTimeWdraw: DataTypes.INTEGER,
    minInput: DataTypes.BIGINT,
    allowAdd: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SaveConfig',
  });
  return SaveConfig;
};