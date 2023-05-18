'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transact.belongsTo(models.Bankbook, {foreignKey: 'bankbookId'});
    }
  }
  Transact.init({
    trans_type: DataTypes.BOOLEAN,
    amount: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Transact',
    createdAt: 'trans_date'
  });
  return Transact;
};