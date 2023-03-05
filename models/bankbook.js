'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bankbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bankbook.belongsTo( models.Customer, {foreignKey: 'customerId'});
      Bankbook.belongsTo( models.SaveConfig, {foreignKey: 'savetypeId'});
    }
  }
  Bankbook.init({
    name: DataTypes.STRING, 
    savetype: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Bankbook',
    createdAt: 'openDate'
  });
  return Bankbook;
};